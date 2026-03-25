import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useState } from "react";
import { LandingButton } from "./landing-button";

const NAV_LINKS = [
	{ label: "Features", href: "#features" },
	{ label: "How it Works", href: "#how-it-works" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Discord", href: "/discord" },
	{ label: "FAQ", href: "#faq" },
] as const;

export function LandingNavbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<>
			<nav className="sticky top-0 z-50 border-b border-[#2f2f2f] bg-[#0C0C0C]">
				<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-[163px]">
					<a href="/" className="no-underline">
						<img src="/cervo-horizontal.png" alt="Cervo" className="h-8" />
					</a>

					<div className="hidden items-center gap-7 lg:flex">
						{NAV_LINKS.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className="font-sans text-[13px] font-bold text-[#A3A3A3] no-underline transition-colors hover:text-white"
							>
								{link.label}
							</a>
						))}
					</div>

					<div className="hidden lg:flex">
						<LandingButton href="/sign-in" size="sm">
							Get Started
						</LandingButton>
					</div>

					<button
						type="button"
						onClick={() => setMenuOpen(!menuOpen)}
						className="flex flex-col justify-center gap-1 p-1 lg:hidden"
						aria-label="Toggle menu"
					>
						{menuOpen ? (
							<X className="h-5 w-5 text-white" />
						) : (
							<>
								<span className="h-0.5 w-5 rounded-[1px] bg-white" />
								<span className="h-0.5 w-5 rounded-[1px] bg-white" />
								<span className="h-0.5 w-5 rounded-[1px] bg-white" />
							</>
						)}
					</button>
				</div>
			</nav>

			{menuOpen && (
				<div className="fixed inset-x-0 top-16 z-40 border-b border-[#2f2f2f] bg-[#0C0C0C] px-6 py-6 lg:hidden">
					<div className="flex flex-col gap-4">
						{NAV_LINKS.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className="font-sans text-[15px] font-bold text-[#A3A3A3] no-underline transition-colors hover:text-white"
								onClick={() => setMenuOpen(false)}
							>
								{link.label}
							</a>
						))}
						<Link
							to="/sign-in"
							className="mt-2 flex items-center justify-center rounded-[20px] bg-primary py-3 font-sans text-[15px] font-bold text-[#0C0C0C] no-underline"
							onClick={() => setMenuOpen(false)}
						>
							Get Started
						</Link>
					</div>
				</div>
			)}
		</>
	);
}
