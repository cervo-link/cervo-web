import { createFileRoute } from '@tanstack/react-router'
import { Globe, Hash, Lock, Plus, Trash2, Users, Zap } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import type {
	GetMembersMe200Member,
	GetWorkspacesMe200WorkspacesItem,
} from '#/api/cervoAPI.schemas'
import { useGetMembersMe } from '#/api/members/members'
import { usePostWorkspacesWorkspaceIdIntegrations } from '#/api/workspace-integrations/workspace-integrations'
import { useGetWorkspacesMe } from '#/api/workspaces/workspaces'
import { Input } from '#/components/ui/input'
import { Separator } from '#/components/ui/separator'

export const Route = createFileRoute('/_dashboard/settings')({
	head: () => ({
		meta: [
			{ title: 'Workspace — Cervo' },
			{
				name: 'description',
				content: 'Workspace settings',
			},
		],
	}),
	component: SettingsPage,
})

function SectionLabel({ children }: { children: React.ReactNode }) {
	return (
		<span className="font-mono text-[11px] font-medium tracking-[0.5px] text-[#6a6a6a]">
			{children}
		</span>
	)
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex flex-col gap-1.5">
			<span className="font-mono text-[11px] font-medium text-[#6a6a6a]">
				{label}
			</span>
			<div className="flex h-11 items-center border border-sidebar-border bg-[#0A0A0A] px-4">
				<span className="font-mono text-[13px] font-medium text-foreground">
					{value}
				</span>
			</div>
		</div>
	)
}

function SettingsSection({
	icon: Icon,
	title,
	description,
	children,
}: {
	icon: React.ElementType
	title: string
	description?: string
	children: React.ReactNode
}) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-start gap-3">
				<div className="flex size-9 items-center justify-center border border-sidebar-border bg-[#141414]">
					<Icon className="size-4 text-muted-foreground" />
				</div>
				<div className="flex flex-col gap-0.5">
					<span className="font-mono text-[13px] font-medium text-foreground">
						{title}
					</span>
					{description && (
						<span className="font-mono text-[12px] text-[#8a8a8a]">
							{description}
						</span>
					)}
				</div>
			</div>
			<div className="ml-12 flex flex-col gap-4">{children}</div>
		</div>
	)
}

function MemberRow({ member }: { member: GetMembersMe200Member }) {
	const initials = (member.name ?? member.email ?? '?')
		.split(' ')
		.map(p => p[0])
		.join('')
		.toUpperCase()
		.slice(0, 2)

	return (
		<div className="flex h-11 items-center gap-3 border border-sidebar-border bg-[#141414] px-4">
			<div className="flex size-6 items-center justify-center bg-sidebar-accent font-mono text-[10px] font-bold text-foreground">
				{initials}
			</div>
			<span className="flex-1 font-mono text-[13px] font-medium text-foreground">
				{member.name ?? member.username ?? member.email ?? 'Unknown'}
			</span>
			<span className="font-mono text-[11px] text-[#6a6a6a]">you</span>
		</div>
	)
}

