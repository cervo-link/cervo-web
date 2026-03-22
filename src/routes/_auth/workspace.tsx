import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";

export const Route = createFileRoute("/_auth/workspace")({
	component: WorkspacePage,
});

const HEADING_FONT = "'Space Grotesk Variable', sans-serif";

const workspaceSchema = z.object({
	name: z.string().min(2, "Workspace name must be at least 2 characters"),
});

function WorkspacePage() {
	const [name, setName] = useState("");
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const result = workspaceSchema.safeParse({ name });

		if (!result.success) {
			setError(result.error.issues[0].message);
			return;
		}

		setError(null);
		console.log("Workspace created:", result.data);
		void navigate({ to: "/links" });
	}

	return (
		<div className="space-y-8">
			<div className="space-y-2">
				<h2
					className="text-[32px] font-bold tracking-[-1px] text-white"
					style={{ fontFamily: HEADING_FONT }}
				>
					DEFINE YOUR WORKSPACE
				</h2>
				<p className="text-[11px] font-medium tracking-[0.5px] text-[#8a8a8a]">
					How should we call this group?
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<Label
						htmlFor="workspace-name"
						className="text-[11px] font-bold tracking-[0.5px] text-[#8a8a8a]"
					>
						WORKSPACE NAME
					</Label>
					<Input
						id="workspace-name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='"My Saved Links"'
						className="h-[44px] border-[#2f2f2f] bg-[#141414] text-[13px] placeholder:text-[#6a6a6a]"
					/>
					{error && <p className="text-[11px] text-destructive">{error}</p>}
				</div>

				<Button
					type="submit"
					className="h-[44px] w-full text-[13px] font-bold tracking-[0.5px]"
				>
					CREATE WORKSPACE
				</Button>
			</form>
		</div>
	);
}
