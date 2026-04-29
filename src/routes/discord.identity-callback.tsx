import { createFileRoute } from '@tanstack/react-router'
import { clientEnv } from '#/lib/env'

export const Route = createFileRoute('/discord/identity-callback')({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const url = new URL(request.url)
				const accountUrl = new URL('/account', request.url).href

				const code = url.searchParams.get('code')
				const error = url.searchParams.get('error')

				if (error || !code) {
					return Response.redirect(`${accountUrl}?discord_error=cancelled`, 302)
				}

				const clientSecret = process.env.CLIENT_SECRET
				if (!clientSecret) {
					return Response.redirect(
						`${accountUrl}?discord_error=exchange_failed`,
						302
					)
				}

				const redirectUri = new URL('/discord/identity-callback', request.url)
					.href

				try {
					const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						},
						body: new URLSearchParams({
							client_id: clientEnv.VITE_CLIENT_ID,
							client_secret: clientSecret,
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
						headers: {
							Authorization: `Bearer ${access_token}`,
						},
					})

					if (!userRes.ok) {
						return Response.redirect(
							`${accountUrl}?discord_error=user_failed`,
							302
						)
					}

					const { id } = (await userRes.json()) as { id: string }

					// Redirect to account page with discord_user_id for the
					// client-side identity link call
					return Response.redirect(`${accountUrl}?discord_user_id=${id}`, 302)
				} catch {
					return Response.redirect(
						`${accountUrl}?discord_error=exchange_failed`,
						302
					)
				}
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
