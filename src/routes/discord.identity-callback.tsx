import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { z } from 'zod'
import { clientEnv } from '#/lib/env'
import { serverEnv } from '#/lib/env.server'

const searchSchema = z.object({
	code: z.string().optional(),
	error: z.string().optional(),
	discord_user_id: z.string().optional(),
})

export const Route = createFileRoute('/discord/identity-callback')({
	validateSearch: searchSchema,
	server: {
		handlers: {
			GET: async ({ request }) => {
				const url = new URL(request.url)

				// Phase 2: discord_user_id already resolved, let client handle the API call
				if (url.searchParams.get('discord_user_id')) return

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
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: new URLSearchParams({
						client_id: clientEnv.VITE_CLIENT_ID,
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

				const { id: discordUserId } = (await userRes.json()) as { id: string }

				const callbackUrl = new URL('/discord/identity-callback', request.url)
				callbackUrl.searchParams.set('discord_user_id', discordUserId)
				return Response.redirect(callbackUrl.href, 302)
			},
		},
	},
	component: DiscordIdentityCallbackPage,
})

function DiscordIdentityCallbackPage() {
	const { discord_user_id } = Route.useSearch()

	useEffect(() => {
		if (!discord_user_id) return

		async function link() {
			const accountUrl = `${window.location.origin}/account`

			try {
				const res = await fetch(
					`${clientEnv.VITE_API_URL}/members/me/identities`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						credentials: 'include',
						body: JSON.stringify({
							provider: 'discord',
							providerUserId: discord_user_id,
						}),
					}
				)

				if (res.status === 409) {
					window.location.replace(`${accountUrl}?discord_error=already_linked`)
				} else if (res.status === 422) {
					window.location.replace(
						`${accountUrl}?discord_error=different_account`
					)
				} else if (!res.ok) {
					window.location.replace(`${accountUrl}?discord_error=link_failed`)
				} else {
					window.location.replace(`${accountUrl}?discord_success=true`)
				}
			} catch {
				window.location.replace(`${accountUrl}?discord_error=link_failed`)
			}
		}

		link()
	}, [discord_user_id])

	return (
		<div className="flex h-screen items-center justify-center bg-background">
			<span className="font-mono text-[13px] text-[#6a6a6a]">
				Connecting Discord account...
			</span>
		</div>
	)
}
