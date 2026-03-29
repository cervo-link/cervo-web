import { createFileRoute } from '@tanstack/react-router'
import { serverEnv } from '#/lib/env.server'

export const Route = createFileRoute('/discord/identity-callback')({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const url = new URL(request.url)
				const code = url.searchParams.get('code')
				const error = url.searchParams.get('error')
				const accountUrl = new URL('/account', request.url).href

				if (error || !code) {
					return Response.redirect(`${accountUrl}?discord_error=cancelled`, 302)
				}

				const redirectUri = new URL('/discord/identity-callback', request.url)
					.href

				const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: new URLSearchParams({
						client_id: serverEnv.CLIENT_ID,
						client_secret: serverEnv.CLIENT_SECRET,
						grant_type: 'authorization_code',
						code,
						redirect_uri: redirectUri,
					}),
				})

				if (!tokenRes.ok) {
					return Response.redirect(
						`${accountUrl}?discord_error=exchange_failed`,
						302
					)
				}

				const { access_token } = (await tokenRes.json()) as {
					access_token: string
				}

				const userRes = await fetch('https://discord.com/api/users/@me', {
					headers: { Authorization: `Bearer ${access_token}` },
				})

				if (!userRes.ok) {
					return Response.redirect(
						`${accountUrl}?discord_error=user_failed`,
						302
					)
				}

				const { id: discordUserId } = (await userRes.json()) as {
					id: string
				}

				const cookie = request.headers.get('cookie') ?? ''
				const linkRes = await fetch(
					`${serverEnv.API_URL}/members/me/identities`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Cookie: cookie,
						},
						body: JSON.stringify({
							provider: 'discord',
							providerUserId: discordUserId,
						}),
					}
				)

				if (linkRes.status === 409) {
					return Response.redirect(
						`${accountUrl}?discord_error=already_linked`,
						302
					)
				}

				if (linkRes.status === 422) {
					return Response.redirect(
						`${accountUrl}?discord_error=different_account`,
						302
					)
				}

				if (!linkRes.ok) {
					return Response.redirect(
						`${accountUrl}?discord_error=link_failed`,
						302
					)
				}

				return Response.redirect(`${accountUrl}?discord_success=true`, 302)
			},
		},
	},
	component: DiscordIdentityCallbackPage,
})

function DiscordIdentityCallbackPage() {
	return (
		<div className="flex h-screen items-center justify-center bg-background">
			<span className="font-mono text-[13px] text-[#6a6a6a]">
				Connecting Discord account...
			</span>
		</div>
	)
}
