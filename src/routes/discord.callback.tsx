import { createFileRoute } from '@tanstack/react-router'
<<<<<<< Updated upstream
import { serverEnv } from '#/lib/env.server'

export const Route = createFileRoute('/discord/callback')({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const url = new URL(request.url)
				// Read guild_id as a raw string — URLSearchParams preserves the full
				// Discord snowflake without the precision loss that JSON.parse causes.
				const guildId = url.searchParams.get('guild_id')
				const workspaceId = url.searchParams.get('state')
				const error = url.searchParams.get('error')
				const settingsUrl = new URL('/settings', request.url).href

				if (error) {
					return Response.redirect(
						`${settingsUrl}?discord_error=cancelled`,
						302
					)
				}

				if (!guildId || !workspaceId) {
					return Response.redirect(
						`${settingsUrl}?discord_error=missing_data`,
						302
					)
				}

				const cookie = request.headers.get('cookie') ?? ''
=======
import { useEffect } from 'react'
import { clientEnv } from '#/lib/env'

export const Route = createFileRoute('/discord/callback')({
	component: DiscordCallbackPage,
})

function DiscordCallbackPage() {
	useEffect(() => {
		async function connect() {
			const params = new URLSearchParams(window.location.search)
			const guildId = params.get('guild_id')
			const workspaceId = params.get('state')
			const error = params.get('error')
			const settingsUrl = `${window.location.origin}/settings`

			if (error || !guildId || !workspaceId) {
				window.location.replace(
					`${settingsUrl}?discord_error=${error === 'access_denied' ? 'cancelled' : 'missing_data'}`
				)
				return
			}
>>>>>>> Stashed changes

				const res = await fetch(
					`${serverEnv.API_URL}/workspaces/${workspaceId}/integrations`,
					{
						method: 'POST',
<<<<<<< Updated upstream
						headers: {
							'Content-Type': 'application/json',
							Cookie: cookie,
						},
=======
						headers: { 'Content-Type': 'application/json' },
						credentials: 'include',
>>>>>>> Stashed changes
						body: JSON.stringify({ provider: 'discord', providerId: guildId }),
					}
				)

				if (res.status === 201) {
					return Response.redirect(`${settingsUrl}?discord_connected=true`, 302)
				}

<<<<<<< Updated upstream
				if (res.status === 422) {
					return Response.redirect(
						`${settingsUrl}?discord_error=already_connected`,
						302
					)
				}
=======
		connect()
	}, [])
>>>>>>> Stashed changes

				return Response.redirect(`${settingsUrl}?discord_error=failed`, 302)
			},
		},
	},
	component: DiscordCallbackPage,
})

function DiscordCallbackPage() {
	return (
		<div className="flex h-screen items-center justify-center bg-background">
			<span className="font-mono text-[13px] text-[#6a6a6a]">
				Connecting Discord...
			</span>
		</div>
	)
}
