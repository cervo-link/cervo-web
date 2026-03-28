import { createContext, useContext, useEffect, useState } from 'react'
import type { GetWorkspacesMe200WorkspacesItem } from '#/api/cervoAPI.schemas'
import { useGetWorkspacesMe } from '#/api/workspaces/workspaces'

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
	const workspaces =
		(data?.status === 200 ? data.data.workspaces : undefined) ?? []

	const [workspace, setWorkspace] =
		useState<GetWorkspacesMe200WorkspacesItem | null>(null)

	const [pendingSelectId, setPendingSelectId] = useState<string | null>(null)

	useEffect(() => {
		if (workspaces.length === 0) return

		if (pendingSelectId) {
			const target = workspaces.find(ws => ws.id === pendingSelectId)
			if (target) {
				setWorkspace(target)
				setPendingSelectId(null)
				return
			}
		}

		// Default to first workspace on initial load
		setWorkspace(ws => ws ?? workspaces[0])
	}, [workspaces, pendingSelectId])

	function selectAfterRefresh(id: string) {
		setPendingSelectId(id)
	}

	return (
		<WorkspaceContext.Provider
			value={{
				workspaces,
				workspace,
				setWorkspace,
				selectAfterRefresh,
				isLoading,
			}}
		>
			{children}
		</WorkspaceContext.Provider>
	)
}

export function useWorkspace(): WorkspaceContextValue {
	const ctx = useContext(WorkspaceContext)
	if (!ctx)
		throw new Error('useWorkspace must be used within WorkspaceProvider')
	return ctx
}
