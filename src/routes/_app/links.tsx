import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/links")({
	component: LinksPage,
});

function LinksPage() {
	return (
		<main className="mx-auto max-w-4xl px-4 py-12">
			<h1 className="text-3xl font-bold tracking-tight">Links</h1>
		</main>
	);
}
