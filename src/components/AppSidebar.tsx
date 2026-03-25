import { Link } from "@tanstack/react-router";
import {
  Check,
  ChevronDown,
  HelpCircle,
  Layers,
  Link as LinkIcon,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useCallback, useEffect, useRef } from "react";
import type { GetWorkspacesMe200WorkspacesItem } from "#/api/cervoAPI.schemas";
import { useGetWorkspacesMe } from "#/api/workspaces/workspaces";
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
  const workspaces = workspacesData?.workspaces ?? [];

  const [workspaceId, setWorkspaceId] = useQueryState(
    "workspace",
    parseAsString.withDefault(""),
  );

  useEffect(() => {
    if (workspaces.length > 0 && !workspaceId) {
      void setWorkspaceId(workspaces[0].id);
    }
  }, [workspaces, workspaceId, setWorkspaceId]);

  const activeWorkspace =
    workspaces.find((w) => w.id === workspaceId) ?? workspaces[0];

  const userName = session?.user?.name ?? "User";
  const initials = getInitials(userName);
  const dropdownRef = useRef<HTMLButtonElement>(null);

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
    dropdownRef.current?.focus();
  }, []);

  return (
    <Sidebar side="left" variant="sidebar" onKeyDown={handleSidebarKeyDown}>
      <SidebarHeader className="gap-8 px-5 pt-10 pb-0">
        <div className="flex justify-center">
          <Link to="/" className="no-underline">
            <img src="/cervo-horizontal.png" alt="Cervo" className="h-8" />
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              ref={dropdownRef}
              type="button"
              className="flex h-11 w-full items-center gap-2.5 border border-sidebar-border bg-[#141414] px-4 font-mono text-[13px] outline-none transition-colors hover:border-primary focus-visible:border-primary data-[state=open]:border-primary"
            >
              <Layers className="size-4 text-muted-foreground transition-colors group-data-[state=open]:text-primary" />
              <span className="font-medium tracking-wide text-foreground">
                {activeWorkspace?.name ?? "Loading..."}
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
            {workspaces.map((ws) => {
              const isActive = ws.id === activeWorkspace?.id;
              return (
                <DropdownMenuItem
                  key={ws.id}
                  onSelect={() => void setWorkspaceId(ws.id)}
                  className={`h-10 cursor-pointer rounded-none px-4 font-mono text-xs tracking-[0.5px] focus:bg-[#ffffff08] ${
                    isActive
                      ? "bg-primary/[0.06] font-semibold text-primary focus:bg-primary/[0.06] focus:text-primary"
                      : "font-medium text-[#8a8a8a]"
                  }`}
                >
                  <Check
                    className={`mr-2 size-3 ${isActive ? "text-primary" : "text-transparent"}`}
                  />
                  {ws.name}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
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
