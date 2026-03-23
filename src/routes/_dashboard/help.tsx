import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/help")({
	component: HelpPage,
});

function HelpPage() {
	return (
		<div className="p-8 md:px-10">
			<h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
				Help
			</h1>
		</div>
	);
}
