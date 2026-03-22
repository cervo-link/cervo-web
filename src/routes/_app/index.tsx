import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";

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
			<Button size="lg" asChild>
				<Link to="/components">View Components</Link>
			</Button>
		</main>
	);
}
