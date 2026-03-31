import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { z } from 'zod'
import { clientEnv } from '#/lib/env'

const searchSchema = z.object({
	guild_id: z.string().optional(),
	state: z.string().optional(),
	error: z.string().optional(),
})

export const Route = createFileRoute('/discord/callback')({
	validateSearch: searchSchema,
	component: DiscordCallbackPage,
})

function DiscordCallbackPage() {
	const { guild_id, state: workspaceId, error } = Route.useSearch()

	useEffect(() => {
		async function connect() {
			const settingsUrl = `${window.location.origin}/settings`

			if (error || !guild_id || !workspaceId) {
				window.location.replace(
					`${settingsUrl}?discord_error=${error === 'access_denied' ? 'cancelled' : 'missing_data'}`
				)
				return
			}

			try {
				const res = await fetch(
					`${clientEnv.VITE_API_URL}/workspaces/${workspaceId}/integrations`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						credentials: 'include',
						body: JSON.stringify({ provider: 'discord', providerId: guild_id }),
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
	}, [error, guild_id, workspaceId])

	return (
		<div className="flex h-screen items-center justify-center bg-background">
			<span className="font-mono text-[13px] text-[#6a6a6a]">
				Connecting Discord...
			</span>
		</div>
	)
}
