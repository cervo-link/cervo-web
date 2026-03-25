import { useScrollAnimation } from "./use-scroll-animation";

interface FooterColumn {
	title: string;
	links: Array<{ label: string; href: string }>;
}

const columns: FooterColumn[] = [
	{
		title: "Product",
		links: [
			{ label: "Features", href: "#features" },
			{ label: "Pricing", href: "#pricing" },
			{ label: "Changelog", href: "#changelog" },
			{ label: "Roadmap", href: "#roadmap" },
			{ label: "Discord Bot", href: "#discord-bot" },
			{ label: "API Reference", href: "#api" },
			{ label: "Browser Extension", href: "#extension" },
		],
	},
	{
		title: "Resources",
		links: [
			{ label: "Documentation", href: "#docs" },
			{ label: "Getting Started", href: "#getting-started" },
			{ label: "Blog", href: "#blog" },
			{ label: "Terms of Service", href: "#terms" },
			{ label: "Privacy Policy", href: "#privacy" },
			{ label: "Security", href: "#security" },
		],
	},
	{
		title: "Account",
		links: [
			{ label: "Sign In", href: "/sign-in" },
			{ label: "Create Account", href: "/sign-in" },
			{ label: "Manage Workspace", href: "#workspace" },
			{ label: "Invite Members", href: "#invite" },
			{ label: "Settings", href: "#settings" },
		],
	},
	{
		title: "Support",
		links: [
			{ label: "Contact Us", href: "#contact" },
			{ label: "FAQ", href: "#faq" },
			{ label: "Status Page", href: "#status" },
			{ label: "Discord Community", href: "#discord" },
			{ label: "Twitter / X", href: "#twitter" },
		],
	},
];

export function LandingFooter() {
	const { ref, isVisible } = useScrollAnimation();

	return (
		<footer
			ref={ref}
			className={`bg-[#080808] px-6 py-10 transition-all duration-700 lg:py-[60px] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
		>
			<div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:gap-10">
				{columns.map((col) => (
					<div key={col.title} className="flex flex-col gap-4 lg:w-[180px]">
						<h3 className="pb-2 font-sans text-sm font-semibold text-[#E5E5E5]">
							{col.title}
						</h3>
						{col.links.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className="font-sans text-[13px] text-[#6a6a6a] no-underline transition-colors hover:text-white"
							>
								{link.label}
							</a>
						))}
					</div>
				))}

				<div className="flex flex-col items-end gap-2 lg:flex-1 lg:justify-center">
					<span className="font-sans text-sm text-white">© 2026 Cervo</span>
					<a
						href="#twitter"
						className="flex items-center gap-1 font-sans text-sm font-bold text-primary no-underline"
					>
						Follow us on X
					</a>
				</div>
			</div>
		</footer>
	);
}
