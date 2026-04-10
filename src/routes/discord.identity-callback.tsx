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
				const discordUserId = url.searchParams.get('discord_user_id')

				// Phase 2: link the discord identity server-side using the session cookie
				if (discordUserId) {
					const apiUrl = process.env.API_URL ?? 'http://localhost:8080'
					try {
						const res = await fetch(`${apiUrl}/api/v1/members/me/identities`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								Cookie: request.headers.get('cookie') ?? '',
							},
							body: JSON.stringify({
								provider: 'discord',
								providerUserId: discordUserId,
							}),
						})

						if (res.status === 409) {
							console.error('[discord/identity-callback] identity already linked', { discordUserId, status: res.status })
							return Response.redirect(
								`${accountUrl}?discord_error=already_linked`,
								302
							)
						}
						if (res.status === 422) {
							console.error('[discord/identity-callback] identity linked to different account', { discordUserId, status: res.status })
							return Response.redirect(
								`${accountUrl}?discord_error=different_account`,
								302
							)
						}
						if (!res.ok) {
							console.error('[discord/identity-callback] link identity failed', { discordUserId, status: res.status })
							return Response.redirect(
								`${accountUrl}?discord_error=link_failed`,
								302
							)
						}
						return Response.redirect(`${accountUrl}?discord_success=true`, 302)
					} catch (err) {
						console.error('[discord/identity-callback] unexpected error linking identity', err)
						return Response.redirect(
							`${accountUrl}?discord_error=link_failed`,
							302
						)
					}
				}

				// Phase 1: exchange the authorization code for a Discord user ID
				if (error || !code) {
					console.error('[discord/identity-callback] oauth cancelled or missing code', { error, hasCode: !!code })
					return Response.redirect(`${accountUrl}?discord_error=cancelled`, 302)
				}

				const clientSecret = process.env.CLIENT_SECRET
				if (!clientSecret) {
					console.error('[discord/identity-callback] CLIENT_SECRET is not configured')
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
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						body: new URLSearchParams({
							client_id: clientEnv.VITE_CLIENT_ID,
							client_secret: clientSecret,
							grant_type: 'authorization_code',
							code,
							redirect_uri: redirectUri,
						}),
					})

					if (!tokenRes.ok) {
						console.error('[discord/identity-callback] token exchange failed', { status: tokenRes.status })
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
						console.error('[discord/identity-callback] discord user fetch failed', { status: userRes.status })
						return Response.redirect(
							`${accountUrl}?discord_error=user_failed`,
							302
						)
					}

					const { id } = (await userRes.json()) as { id: string }

					const callbackUrl = new URL('/discord/identity-callback', request.url)
					callbackUrl.searchParams.set('discord_user_id', id)
					return Response.redirect(callbackUrl.href, 302)
				} catch (err) {
					console.error('[discord/identity-callback] unexpected error during token exchange', err)
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
