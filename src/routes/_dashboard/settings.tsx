import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/settings")({
	component: SettingsPage,
});

function SettingsPage() {
	return (
		<div className="p-8 md:px-10">
			<h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
				Workspace
			</h1>
		</div>
	);
}
