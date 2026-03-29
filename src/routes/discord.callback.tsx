import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { postWorkspacesWorkspaceIdIntegrations } from '#/api/workspace-integrations/workspace-integrations'

const searchSchema = z.object({
	guild_id: z.string().optional(),
	state: z.string().optional(),
	code: z.string().optional(),
	error: z.string().optional(),
})

export const Route = createFileRoute('/discord/callback')({
	validateSearch: searchSchema,
	component: DiscordCallbackPage,
})

function DiscordCallbackPage() {
	const { guild_id, state: workspaceId, error } = Route.useSearch()
	const navigate = useNavigate()
	const called = useRef(false)

	useEffect(() => {
		if (called.current) return
		called.current = true

		if (error) {
			toast.error('Discord authorization was cancelled.')
			void navigate({ to: '/settings', replace: true })
			return
		}

		if (!guild_id || !workspaceId) {
			toast.error('Missing Discord authorization data.')
			void navigate({ to: '/settings', replace: true })
			return
		}

		postWorkspacesWorkspaceIdIntegrations(workspaceId, {
			provider: 'discord',
			providerId: guild_id,
		})
			.then(result => {
				if (result.status === 201) {
					toast.success('Discord server connected.')
				} else {
					toast.error('Failed to connect Discord server.')
				}
			})
			.catch(() => {
				toast.error('Failed to connect Discord server.')
			})
			.finally(() => {
				void navigate({ to: '/settings', replace: true })
			})
	}, [guild_id, workspaceId, error, navigate])

	return (
		<div className="flex h-screen items-center justify-center bg-background">
			<span className="font-mono text-[13px] text-[#6a6a6a]">
				Connecting Discord...
			</span>
		</div>
	)
}
