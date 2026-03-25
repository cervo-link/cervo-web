import { Link } from "@tanstack/react-router";
import {
	HelpCircle,
	Layers,
	Link as LinkIcon,
	LogOut,
	Settings,
	User,
} from "lucide-react";
import { useCallback, useRef } from "react";
import { useGetWorkspacesMe } from "#/api/workspaces/workspaces";
import { Avatar, AvatarFallback } from "#/components/ui/avatar";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "#/components/ui/sidebar";
import { authClient } from "#/lib/auth-client";

const NAV_ITEMS = [
	{ label: "Links", to: "/links", icon: LinkIcon },
	{ label: "Workspace", to: "/settings", icon: Settings },
	{ label: "Account", to: "/account", icon: User },
	{ label: "Help", to: "/help", icon: HelpCircle },
] as const;

function getInitials(name: string): string {
	return name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

export function AppSidebar() {
	const { data: session } = authClient.useSession();
	const { data: workspacesData } = useGetWorkspacesMe();
	const workspace =
		(workspacesData as unknown as { workspaces: { name: string }[] } | undefined)
			?.workspaces?.[0] ?? null;

	const userName = session?.user?.name ?? "User";
	const initials = getInitials(userName);
	const firstFocusRef = useRef<HTMLDivElement>(null);

	const handleSidebarKeyDown = useCallback((e: React.KeyboardEvent) => {
		if (e.key !== "Tab" || e.shiftKey) {
			return;
		}
		const sidebar = e.currentTarget;
		const focusableElements = sidebar.querySelectorAll<HTMLElement>(
			'button, a, input, [tabindex]:not([tabindex="-1"])',
		);
		const isAnyFocused = Array.from(focusableElements).some(
			(el) => el === document.activeElement,
		);
		if (isAnyFocused) {
			return;
		}
		e.preventDefault();
		firstFocusRef.current?.focus();
	}, []);

	return (
		<Sidebar side="left" variant="sidebar" onKeyDown={handleSidebarKeyDown}>
			<SidebarHeader className="gap-8 px-5 pt-10 pb-0">
				<div className="flex justify-center">
					<Link to="/" className="no-underline">
						<img src="/cervo-horizontal.png" alt="Cervo" className="h-8" />
					</Link>
				</div>

				<div
					ref={firstFocusRef}
					className="flex h-11 w-full items-center gap-2.5 border border-sidebar-border bg-[#141414] px-4 font-mono text-[13px]"
				>
					<Layers className="size-4 text-muted-foreground" />
					<span className="font-medium tracking-wide text-foreground">
						{workspace?.name ?? "Loading..."}
					</span>
				</div>
			</SidebarHeader>

			<SidebarContent className="px-5 pt-0">
				<SidebarMenu className="gap-0">
					{NAV_ITEMS.map((item) => (
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
											"bg-primary/[0.06] font-bold text-primary no-underline",
									}}
									onKeyDown={(e) => {
										if (e.key !== " ") {
											return;
										}
										e.preventDefault();
										e.currentTarget.click();
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
					onClick={() => void authClient.signOut()}
					className="flex h-11 w-full items-center gap-2.5 border border-transparent px-2 font-mono text-xs tracking-wide text-muted-foreground outline-none transition-colors hover:border-primary hover:text-foreground focus-visible:border-primary"
				>
					<LogOut className="size-4" />
					<span>Sign out</span>
				</button>
			</SidebarFooter>
		</Sidebar>
	);
}
