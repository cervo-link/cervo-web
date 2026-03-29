import { createFileRoute } from '@tanstack/react-router'
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

				const res = await fetch(
					`${serverEnv.API_URL}/workspaces/${workspaceId}/integrations`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Cookie: cookie,
						},
						body: JSON.stringify({ provider: 'discord', providerId: guildId }),
					}
				)

				if (res.status === 201) {
					return Response.redirect(`${settingsUrl}?discord_connected=true`, 302)
				}

				if (res.status === 422) {
					return Response.redirect(
						`${settingsUrl}?discord_error=already_connected`,
						302
					)
				}

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
