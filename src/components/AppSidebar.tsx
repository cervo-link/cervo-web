import { useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import {
	ChevronDown,
	ChevronUp,
	HelpCircle,
	Layers,
	Link as LinkIcon,
	LogOut,
	Plus,
	Settings,
	User,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useGetMembersMe } from '#/api/members/members'
import {
	getGetWorkspacesMeQueryKey,
	usePostWorkspacesCreate,
} from '#/api/workspaces/workspaces'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '#/components/ui/sidebar'
import { authClient } from '#/lib/auth-client'
import { useWorkspace } from '#/lib/workspace-context'

const NAV_ITEMS = [
	{ label: 'Links', to: '/links', icon: LinkIcon },
	{ label: 'Workspace', to: '/settings', icon: Settings },
	{ label: 'Account', to: '/account', icon: User },
	{ label: 'Help', to: '/help', icon: HelpCircle },
] as const

function getInitials(name: string): string {
	return name
		.split(' ')
		.map(part => part[0])
		.join('')
		.toUpperCase()
		.slice(0, 2)
}

function WorkspaceDropdown() {
	const { workspaces, workspace, setWorkspace, selectAfterRefresh } =
		useWorkspace()
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	const queryClient = useQueryClient()
	const { data: membersMeRaw } = useGetMembersMe()
	const memberId =
		membersMeRaw?.status === 200 ? membersMeRaw.data.member?.id : undefined

	const { mutate: createWorkspace, isPending: isCreating } =
		usePostWorkspacesCreate()

	function handleCreateWorkspace() {
		if (!memberId) return
		createWorkspace(
			{ data: { name: 'New Workspace', ownerId: memberId } },
			{
				onSuccess: result => {
					if (result.status !== 201) return
					selectAfterRefresh(result.data.workspace.id)
					void queryClient.invalidateQueries({
						queryKey: getGetWorkspacesMeQueryKey(),
					})
					setOpen(false)
				},
			}
		)
	}

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
		}
		document.addEventListener('mousedown', handler)
		return () => document.removeEventListener('mousedown', handler)
	}, [])

	if (!workspace) {
		return (
			<div className="flex h-11 w-full items-center gap-2.5 border border-sidebar-border bg-[#141414] px-4">
				<Layers className="size-4 text-muted-foreground" />
				<span className="font-mono text-[13px] font-medium tracking-wide text-muted-foreground">
					Loading...
				</span>
			</div>
		)
	}

	return (
		<div className="relative" ref={ref}>
			<button
				type="button"
				onClick={() => setOpen(o => !o)}
				className="flex h-11 w-full items-center justify-between gap-2.5 border border-[#00FF88] bg-[#141414] px-4 outline-none transition-colors"
			>
				<div className="flex items-center gap-2.5">
					<Layers className="size-4 text-[#00FF88]" />
					<span className="font-mono text-[13px] font-medium tracking-wide text-foreground">
						{workspace.name}
					</span>
				</div>
				{open ? (
					<ChevronUp className="size-3.5 text-[#00FF88]" />
				) : (
					<ChevronDown className="size-3.5 text-[#00FF88]" />
				)}
			</button>

			{open && (
				<div className="absolute left-0 top-full z-50 w-full border border-[#2f2f2f] bg-[#141414]">
					{workspaces.map(ws => {
						const isActive = ws.id === workspace.id
						return (
							<button
								key={ws.id}
								type="button"
								onClick={() => {
									setWorkspace(ws)
									setOpen(false)
								}}
								className={`flex h-10 w-full items-center px-4 text-left transition-colors ${
									isActive ? 'bg-[#00FF8810]' : 'hover:bg-[#1A1A1A]'
								}`}
							>
								<span
									className={`font-mono text-[12px] tracking-[0.5px] ${
										isActive
											? 'font-semibold text-[#00FF88]'
											: 'font-medium text-[#8a8a8a]'
									}`}
								>
									{ws.name}
								</span>
							</button>
						)
					})}
					<div className="mx-4 h-px bg-[#2f2f2f]" />
					<button
						type="button"
						onClick={handleCreateWorkspace}
						disabled={isCreating || !memberId}
						className="flex h-10 w-full items-center gap-2.5 px-4 text-left transition-colors hover:bg-[#1A1A1A] disabled:cursor-not-allowed disabled:opacity-40"
					>
						<Plus className="size-3 text-[#6a6a6a]" />
						<span className="font-mono text-[12px] font-medium tracking-[0.5px] text-[#6a6a6a]">
							{isCreating ? 'Creating...' : 'New workspace'}
						</span>
					</button>
				</div>
			)}
		</div>
	)
}

export function AppSidebar() {
	const { data: session } = authClient.useSession()
	const navigate = useNavigate()
	const userName = session?.user?.name ?? 'User'
	const initials = getInitials(userName)
	const firstFocusRef = useRef<HTMLDivElement>(null)

	const handleSidebarKeyDown = useCallback((e: React.KeyboardEvent) => {
		if (e.key !== 'Tab' || e.shiftKey) return
		const sidebar = e.currentTarget
		const focusableElements = sidebar.querySelectorAll<HTMLElement>(
			'button, a, input, [tabindex]:not([tabindex="-1"])'
		)
		const isAnyFocused = Array.from(focusableElements).some(
			el => el === document.activeElement
		)
		if (isAnyFocused) return
		e.preventDefault()
		firstFocusRef.current?.focus()
	}, [])

	return (
		<Sidebar side="left" variant="sidebar" onKeyDown={handleSidebarKeyDown}>
			<SidebarHeader className="gap-8 px-5 pt-10 pb-0">
				<div className="flex justify-center">
					<Link to="/" className="no-underline">
						<img src="/cervo-horizontal.png" alt="Cervo" className="h-8" />
					</Link>
				</div>
				<div ref={firstFocusRef}>
					<WorkspaceDropdown />
				</div>
			</SidebarHeader>

			<SidebarContent className="px-5 pt-0">
				<SidebarMenu className="gap-0">
					{NAV_ITEMS.map(item => (
						<SidebarMenuItem key={item.label}>
							<SidebarMenuButton
								asChild
								className="h-11 rounded-none border border-transparent px-5 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
							>
								<Link
									to={item.to}
									className="font-mono text-xs tracking-wide text-muted-foreground no-underline"
									activeProps={{
										className:
											'bg-primary/[0.06] font-bold text-primary no-underline',
									}}
									onKeyDown={e => {
										if (e.key !== ' ') return
										e.preventDefault()
										e.currentTarget.click()
									}}
								>
									<item.icon className="size-4" />
									<span>{item.label}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>

			<SidebarFooter className="px-5 pb-8">
				<button
					type="button"
					className="flex items-center gap-3 border border-transparent px-2 py-2.5 outline-none transition-colors focus-visible:border-primary"
				>
					<Avatar className="size-8">
						<AvatarFallback className="bg-sidebar-accent font-mono text-xs font-bold text-foreground">
							{initials}
						</AvatarFallback>
					</Avatar>
					<span className="font-mono text-[11px] tracking-wide text-muted-foreground">
						{userName}
					</span>
				</button>
				<button
					type="button"
					onClick={async () => {
						await authClient.signOut()
						void navigate({ to: '/sign-in' })
					}}
					className="flex h-11 w-full items-center gap-2.5 border border-transparent px-2 font-mono text-xs tracking-wide text-muted-foreground outline-none transition-colors hover:border-primary hover:text-foreground focus-visible:border-primary"
				>
					<LogOut className="size-4" />
					<span>Sign out</span>
				</button>
			</SidebarFooter>
		</Sidebar>
	)
}
