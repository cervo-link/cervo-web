import { Link } from '@tanstack/react-router'

interface FooterColumn {
	title: string
	links: Array<{ label: string; href: string; isRoute?: boolean }>
}

const columns: FooterColumn[] = [
	{
		title: 'Product',
		links: [
			{ label: 'Features', href: '/#features' },
			{ label: 'Pricing', href: '/pricing', isRoute: true },
			{ label: 'Changelog', href: '/changelog', isRoute: true },
			{ label: 'Blog', href: '/blog', isRoute: true },
			{ label: 'Discord', href: '/discord', isRoute: true },
		],
	},
	{
		title: 'Legal',
		links: [
			{ label: 'Terms of Service', href: '/terms', isRoute: true },
			{ label: 'Privacy Policy', href: '/privacy', isRoute: true },
			{ label: 'Sign In', href: '/sign-in', isRoute: true },
		],
	},
]

export function LandingFooter() {
	return (
		<footer className="bg-[#0C0C0C] px-6 py-10 lg:px-[163px] lg:py-[60px]">
			<div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:gap-10">
				{columns.map(col => (
					<div key={col.title} className="flex flex-col gap-4 lg:w-[180px]">
						<h3 className="pb-2 font-sans text-sm font-semibold text-[#E5E5E5]">
							{col.title}
						</h3>
						{col.links.map(link =>
							link.isRoute ? (
								<Link
									key={link.label}
									to={link.href}
									className="font-sans text-[13px] text-[#6a6a6a] no-underline transition-colors hover:text-white"
								>
									{link.label}
								</Link>
							) : (
								<a
									key={link.label}
									href={link.href}
									className="font-sans text-[13px] text-[#6a6a6a] no-underline transition-colors hover:text-white"
								>
									{link.label}
								</a>
							)
						)}
					</div>
				))}

				<div className="flex flex-col items-end gap-2 lg:flex-1 lg:justify-center">
					<span className="font-sans text-sm text-white">
						&copy; {new Date().getFullYear()} Cervo
					</span>
				</div>
			</div>
		</footer>
	)
}
