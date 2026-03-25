import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useGetMembersMe } from "#/api/members/members";
import { usePostWorkspacesCreate } from "#/api/workspaces/workspaces";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";

export const Route = createFileRoute("/_auth/workspace")({
	component: WorkspacePage,
});

const workspaceSchema = z.object({
	name: z.string().min(2, "Workspace name must be at least 2 characters"),
});

function WorkspacePage() {
	const [name, setName] = useState("");
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const { data: meResponse } = useGetMembersMe();
	const meData = meResponse?.status === 200 ? meResponse.data : null;
	const { mutateAsync: createWorkspace, isPending } = usePostWorkspacesCreate();

	useEffect(() => {
		if (meData?.workspace) {
			void navigate({ to: "/links" });
		}
	}, [meData, navigate]);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const result = workspaceSchema.safeParse({ name });
		if (!result.success) {
			setError(result.error.issues[0].message);
			return;
		}

		if (!meData?.member?.id) {
			setError("Could not identify your account. Please sign in again.");
			return;
		}

		setError(null);

		try {
			await createWorkspace({
				data: { name: result.data.name, ownerId: meData.member.id },
			});
			void navigate({ to: "/links" });
		} catch {
			setError("Failed to create workspace. Please try again.");
		}
	}

	return (
		<div className="space-y-8">
			<div className="space-y-2">
				<h2 className="font-heading text-5xl font-bold tracking-tight text-foreground">
					DEFINE YOUR WORKSPACE
				</h2>
				<p className="text-base font-medium tracking-wide text-muted-foreground">
					How should we call this group?
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<Label
						htmlFor="workspace-name"
						className="text-sm font-bold tracking-wide text-muted-foreground"
					>
						WORKSPACE NAME
					</Label>
					<Input
						id="workspace-name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='"My Saved Links"'
						className="h-12 border-border bg-card text-base placeholder:text-muted-foreground"
					/>
					{error && <p className="text-sm text-destructive">{error}</p>}
				</div>

				<Button
					type="submit"
					disabled={isPending || !meData}
					className="h-12 w-full text-base font-bold tracking-wide"
				>
					{isPending ? "CREATING..." : "CREATE WORKSPACE"}
				</Button>
			</form>
		</div>
	);
}
