import { Link } from "@tanstack/react-router";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/80 px-4 backdrop-blur-lg">
			<nav className="mx-auto flex max-w-5xl items-center gap-6 py-3">
				<Link
					to="/"
					className="text-sm font-bold tracking-tight text-foreground no-underline"
				>
					cervo
				</Link>

				<div className="flex items-center gap-4 text-sm font-medium">
					<Link
						to="/"
						className="text-muted-foreground no-underline transition-colors hover:text-foreground"
						activeProps={{ className: "text-foreground no-underline" }}
					>
						Home
					</Link>
					<Link
						to="/components"
						className="text-muted-foreground no-underline transition-colors hover:text-foreground"
						activeProps={{ className: "text-foreground no-underline" }}
					>
						Components
					</Link>
				</div>
			</nav>
		</header>
	);
}