function WorkspaceDetails({
	workspace,
	member,
}: {
	workspace: GetWorkspacesMe200WorkspacesItem
	member: GetMembersMe200Member | null
}) {
	const provider = 'discord'
	const [providerId, setProviderId] = useState('')
	const { mutate: addIntegration, isPending: isAddingIntegration } =
		usePostWorkspacesWorkspaceIdIntegrations()

	function handleAddIntegration() {
		if (!providerId.trim()) return
		addIntegration(
			{
				workspaceId: workspace.id,
				data: { provider, providerId: providerId.trim() },
			},
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

	return (
		<div className="flex flex-col gap-10">
			{/* Workspace Info */}
			<div className="flex flex-col gap-5">
				<SectionLabel>WORKSPACE INFO</SectionLabel>
				<Separator className="bg-[#2f2f2f]" />
				<SettingsSection
					icon={Hash}
					title="Details"
					description="Your workspace name and visibility settings."
				>
					<div className="flex flex-col gap-3">
						<ReadOnlyField label="Name" value={workspace.name} />
						{workspace.isPersonal && (
							<p className="font-mono text-[12px] leading-relaxed text-[#8a8a8a]">
								This is your personal workspace. Using this workspace you can
								search links across all workspaces you belong to.
							</p>
						)}
						<ReadOnlyField
							label="Description"
							value={workspace.description ?? '—'}
						/>
						<div className="flex flex-col gap-1.5">
							<span className="font-mono text-[11px] font-medium text-[#6a6a6a]">
								Visibility
							</span>
							<div className="flex h-11 items-center gap-2.5 border border-sidebar-border bg-[#0A0A0A] px-4">
								{workspace.isPublic ? (
									<Globe className="size-3.5 text-muted-foreground" />
								) : (
									<Lock className="size-3.5 text-muted-foreground" />
								)}
								<span className="font-mono text-[13px] font-medium text-foreground">
									{workspace.isPublic ? 'Public' : 'Private'}
								</span>
							</div>
						</div>
					</div>
				</SettingsSection>
			</div>

			{/* Members */}
			{!workspace.isPersonal && (
				<div className="flex flex-col gap-5">
					<SectionLabel>MEMBERS</SectionLabel>
					<Separator className="bg-[#2f2f2f]" />
					<SettingsSection
						icon={Users}
						title="Team members"
						description="People who have access to this workspace."
					>
						<div className="flex flex-col gap-2">
							{member ? (
								<MemberRow member={member} />
							) : (
								<div className="h-11 animate-pulse border border-sidebar-border bg-[#141414]" />
							)}
						</div>
					</SettingsSection>
				</div>
			)}

			{/* Integrations */}
			<div className="flex flex-col gap-5">
				<SectionLabel>INTEGRATIONS</SectionLabel>
				<Separator className="bg-[#2f2f2f]" />
				<SettingsSection
					icon={Zap}
					title="Platform integrations"
					description="Connect bots and external services to this workspace."
				>
					<div className="flex flex-col gap-3">
						<div className="flex flex-col gap-1.5">
							<span className="font-mono text-[11px] font-medium text-[#6a6a6a]">
								Provider
							</span>
							<div className="flex h-11 items-center border border-sidebar-border bg-[#0A0A0A] px-4">
								<span className="font-mono text-[13px] font-medium text-foreground">
									discord
								</span>
							</div>
						</div>
						<div className="flex gap-2">
							<Input
								value={providerId}
								onChange={e => setProviderId(e.target.value)}
								onKeyDown={e => {
									if (e.key === 'Enter') handleAddIntegration()
								}}
								placeholder="Guild or channel ID..."
								className="h-11 border-sidebar-border bg-[#0A0A0A] font-mono text-[13px] font-medium text-foreground transition-colors placeholder:text-muted-foreground hover:border-primary focus-visible:border-primary focus-visible:ring-0"
							/>
							<button
								type="button"
								onClick={handleAddIntegration}
								disabled={!providerId.trim() || isAddingIntegration}
								className="flex h-11 items-center gap-2 border border-sidebar-border bg-[#141414] px-5 font-mono text-[13px] font-medium text-foreground transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
							>
								<Plus className="size-3.5" />
								{isAddingIntegration ? 'Connecting...' : 'Connect'}
							</button>
						</div>
					</div>
				</SettingsSection>
			</div>

			{/* Danger Zone */}
			{!workspace.isPersonal && (
				<div className="flex flex-col gap-5">
					<SectionLabel>DANGER ZONE</SectionLabel>
					<Separator className="bg-[#2f2f2f]" />
					<SettingsSection
						icon={Trash2}
						title="Delete workspace"
						description="Permanently delete this workspace and all its data. This cannot be undone."
					>
						<button
							type="button"
							disabled
							className="flex h-11 w-fit items-center gap-2 border border-[#3a1a1a] bg-[#1a0a0a] px-5 font-mono text-[13px] font-medium text-[#8a4a4a] transition-colors hover:border-red-800 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
						>
							<Trash2 className="size-3.5" />
							Delete workspace
						</button>
					</SettingsSection>
				</div>
			)}
		</div>
	)
}

function SettingsPage() {
	const { data: workspacesRaw } = useGetWorkspacesMe()
	const { data: membersMeRaw } = useGetMembersMe()
	const [selectedIndex, setSelectedIndex] = useState(0)

	const workspaces =
		(
			workspacesRaw as unknown as
				| { workspaces: GetWorkspacesMe200WorkspacesItem[] }
				| undefined
		)?.workspaces ?? []

	const member =
		(membersMeRaw as unknown as { member: GetMembersMe200Member } | undefined)
			?.member ?? null

	const workspace = workspaces[selectedIndex] ?? null

	return (
		<div className="flex h-full flex-col gap-10 p-8 md:px-10">
			<h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
				Workspace
			</h1>

			{workspaces.length > 1 && (
				<div className="flex gap-0">
					{workspaces.map((ws, i) => (
						<button
							key={ws.id}
							type="button"
							onClick={() => setSelectedIndex(i)}
							className={`h-11 border px-5 font-mono text-[13px] font-medium transition-colors ${
								i === selectedIndex
									? 'border-primary bg-primary/[0.06] text-primary'
									: 'border-sidebar-border bg-[#141414] text-muted-foreground hover:border-primary hover:text-foreground'
							} ${i > 0 ? '-ml-px' : ''}`}
						>
							{ws.name}
						</button>
					))}
				</div>
			)}

			<div className="max-w-2xl">
				{workspace ? (
					<WorkspaceDetails workspace={workspace} member={member} />
				) : (
					<div className="h-11 animate-pulse border border-sidebar-border bg-[#141414]" />
				)}
			</div>
		</div>
	)
}
