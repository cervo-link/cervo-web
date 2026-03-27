import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AppSidebar } from '#/components/AppSidebar'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '#/components/ui/sidebar'
// Toaster moved to LinkDetailView for SSR module singleton compatibility
import { authClient } from '#/lib/auth-client'

export const Route = createFileRoute('/_dashboard')({
	component: DashboardLayout,
})

function DashboardLayout() {
	const { isPending } = authClient.useSession()

	if (isPending) {
		return (
			<div className="flex h-screen items-center justify-center bg-background">
				<span className="font-mono text-sm text-muted-foreground">
					Loading...
				</span>
			</div>
		)
	}

	// TODO: restore auth guard
	// if (!session) {
	// 	void navigate({ to: "/sign-in" });
	// 	return null;
	// }

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-12 items-center px-4 md:hidden">
					<SidebarTrigger />
				</header>
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	)
}
