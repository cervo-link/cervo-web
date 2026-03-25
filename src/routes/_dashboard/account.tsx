import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/account")({
	head: () => ({
		meta: [
			{ title: "Account — Cervo" },
			{
				name: "description",
				content: "Manage your Cervo account",
			},
		],
	}),
	component: AccountPage,
});

function AccountPage() {
	return (
		<div className="p-8 md:px-10">
			<h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
				Account
			</h1>
		</div>
	);
}
