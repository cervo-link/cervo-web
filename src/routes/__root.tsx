import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { NuqsAdapter } from "nuqs/adapters/react";
import { ogImageUrl } from "#/lib/og";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import TanStackQueryProvider from "../integrations/tanstack-query/root-provider";

import appCss from "../styles.css?url";

import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/space-grotesk";

import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
	queryClient: QueryClient;
}

const THEME_INIT_SCRIPT = `(function(){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';})();`;

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "cervo",
			},
			{
				name: "description",
				content: "Save, organize, and search your bookmarks with AI",
			},
			{
				property: "og:site_name",
				content: "Cervo",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:title",
				content: "Cervo",
			},
			{
				property: "og:description",
				content: "Save, organize, and search your bookmarks with AI",
			},
			{
				property: "og:image",
				content: ogImageUrl("Cervo", "Save by link. Find by meaning."),
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: "Cervo",
			},
			{
				name: "twitter:description",
				content: "Save, organize, and search your bookmarks with AI",
			},
			{
				name: "twitter:image",
				content: ogImageUrl("Cervo", "Save by link. Find by meaning."),
			},
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.ico",
				sizes: "48x48",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "192x192",
				href: "/logo192.png",
			},
			{
				rel: "apple-touch-icon",
				href: "/logo192.png",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	component: RootComponent,
	shellComponent: RootDocument,
});

function RootComponent() {
	return (
		<NuqsAdapter>
			<Outlet />
		</NuqsAdapter>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<HeadContent />
			</head>
			<body className="antialiased [overflow-wrap:anywhere] selection:bg-primary/20">
				<TanStackQueryProvider>
					{children}
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
							TanStackQueryDevtools,
						]}
					/>
				</TanStackQueryProvider>
				<Scripts />
			</body>
		</html>
	);
}
