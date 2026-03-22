import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { AppSidebar } from "#/components/AppSidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "#/components/ui/sidebar";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/_dashboard")({
	component: DashboardLayout,
});

function DashboardLayout() {
	const { data: session, isPending } = authClient.useSession();
	const navigate = useNavigate();

	if (isPending) {
		return (
			<div className="flex h-screen items-center justify-center bg-background">
				<span className="font-mono text-sm text-muted-foreground">
					Loading...
				</span>
			</div>
		);
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
	);
}
