import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
	component: Home,
});

function Home() {
	return (
		<main className="flex min-h-[80vh] flex-col items-center justify-center px-4">
			<h1 className="mb-4 text-4xl font-bold tracking-tight">cervo</h1>
			<p className="mb-8 max-w-md text-center text-muted-foreground">
				Design system foundation built with shadcn, Tailwind CSS, and JetBrains
				Mono.
			</p>
			<Link
				to="/components"
				className="inline-flex h-10 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
			>
				View Components
			</Link>
		</main>
	)
}
