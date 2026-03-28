import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_landing/blog')({
	head: () => ({
		meta: [
			{ title: 'Blog — Cervo' },
			{
				name: 'description',
				content: 'Updates, tips, and insights from the Cervo team',
			},
		],
	}),
	component: BlogPage,
})

interface BlogEntry {
	date: string
	title: string
	description: string
}

const posts: BlogEntry[] = [
	{
		date: 'March 25, 2026',
		title: 'Introducing Cervo',
		description:
			"We built Cervo because saving a bookmark should be the beginning of finding it again, not the end. Here's our vision for AI-powered bookmark management.",
	},
]

function BlogPage() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
			<h1 className="mb-4 font-heading text-3xl font-bold text-white lg:text-4xl">
				Blog
			</h1>
			<p className="mb-12 font-sans text-base text-[#8a8a8a]">
				Updates, tips, and insights from the Cervo team.
			</p>
			<div className="flex flex-col gap-8">
				{posts.map(post => (
					<article
						key={post.title}
						className="border-b border-[#2f2f2f] pb-8 last:border-b-0"
					>
						<span className="mb-2 block font-sans text-sm text-[#6a6a6a]">
							{post.date}
						</span>
						<h2 className="mb-3 font-sans text-xl font-semibold text-white">
							{post.title}
						</h2>
						<p className="font-sans text-base leading-[1.7] text-[#A3A3A3]">
							{post.description}
						</p>
					</article>
				))}
			</div>
		</div>
	)
}
