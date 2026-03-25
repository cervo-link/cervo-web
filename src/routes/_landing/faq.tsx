import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing/faq")({
	head: () => ({
		meta: [
			{ title: "FAQ — Cervo" },
			{
				name: "description",
				content:
					"Frequently asked questions about Cervo, the AI-powered bookmark manager.",
			},
		],
	}),
	component: FaqPage,
});

interface FaqItem {
	question: string;
	answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
	{
		question: "What is Cervo?",
		answer:
			"Cervo is an AI-powered bookmark manager that helps you save, organize, and search links using semantic search. Instead of manually tagging everything, Cervo understands your links and surfaces them when you need them.",
	},
	{
		question: "How does semantic search work?",
		answer:
			"Cervo uses AI embeddings to understand the meaning of your saved links, so you can search by concept rather than exact keywords. For example, searching for \u201cproductivity tips\u201d will surface articles about focus, deep work, and time management \u2014 even if they never use those exact words.",
	},
	{
		question: "Is Cervo free?",
		answer:
			"Yes, the free plan includes up to 100 links, 1 workspace, and full semantic search. The Pro plan ($9/mo) unlocks unlimited links, unlimited workspaces, and advanced features like Discord integration and team management.",
	},
	{
		question: "Can I use Cervo with my team?",
		answer:
			"Yes, create a shared workspace and invite team members. Everyone can save, search, and browse links together. Shared workspaces keep your team's knowledge organized in one place.",
	},
	{
		question: "How does the Discord integration work?",
		answer:
			"Add the Cervo bot to your server, then use /cervo save <url> to save links directly from Discord. You can also set a channel to auto-watch — every URL posted there will be saved automatically to your workspace.",
	},
	{
		question: "Is my data private?",
		answer:
			"Yes, workspaces are private by default. Only you control who can access your links and workspace settings. Public workspaces are an opt-in Pro feature — nothing is ever shared without your explicit action.",
	},
];

function FaqPage() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
			<h1 className="mb-12 font-heading text-3xl font-bold text-white lg:text-4xl">
				Frequently Asked Questions
			</h1>

			<div className="flex flex-col">
				{FAQ_ITEMS.map((item) => (
					<div
						key={item.question}
						className="border-b border-[#2f2f2f] py-8 first:border-t"
					>
						<p className="mb-3 font-sans text-base font-semibold text-white">
							{item.question}
						</p>
						<p className="font-sans text-base leading-[1.8] text-[#A3A3A3]">
							{item.answer}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
