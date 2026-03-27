import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_landing/changelog')({
	head: () => ({
		meta: [
			{ title: 'Changelog — Cervo' },
			{
				name: 'description',
				content: "See what's new in Cervo",
			},
		],
	}),
	component: ChangelogPage,
})

interface ChangelogEntry {
	date: string
	version: string
	title: string
	changes: string[]
}

const entries: ChangelogEntry[] = [
	{
		date: 'March 25, 2026',
		version: '0.1.0',
		title: 'Initial Release',
		changes: [
			'Save bookmarks with a single click',
			'AI-powered semantic search across all your links',
			'Automatic tag suggestions based on content',
			'Google and GitHub sign-in',
			'Workspace support for organizing bookmarks',
		],
	},
]

function ChangelogPage() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
			<h1 className="mb-4 font-heading text-3xl font-bold text-white lg:text-4xl">
				Changelog
			</h1>
			<p className="mb-12 font-sans text-base text-[#8a8a8a]">
				New updates and improvements to Cervo.
			</p>
			<div className="flex flex-col gap-12">
				{entries.map(entry => (
					<article
						key={entry.version}
						className="border-l border-[#2f2f2f] pl-6"
					>
						<div className="mb-2 flex items-center gap-3">
							<span className="font-mono text-sm font-semibold text-primary">
								v{entry.version}
							</span>
							<span className="font-sans text-sm text-[#6a6a6a]">
								{entry.date}
							</span>
						</div>
						<h2 className="mb-4 font-sans text-xl font-semibold text-white">
							{entry.title}
						</h2>
						<ul className="flex flex-col gap-2">
							{entry.changes.map(change => (
								<li
									key={change}
									className="font-sans text-base leading-[1.7] text-[#A3A3A3]"
								>
									{change}
								</li>
							))}
						</ul>
					</article>
				))}
			</div>
		</div>
	)
}
