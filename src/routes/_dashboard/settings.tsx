import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Globe, Lock, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import type {
	GetMembersMe200Member,
	PatchWorkspacesWorkspaceIdBody,
	PostWorkspacesWorkspaceIdIntegrationsBody,
} from '#/api/cervoAPI.schemas'
import { useGetMembersMe } from '#/api/members/members'
import { postWorkspacesWorkspaceIdIntegrations } from '#/api/workspace-integrations/workspace-integrations'
import {
	deleteWorkspacesWorkspaceId,
	getGetWorkspacesMeQueryKey,
	patchWorkspacesWorkspaceId,
} from '#/api/workspaces/workspaces'
import { useWorkspace } from '#/lib/workspace-context'

export const Route = createFileRoute('/_dashboard/settings')({
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
	const [providerId, setProviderId] = useState('')
	const queryClient = useQueryClient()

	const { mutate: addIntegration, isPending: isAddingIntegration } =
		useMutation({
			mutationFn: (data: PostWorkspacesWorkspaceIdIntegrationsBody) =>
				postWorkspacesWorkspaceIdIntegrations(workspace?.id ?? '', data),
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

	function handleAddIntegration() {
		if (!providerId.trim()) return
		addIntegration(
			{ provider: 'discord', providerId: providerId.trim() },
			{
				onSuccess: () => {
					setProviderId('')
					toast.success('Integration connected.')
				},
				onError: () => {
					toast.error('Failed to connect integration.')
				},
			}
		)
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
				</div>
			)}

			{/* INTEGRATIONS */}
			<div className="flex flex-col gap-4">
				<SectionLabel>INTEGRATIONS</SectionLabel>
				<div className="border border-[#2f2f2f] bg-[#0A0A0A] p-5">
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-3">
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
									Discord server integration
								</span>
							</div>
							<button
								type="button"
								onClick={handleAddIntegration}
								disabled={!providerId.trim() || isAddingIntegration}
								className="flex h-11 items-center border border-sidebar-border bg-[#141414] px-5 font-mono text-[11px] font-bold tracking-[0.5px] text-foreground transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
							>
								{isAddingIntegration ? 'CONNECTING...' : 'CONNECT DISCORD'}
							</button>
						</div>
						<p className="font-mono text-[12px] leading-relaxed text-[#6a6a6a]">
							Connect your Discord server to automatically save links shared in
							your channels.
						</p>
						<input
							value={providerId}
							onChange={e => setProviderId(e.target.value)}
							onKeyDown={e => {
								if (e.key === 'Enter') handleAddIntegration()
							}}
							placeholder="Guild or server ID..."
							className="h-11 border border-[#2f2f2f] bg-[#141414] px-3.5 font-mono text-[13px] font-medium text-foreground outline-none transition-colors placeholder:text-[#6a6a6a] hover:border-primary focus:border-primary"
						/>
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

	const member =
		membersMeRaw?.status === 200 ? (membersMeRaw.data.member ?? null) : null

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
