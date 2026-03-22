import { Link } from "@tanstack/react-router";
import {
	Check,
	ChevronDown,
	HelpCircle,
	Layers,
	Link as LinkIcon,
	Settings,
	User,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "#/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
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

interface Workspace {
	id: string;
	name: string;
}

const MOCK_WORKSPACES: Workspace[] = [
	{ id: "1", name: "Personal" },
	{ id: "2", name: "Work" },
	{ id: "3", name: "Side Projects" },
];

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
	const [activeWorkspace, setActiveWorkspace] = useState<Workspace>(
		MOCK_WORKSPACES[0],
	);

	const userName = session?.user?.name ?? "User";
	const initials = getInitials(userName);

	return (
		<Sidebar side="left" variant="sidebar">
			<SidebarHeader className="gap-4 px-5 pt-8">
				<div className="flex items-center gap-3 pb-6">
					<span className="text-lg text-primary">🫎</span>
					<span className="font-mono text-base font-semibold tracking-wider text-foreground">
						CERVO
					</span>
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button
							type="button"
							className="flex h-11 w-full items-center gap-2.5 border border-sidebar-border bg-[#141414] px-4 font-mono text-[13px] transition-colors hover:border-primary data-[state=open]:border-primary"
						>
							<Layers className="size-4 text-muted-foreground transition-colors group-data-[state=open]:text-primary" />
							<span className="font-medium tracking-wide text-foreground">
								{activeWorkspace.name}
							</span>
							<span className="ml-auto">
								<ChevronDown className="size-3.5 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180 data-[state=open]:text-primary" />
							</span>
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="start"
						sideOffset={4}
						className="w-[var(--radix-dropdown-menu-trigger-width)] rounded-none border-[#2f2f2f] bg-[#141414] p-0"
					>
						{MOCK_WORKSPACES.map((workspace) => {
							const isActive = workspace.id === activeWorkspace.id;
							return (
								<DropdownMenuItem
									key={workspace.id}
									onSelect={() => setActiveWorkspace(workspace)}
									className={`h-10 cursor-pointer rounded-none px-4 font-mono text-xs tracking-[0.5px] focus:bg-[#ffffff08] ${
										isActive
											? "bg-primary/[0.06] font-semibold text-primary focus:bg-primary/[0.06] focus:text-primary"
											: "font-medium text-[#8a8a8a]"
									}`}
								>
									{isActive && <Check className="mr-2 size-3 text-primary" />}
									{workspace.name}
								</DropdownMenuItem>
							);
						})}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarHeader>

			<SidebarContent className="px-5 pt-2">
				<SidebarMenu className="gap-0.5">
					{NAV_ITEMS.map((item) => (
						<SidebarMenuItem key={item.label}>
							<SidebarMenuButton asChild className="h-10 px-5">
								<Link
									to={item.to}
									className="font-mono text-xs tracking-wide text-muted-foreground no-underline"
									activeProps={{
										className:
											"bg-primary/[0.06] font-bold text-primary no-underline",
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
				<div className="flex items-center gap-3">
					<Avatar className="size-8">
						<AvatarFallback className="bg-sidebar-accent font-mono text-xs font-bold text-foreground">
							{initials}
						</AvatarFallback>
					</Avatar>
					<span className="font-mono text-[11px] tracking-wide text-muted-foreground">
						{userName}
					</span>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
