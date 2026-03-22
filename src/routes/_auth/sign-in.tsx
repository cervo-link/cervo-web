import { createFileRoute } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { GoogleIcon } from "#/components/icons/google";
import { Button } from "#/components/ui/button";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/_auth/sign-in")({
	component: SignInPage,
});

function SignInPage() {
	function handleGoogle() {
		void authClient.signIn.social({
			provider: "google",
			callbackURL: `${window.location.origin}/workspace`,
		});
	}

	function handleGithub() {
		void authClient.signIn.social({
			provider: "github",
			callbackURL: `${window.location.origin}/workspace`,
		});
	}

	return (
		<div className="space-y-8">
			<div className="space-y-2">
				<h2 className="font-heading text-5xl font-bold tracking-tight text-foreground">
					WELCOME
				</h2>
				<p className="text-base font-medium tracking-wide text-muted-foreground">
					Select your provider and sign in
				</p>
			</div>

			<div className="space-y-3">
				<Button
					variant="outline"
					size="lg"
					onClick={handleGoogle}
					className="h-12 w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
				>
					<GoogleIcon className="size-4" />
					<span className="text-sm font-bold tracking-wide">GOOGLE</span>
				</Button>

				<Button
					variant="outline"
					size="lg"
					onClick={handleGithub}
					className="h-12 w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
				>
					<Github className="size-4" />
					<span className="text-sm font-bold tracking-wide">GITHUB</span>
				</Button>
			</div>
		</div>
	);
}
