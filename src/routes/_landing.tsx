import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LandingFooter } from "#/components/landing/landing-footer";
import { LandingNavbar } from "#/components/landing/landing-navbar";

export const Route = createFileRoute("/_landing")({
	component: LandingLayout,
});

function LandingLayout() {
	return (
		<div className="min-h-screen bg-[#0C0C0C] [&_a]:cursor-default [&_button]:cursor-default">
			<LandingNavbar />
			<Outlet />
			<LandingFooter />
		</div>
	);
}
