import { createFileRoute, Outlet } from '@tanstack/react-router'
import { LandingFooter } from '#/components/landing/landing-footer'
import { LandingNavbar } from '#/components/landing/landing-navbar'

export const Route = createFileRoute('/_landing')({
	component: LandingLayout,
})

function LandingLayout() {
	return (
		<div className="flex min-h-screen flex-col bg-[#0C0C0C] [&_a]:cursor-default [&_button]:cursor-default">
			<LandingNavbar />
			<div className="flex-1">
				<Outlet />
			</div>
			<LandingFooter />
		</div>
	)
}
