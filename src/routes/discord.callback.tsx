import { createFileRoute } from '@tanstack/react-router'
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

			try {
				const res = await fetch(
					`${clientEnv.VITE_API_URL}/api/v1/workspaces/${workspaceId}/integrations`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						credentials: 'include',
						body: JSON.stringify({ provider: 'discord', providerId: guildId }),
					}
				)

				if (res.status === 201) {
					window.location.replace(`${settingsUrl}?discord_connected=true`)
				} else if (res.status === 422) {
					window.location.replace(
						`${settingsUrl}?discord_error=already_connected`
					)
				} else {
					window.location.replace(`${settingsUrl}?discord_error=failed`)
				}
			} catch {
				window.location.replace(`${settingsUrl}?discord_error=failed`)
			}
		}

		connect()
	}, [])

	return (
		<div className="flex h-screen items-center justify-center bg-background">
			<span className="font-mono text-[13px] text-[#6a6a6a]">
				Connecting Discord...
			</span>
		</div>
	)
}
