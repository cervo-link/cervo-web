import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Globe, Lock, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import type {
	GetMembersMe200Member,
	PatchWorkspacesWorkspaceIdBody,
} from '#/api/cervoAPI.schemas'
import { useGetMembersMe } from '#/api/members/members'
import {
	deleteWorkspacesWorkspaceId,
	getGetWorkspacesMeQueryKey,
	patchWorkspacesWorkspaceId,
	postWorkspacesWorkspaceIdMembers,
} from '#/api/workspaces/workspaces'
import { apiClient } from '#/lib/api-client'
import { clientEnv } from '#/lib/env'
import { useWorkspace } from '#/lib/workspace-context'

type WorkspaceIntegration = {
	id: string
	workspaceId: string
	provider: string
	providerId: string
	createdAt: string
	active: boolean
}

function buildDiscordAuthUrl(workspaceId: string): string {
	const params = new URLSearchParams({
		client_id: clientEnv.VITE_CLIENT_ID,
		scope: 'bot applications.commands',
		permissions: '68608',
		redirect_uri: `${window.location.origin}/discord/callback`,
		response_type: 'code',
		state: workspaceId,
	})
	return `https://discord.com/oauth2/authorize?${params.toString()}`
}

const searchSchema = z.object({
	discord_connected: z.boolean().optional(),
	discord_error: z.string().optional(),
})

export const Route = createFileRoute('/_dashboard/settings')({
	validateSearch: searchSchema,
	head: () => ({
		meta: [
			{ title: 'Workspace Settings — Cervo' },
			{ name: 'description', content: 'Workspace settings' },
		],
	}),
	component: SettingsPage,
})

function SectionLabel({ children }: { children: React.ReactNode }) {
	return (
		<span className="font-mono text-[11px] font-semibold tracking-[0.5px] text-[#6a6a6a]">
			{children}
		</span>
	)
}

function FieldLabel({
	children,
	description,
}: {
	children: React.ReactNode
	description?: string
}) {
	return (
		<div className="flex flex-col gap-1">
			<span className="font-mono text-[13px] font-semibold tracking-[0.5px] text-foreground">
				{children}
			</span>
			{description && (
				<span className="font-mono text-[11px] leading-relaxed text-[#6a6a6a]">
					{description}
				</span>
			)}
		</div>
	)
}

function MemberRow({
	member,
	memberRole = 'Member',
}: {
	member: GetMembersMe200Member
	memberRole?: 'Owner' | 'Member' | 'Guest'
}) {
	const initial = (member.name ?? member.email ?? '?')[0].toUpperCase()
	const isOwner = memberRole === 'Owner'

	return (
		<div className="flex items-center justify-between px-5 py-4">
			<div className="flex items-center gap-3">
				<div className="flex size-8 items-center justify-center bg-[#1A1A1A]">
					<span
						className={`font-mono text-[12px] font-semibold ${isOwner ? 'text-[#00FF88]' : 'text-[#8a8a8a]'}`}
					>
						{initial}
					</span>
				</div>
				<div className="flex flex-col gap-0.5">
					<span className="font-mono text-[13px] font-semibold tracking-[0.5px] text-foreground">
						{member.name ?? member.username ?? 'Unknown'}
					</span>
					<span className="font-mono text-[11px] tracking-[0.5px] text-[#6a6a6a]">
						{member.email ?? ''}
					</span>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<div
					className={`flex items-center px-2 py-1 ${isOwner ? 'bg-[#00FF8820]' : 'bg-[#141414]'}`}
				>
					<span
						className={`font-mono text-[9px] font-bold tracking-[0.5px] ${isOwner ? 'text-[#00FF88]' : 'text-[#8a8a8a]'}`}
					>
						{memberRole}
					</span>
				</div>
				{!isOwner && (
					<button
						type="button"
						className="flex size-7 items-center justify-center text-[#6a6a6a] transition-colors hover:text-[#FF4444]"
					>
						<Trash2 className="size-3.5" />
					</button>
				)}
			</div>
		</div>
	)
}

