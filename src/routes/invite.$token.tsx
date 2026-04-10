import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
	useGetInvitesToken,
	usePostInvitesTokenAccept,
} from "#/api/invites/invites";
import { Button } from "#/components/ui/button";
import { authClient } from "#/lib/auth-client";
import { toast } from "sonner";

export const Route = createFileRoute("/invite/$token")({
	component: InvitePage,
});

function InvitePage() {
	const { token } = Route.useParams();
	const navigate = useNavigate();
	const { data: session, isPending: isSessionPending } =
		authClient.useSession();
	const { data: inviteData, isPending: isInviteLoading } =
		useGetInvitesToken(token);
	const { mutateAsync: acceptInvite, isPending: isAccepting } =
		usePostInvitesTokenAccept();
	const [error, setError] = useState<string | null>(null);

	const invite = inviteData?.status === 200 ? inviteData.data : null;
	const isExpired = invite?.expired ?? false;
	const isSignedIn = !!session?.user;

	const handleAccept = useCallback(async () => {
		setError(null);
		try {
			const result = await acceptInvite({ token });
			if (result.status === 200) {
				toast.success(
					`Joined workspace as ${result.data.role}`,
				);
				void navigate({ to: "/links", replace: true });
			} else {
				setError(result.data.message);
			}
		} catch {
			setError("Something went wrong. Please try again.");
		}
	}, [acceptInvite, token, navigate]);

	function handleSignIn() {
		void authClient.signIn.social({
			provider: "google",
			callbackURL: `${window.location.origin}/invite/${token}`,
		});
	}

	function handleSignInGithub() {
		void authClient.signIn.social({
			provider: "github",
			callbackURL: `${window.location.origin}/invite/${token}`,
		});
	}

	useEffect(() => {
		if (!isSessionPending && isSignedIn && invite && !isExpired) {
			void handleAccept();
		}
	}, [isSessionPending, isSignedIn, invite, isExpired, handleAccept]);

	if (isInviteLoading || isSessionPending) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-background">
				<p className="font-mono text-sm text-muted-foreground">
					Loading...
				</p>
			</div>
		);
	}

	if (!invite) {
		return (
			<div className="flex min-h-screen">
				<div className="flex w-1/2 flex-col items-center justify-center bg-card px-16">
					<img
						src="/cervo.png"
						alt="Cervo"
						className="size-72"
					/>
					<p className="text-lg font-medium uppercase tracking-widest text-muted-foreground">
						Save by URL. Find by meaning.
					</p>
				</div>
				<div className="flex w-1/2 flex-col items-center justify-center bg-background px-20">
					<div className="w-full max-w-sm space-y-4">
						<h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
							INVITE NOT FOUND
						</h2>
						<p className="text-sm text-muted-foreground">
							This invite link is invalid or has been
							removed.
						</p>
						<Button
							variant="outline"
							className="h-11 w-full border-primary text-primary hover:bg-primary/10"
							onClick={() =>
								void navigate({ to: "/sign-in" })
							}
						>
							<span className="text-sm font-bold tracking-wide">
								GO TO SIGN IN
							</span>
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen">
			<div className="flex w-1/2 flex-col items-center justify-center bg-card px-16">
				<img
					src="/cervo.png"
					alt="Cervo"
					className="size-72"
				/>
				<p className="text-lg font-medium uppercase tracking-widest text-muted-foreground">
					Save by URL. Find by meaning.
				</p>
			</div>
			<div className="flex w-1/2 flex-col items-center justify-center bg-background px-20">
				<div className="w-full max-w-sm space-y-8">
					<div className="space-y-2">
						<h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
							YOU'RE INVITED
						</h2>
						<p className="text-sm text-muted-foreground">
							{invite.inviterName ?? "Someone"} invited
							you to join
						</p>
						<p className="font-heading text-xl font-bold text-primary">
							{invite.workspaceName}
						</p>
						<div className="flex items-center gap-2 pt-1">
							<span className="font-mono text-[11px] font-bold uppercase tracking-[0.5px] text-muted-foreground">
								Role:
							</span>
							<span className="font-mono text-[11px] font-bold uppercase tracking-[0.5px] text-primary">
								{invite.role}
							</span>
						</div>
					</div>

					{isExpired ? (
						<div className="space-y-3">
							<p className="font-mono text-sm text-[#FF4444]">
								This invite has expired or has already
								been used.
							</p>
							<Button
								variant="outline"
								className="h-11 w-full border-primary text-primary hover:bg-primary/10"
								onClick={() =>
									void navigate({
										to: "/sign-in",
									})
								}
							>
								<span className="text-sm font-bold tracking-wide">
									GO TO SIGN IN
								</span>
							</Button>
						</div>
					) : isSignedIn ? (
						<div className="space-y-3">
							{error && (
								<p className="font-mono text-sm text-[#FF4444]">
									{error}
								</p>
							)}
							<Button
								disabled={isAccepting}
								className="h-11 w-full border border-[#00FF88] bg-[#00FF88] font-mono text-[11px] font-bold uppercase tracking-[0.5px] text-[#0C0C0C] hover:bg-[#00FF88]/90"
								onClick={() => void handleAccept()}
							>
								{isAccepting
									? "JOINING..."
									: "ACCEPT INVITE"}
							</Button>
						</div>
					) : (
						<div className="space-y-3">
							<p className="text-sm text-muted-foreground">
								Sign in to accept this invitation.
							</p>
							<Button
								variant="outline"
								size="lg"
								onClick={handleSignIn}
								className="h-12 w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
							>
								<span className="text-sm font-bold tracking-wide">
									SIGN IN WITH GOOGLE
								</span>
							</Button>
							<Button
								variant="outline"
								size="lg"
								onClick={handleSignInGithub}
								className="h-12 w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
							>
								<span className="text-sm font-bold tracking-wide">
									SIGN IN WITH GITHUB
								</span>
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
