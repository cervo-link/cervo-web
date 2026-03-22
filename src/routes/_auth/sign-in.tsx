import { createFileRoute } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { GoogleIcon } from "#/components/icons/google";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/_auth/sign-in")({
	component: SignInPage,
});

const HEADING_FONT = "'Space Grotesk Variable', sans-serif";

function SignInPage() {
	function handleGoogle() {
		void authClient.signIn.social({
			provider: "google",
			callbackURL: "/workspace",
		});
	}

	function handleGithub() {
		void authClient.signIn.social({
			provider: "github",
			callbackURL: "/workspace",
		});
	}

	return (
		<div className="space-y-8">
			<div className="space-y-2">
				<h2
					className="text-[32px] font-bold tracking-[-1px] text-white"
					style={{ fontFamily: HEADING_FONT }}
				>
					WELCOME
				</h2>
				<p className="text-[11px] font-medium tracking-[0.5px] text-[#8a8a8a]">
					Select your provider and sign in
				</p>
			</div>

			<div className="space-y-3">
				<button
					type="button"
					onClick={handleGoogle}
					className="flex h-[44px] w-full items-center justify-center gap-2.5 border border-primary bg-transparent text-primary transition-colors hover:bg-primary/10"
				>
					<GoogleIcon className="size-3.5" />
					<span className="text-[11px] font-bold tracking-[0.5px]">GOOGLE</span>
				</button>

				<button
					type="button"
					onClick={handleGithub}
					className="flex h-[44px] w-full items-center justify-center gap-2.5 border border-primary bg-transparent text-primary transition-colors hover:bg-primary/10"
				>
					<Github className="size-3.5" />
					<span className="text-[11px] font-bold tracking-[0.5px]">GITHUB</span>
				</button>
			</div>
		</div>
	);
}