function WorkspaceDetails({
	member,
}: {
	member: GetMembersMe200Member | null
}) {
	const { workspace, setWorkspace, workspaces } = useWorkspace()
	const [wsName, setWsName] = useState(workspace?.name ?? '')
	const [wsDescription, setWsDescription] = useState(
		workspace?.description ?? ''
	)
	const [wsIsPublic, setWsIsPublic] = useState(workspace?.isPublic ?? false)
	const [inviteEmail, setInviteEmail] = useState('')
	const queryClient = useQueryClient()

	const { data: integrationsData } = useQuery({
		queryKey: ['/workspaces/integrations', workspace?.id],
		queryFn: () =>
			apiClient<{
				data: { integrations: WorkspaceIntegration[] }
				status: number
			}>(`/workspaces/${workspace?.id}/integrations`),
		enabled: !!workspace?.id,
	})

	const integrations =
		integrationsData?.status === 200 ? integrationsData.data.integrations : []
	const discordIntegration = integrations.find(i => i.provider === 'discord')
	const hasDiscord = !!discordIntegration

	const { mutate: disconnectDiscord, isPending: isDisconnecting } = useMutation(
		{
			mutationFn: (integrationId: string) =>
				apiClient(
					`/workspaces/${workspace?.id}/integrations/${integrationId}`,
					{
						method: 'DELETE',
					}
				),
			onSuccess: () => {
				toast.success('Discord server disconnected.')
				void queryClient.invalidateQueries({
					queryKey: ['/workspaces/integrations', workspace?.id],
				})
			},
			onError: () => toast.error('Failed to disconnect Discord server.'),
		}
	)

	const { mutate: inviteMember, isPending: isInviting } = useMutation({
		mutationFn: (email: string) =>
			postWorkspacesWorkspaceIdMembers(workspace?.id ?? '', { email }),
		onSuccess: result => {
			if (result.status !== 201) return
			setInviteEmail('')
			toast.success('Member invited.')
		},
		onError: () => toast.error('Failed to invite member.'),
	})

	const { mutate: updateWorkspace, isPending: isSaving } = useMutation({
		mutationFn: (data: PatchWorkspacesWorkspaceIdBody) =>
			patchWorkspacesWorkspaceId(workspace?.id ?? '', data),
		onSuccess: async result => {
			if (result.status !== 200) return
			setWorkspace(result.data.workspace)
			await queryClient.invalidateQueries({
				queryKey: getGetWorkspacesMeQueryKey(),
			})
			toast.success('Workspace updated.')
		},
		onError: () => toast.error('Failed to update workspace.'),
	})

	const { mutate: deleteWorkspace, isPending: isDeleting } = useMutation({
		mutationFn: () => deleteWorkspacesWorkspaceId(workspace?.id ?? ''),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: getGetWorkspacesMeQueryKey(),
			})
			const remaining = workspaces.filter(ws => ws.id !== workspace?.id)
			if (remaining.length > 0) setWorkspace(remaining[0])
			toast.success('Workspace deleted.')
		},
		onError: () => toast.error('Failed to delete workspace.'),
	})

	if (!workspace) return null

	const nameChanged = wsName.trim() !== workspace.name
	const descriptionChanged =
		(wsDescription.trim() || null) !== workspace.description
	const visibilityChanged = wsIsPublic !== workspace.isPublic
	const hasChanges = nameChanged || descriptionChanged || visibilityChanged

	function handleSave() {
		const payload: PatchWorkspacesWorkspaceIdBody = {}
		if (nameChanged) payload.name = wsName.trim()
		if (descriptionChanged) payload.description = wsDescription.trim() || null
		if (visibilityChanged) payload.isPublic = wsIsPublic
		updateWorkspace(payload)
	}

	function handleInviteMember() {
		if (!inviteEmail.trim()) return
		inviteMember(inviteEmail.trim())
	}

	function handleDeleteWorkspace() {
		if (!confirm(`Delete "${workspace?.name}"? This cannot be undone.`)) return
		deleteWorkspace()
	}

	return (
		<div className="flex max-w-2xl flex-col gap-10">
			{/* GENERAL */}
			<div className="flex flex-col gap-4">
				<SectionLabel>GENERAL</SectionLabel>
				<div className="border border-[#2f2f2f] bg-[#0A0A0A] p-6">
					<div className="flex flex-col gap-6">
						{workspace.isPersonal && (
							<p className="font-mono text-[12px] leading-relaxed text-[#8a8a8a]">
								This is your personal workspace. Using this workspace you can
								search links across all workspaces you belong to.
							</p>
						)}

						{/* Name */}
						<div className="flex flex-col gap-2">
							<FieldLabel description="Displayed to all workspace members.">
								Workspace Name
							</FieldLabel>
							<input
								value={wsName}
								disabled={workspace.isPersonal}
								onChange={e => setWsName(e.target.value)}
								placeholder="Workspace name..."
								className="h-11 border border-[#2f2f2f] bg-[#141414] px-3.5 font-mono text-[13px] font-medium text-foreground outline-none transition-colors placeholder:text-[#6a6a6a] disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary focus:border-primary disabled:hover:border-[#2f2f2f]"
							/>
						</div>

						{/* Description */}
						<div className="flex flex-col gap-2">
							<FieldLabel description="A short description of what this workspace is for.">
								Description
							</FieldLabel>
							<textarea
								value={wsDescription}
								disabled={workspace.isPersonal}
								onChange={e => setWsDescription(e.target.value)}
								placeholder="Optional description..."
								rows={3}
								className="resize-none border border-[#2f2f2f] bg-[#141414] px-3.5 py-3 font-mono text-[13px] font-medium text-foreground outline-none transition-colors placeholder:text-[#6a6a6a] disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary focus:border-primary disabled:hover:border-[#2f2f2f]"
							/>
						</div>

						{/* Visibility */}
						<div className="flex items-center justify-between gap-4">
							<div className="flex flex-col gap-1">
								<FieldLabel>Visibility</FieldLabel>
								<span className="font-mono text-[11px] leading-relaxed text-[#6a6a6a]">
									{wsIsPublic
										? 'Anyone with the workspace ID can find it.'
										: 'Only members you invite can access this workspace.'}
								</span>
							</div>
							<button
								type="button"
								disabled={workspace.isPersonal}
								onClick={() => setWsIsPublic(v => !v)}
								className={`flex h-10 shrink-0 items-center gap-2 border px-4 font-mono text-[11px] font-bold tracking-[0.5px] transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
									wsIsPublic
										? 'border-primary bg-primary/[0.06] text-primary hover:bg-primary/[0.12]'
										: 'border-[#2f2f2f] bg-[#141414] text-[#8a8a8a] hover:border-primary hover:text-foreground'
								}`}
							>
								{wsIsPublic ? (
									<Globe className="size-3.5" />
								) : (
									<Lock className="size-3.5" />
								)}
								{wsIsPublic ? 'PUBLIC' : 'PRIVATE'}
							</button>
						</div>

						{/* Save */}
						{!workspace.isPersonal && (
							<div className="flex justify-end">
								<button
									type="button"
									onClick={handleSave}
									disabled={!hasChanges || isSaving}
									className="flex h-11 items-center border border-[#00FF88] bg-[#00FF88] px-5 font-mono text-[11px] font-bold tracking-[0.5px] text-[#0C0C0C] transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#00E07A]"
								>
									{isSaving ? 'SAVING...' : 'SAVE CHANGES'}
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* MEMBERS */}
			{!workspace.isPersonal && (
				<div className="flex flex-col gap-4">
					<SectionLabel>MEMBERS</SectionLabel>
					<div className="border border-[#2f2f2f] bg-[#0A0A0A]">
						{member ? (
							<MemberRow member={member} memberRole="Owner" />
						) : (
							<div className="h-16 animate-pulse" />
						)}
					</div>
					{/* We will add this back in when we have a way to invite members */}
					{/* <div className="flex gap-2">
						<input
							value={inviteEmail}
							onChange={e => setInviteEmail(e.target.value)}
							onKeyDown={e => {
								if (e.key === 'Enter') handleInviteMember()
							}}
							placeholder="Invite by email..."
							className="h-11 flex-1 border border-[#2f2f2f] bg-[#141414] px-3.5 font-mono text-[13px] font-medium text-foreground outline-none transition-colors placeholder:text-[#6a6a6a] hover:border-primary focus:border-primary"
						/>
						<button
							type="button"
							onClick={handleInviteMember}
							disabled={!inviteEmail.trim() || isInviting}
							className="flex h-11 items-center border border-sidebar-border bg-[#141414] px-5 font-mono text-[11px] font-bold tracking-[0.5px] text-foreground transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
						>
							{isInviting ? 'INVITING...' : 'INVITE'}
						</button>
					</div> */}
				</div>
			)}

			{/* INTEGRATIONS */}
			<div className="flex flex-col gap-4">
				<SectionLabel>INTEGRATIONS</SectionLabel>
				<div className="border border-[#2f2f2f] bg-[#0A0A0A] divide-y divide-[#2f2f2f]">
					{/* Discord */}
					<div className="flex items-center gap-3 p-5">
						<div className="flex size-9 items-center justify-center bg-[#5865F2]">
							<span className="font-mono text-base font-bold text-white">
								D
							</span>
						</div>
						<div className="flex flex-1 flex-col gap-0.5">
							<span className="font-mono text-[13px] font-semibold tracking-[0.5px] text-foreground">
								Discord
							</span>
							<span className="font-mono text-[11px] text-[#6a6a6a]">
								{hasDiscord
									? 'Your Discord server is linked to this workspace'
									: 'Save links shared in your Discord server channels'}
							</span>
						</div>
						{hasDiscord ? (
							<div className="flex items-center gap-2">
								<div className="flex h-11 items-center border border-[#00FF8830] bg-[#00FF8808] px-4">
									<span className="font-mono text-[11px] font-bold tracking-[0.5px] text-[#00FF88]">
										CONNECTED
									</span>
								</div>
								<button
									type="button"
									onClick={() =>
										discordIntegration &&
										disconnectDiscord(discordIntegration.id)
									}
									disabled={isDisconnecting}
									className="flex h-11 items-center border border-[#3a1a1a] bg-[#0A0A0A] px-4 font-mono text-[11px] font-bold tracking-[0.5px] text-[#FF4444] transition-colors hover:border-[#FF4444] disabled:cursor-not-allowed disabled:opacity-40"
								>
									{isDisconnecting ? 'DISCONNECTING...' : 'DISCONNECT'}
								</button>
							</div>
						) : (
							<button
								type="button"
								onClick={() => {
									window.location.href = buildDiscordAuthUrl(workspace.id)
								}}
								className="flex h-11 items-center border border-sidebar-border bg-[#141414] px-5 font-mono text-[11px] font-bold tracking-[0.5px] text-foreground transition-colors hover:border-primary"
							>
								CONNECT
							</button>
						)}
					</div>

					{/* Slack — coming soon */}
					<div className="flex items-center gap-3 p-5 opacity-50">
						<div className="flex size-9 items-center justify-center bg-[#4A154B]">
							<span className="font-mono text-base font-bold text-white">
								S
							</span>
						</div>
						<div className="flex flex-1 flex-col gap-0.5">
							<span className="font-mono text-[13px] font-semibold tracking-[0.5px] text-foreground">
								Slack
							</span>
							<span className="font-mono text-[11px] text-[#6a6a6a]">
								Save links from your Slack workspace channels
							</span>
						</div>
						<div className="flex h-11 items-center border border-[#2f2f2f] bg-[#141414] px-4">
							<span className="font-mono text-[11px] font-bold tracking-[0.5px] text-[#6a6a6a]">
								COMING SOON
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* DANGER ZONE */}
			{!workspace.isPersonal && (
				<div className="flex flex-col gap-4">
					<SectionLabel>DANGER ZONE</SectionLabel>
					<div className="border border-[#3a1a1a] bg-[#0A0A0A] p-5">
						<div className="flex flex-col gap-3">
							<span className="font-mono text-[13px] font-semibold text-foreground">
								Delete workspace
							</span>
							<p className="font-mono text-[12px] leading-relaxed text-[#6a6a6a]">
								Permanently delete this workspace and all its data. This cannot
								be undone.
							</p>
							<button
								type="button"
								onClick={handleDeleteWorkspace}
								disabled={isDeleting}
								className="flex h-10 w-fit cursor-pointer items-center gap-2 bg-[#FF4444] px-4 font-mono text-[11px] font-bold tracking-[0.5px] text-white transition-colors hover:bg-[#E63C3C] active:bg-[#CC3333] disabled:cursor-not-allowed disabled:opacity-40"
							>
								<Trash2 className="size-3.5" />
								{isDeleting ? 'DELETING...' : 'DELETE WORKSPACE'}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

function SettingsPage() {
	const { workspace } = useWorkspace()
	const { data: membersMeRaw } = useGetMembersMe()
	const { discord_connected, discord_error } = Route.useSearch()
	const navigate = useNavigate()

	const member =
		membersMeRaw?.status === 200 ? (membersMeRaw.data.member ?? null) : null

	useEffect(() => {
		if (discord_connected) {
			toast.success('Discord server connected.')
			void navigate({ to: '/settings', replace: true })
		}
		if (discord_error) {
			const messages: Record<string, string> = {
				cancelled: 'Discord authorization was cancelled.',
				missing_data: 'Missing Discord authorization data.',
				already_connected: 'This Discord server is already connected.',
				failed: 'Failed to connect Discord server.',
			}
			toast.error(messages[discord_error] ?? 'Something went wrong.')
			void navigate({ to: '/settings', replace: true })
		}
	}, [discord_connected, discord_error, navigate])

	return (
		<div className="flex h-full flex-col gap-10 p-8 md:px-10">
			{/* Header */}
			<div className="flex flex-col gap-3">
				<h1 className="font-heading text-[42px] font-bold leading-none tracking-tight text-foreground">
					Workspace Settings
				</h1>
				<p className="font-mono text-[14px] text-[#8a8a8a]">
					Manage workspace members and integrations.
				</p>
			</div>

			{workspace ? (
				<WorkspaceDetails key={workspace.id} member={member} />
			) : (
				<div className="h-11 animate-pulse border border-sidebar-border bg-[#141414]" />
			)}
		</div>
	)
}
