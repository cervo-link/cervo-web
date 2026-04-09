import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { GetWorkspacesMe200WorkspacesItem } from '#/api/cervoAPI.schemas'
import { useGetWorkspacesMe } from '#/api/workspaces/workspaces'
import type { MembershipRole } from './abilities'
import { defineAbilitiesFor } from './abilities'
import { AbilityContext } from './ability-context'

const STORAGE_KEY = 'cervo:workspace_id'

interface WorkspaceContextValue {
	workspaces: GetWorkspacesMe200WorkspacesItem[]
	workspace: GetWorkspacesMe200WorkspacesItem | null
	setWorkspace: (workspace: GetWorkspacesMe200WorkspacesItem) => void
	selectAfterRefresh: (id: string) => void
	isLoading: boolean
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null)

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
	const { data, isLoading } = useGetWorkspacesMe()
	const workspaces = data?.status === 200 ? data.data.workspaces : []

	const [workspaceState, setWorkspaceState] =
		useState<GetWorkspacesMe200WorkspacesItem | null>(null)

	const [pendingSelectId, setPendingSelectId] = useState<string | null>(() =>
		localStorage.getItem(STORAGE_KEY)
	)

	useEffect(() => {
		if (workspaces.length === 0) return

		if (pendingSelectId) {
			const target = workspaces.find(ws => ws.id === pendingSelectId)
			if (target) {
				localStorage.setItem(STORAGE_KEY, target.id)
				setWorkspaceState(target)
				setPendingSelectId(null)
				return
			}
		}

		// Default to first workspace on initial load
		setWorkspaceState(current => {
			if (current) return current
			const first = workspaces[0]
			localStorage.setItem(STORAGE_KEY, first.id)
			return first
		})
	}, [workspaces, pendingSelectId])

	function setWorkspace(ws: GetWorkspacesMe200WorkspacesItem) {
		localStorage.setItem(STORAGE_KEY, ws.id)
		setWorkspaceState(ws)
	}

	function selectAfterRefresh(id: string) {
		setPendingSelectId(id)
	}

	const ability = useMemo(
		() =>
			defineAbilitiesFor(
				(workspaceState?.role ?? null) as MembershipRole | null
			),
		[workspaceState?.role]
	)

	return (
		<WorkspaceContext.Provider
			value={{
				workspaces,
				workspace: workspaceState,
				setWorkspace,
				selectAfterRefresh,
				isLoading,
			}}
		>
			<AbilityContext.Provider value={ability}>
				{children}
			</AbilityContext.Provider>
		</WorkspaceContext.Provider>
	)
}

export function useWorkspace(): WorkspaceContextValue {
	const ctx = useContext(WorkspaceContext)
	if (!ctx)
		throw new Error('useWorkspace must be used within WorkspaceProvider')
	return ctx
}
