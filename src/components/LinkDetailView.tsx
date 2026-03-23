import {
	ArrowLeft,
	Bold,
	Code,
	Copy,
	ExternalLink,
	Heading1,
	Heading2,
	Heading3,
	Italic,
	Link,
	List,
	ListOrdered,
	Share2,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Badge } from "#/components/ui/badge";
import { Separator } from "#/components/ui/separator";

interface LinkDetailLink {
	id: string;
	title: string;
	description: string;
	url: string;
	tag: string;
	timeAgo: string;
}

interface LinkDetailViewProps {
	link: LinkDetailLink;
	onBack: () => void;
}

const MOCK_TAGS = ["Article", "Interviews", "Engineering", "Culture"];

const TOOLBAR_GROUPS = [
	[
		{ icon: Bold, label: "Bold" },
		{ icon: Italic, label: "Italic" },
		{ icon: Code, label: "Code" },
		{ icon: Link, label: "Link" },
	],
	[
		{ icon: Heading1, label: "H1" },
		{ icon: Heading2, label: "H2" },
		{ icon: Heading3, label: "H3" },
	],
	[
		{ icon: List, label: "List" },
		{ icon: ListOrdered, label: "Ordered List" },
	],
] as const;

const MOCK_BULLETS = [
	"Startups/Founders often hire for skills rather than learning ability, leading to teams that can't adapt to the product evolution.",
	'The "move fast and break things" culture actively repels senior engineers who value craft and maintainability.',
	"Interview processes that focus on algorithmic puzzles miss the collaborative and systems-thinking skills that matter most at a startup.",
	"Autonomy and ownership are more effective retention tools than equity or salary hikes.",
];

export function LinkDetailView({ link, onBack }: LinkDetailViewProps) {
	const [toastMessage, setToastMessage] = useState<string | null>(null);
	const toastTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

	const showToast = useCallback((message: string) => {
		if (toastTimerRef.current) {
			clearTimeout(toastTimerRef.current);
		}
		setToastMessage(message);
		toastTimerRef.current = setTimeout(() => {
			setToastMessage(null);
			toastTimerRef.current = null;
		}, 2500);
	}, []);

	return (
		<div className="flex h-full flex-col overflow-auto p-8 md:px-10">
			<div className="flex w-full max-w-[900px] flex-col gap-8">
				<div className="flex items-center justify-between">
					<button
						type="button"
						onClick={onBack}
						className="flex size-10 items-center justify-center border border-transparent text-[#8a8a8a] outline-none transition-colors hover:border-primary hover:text-foreground focus-visible:border-primary"
					>
						<ArrowLeft className="size-4" />
					</button>

					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => {
								navigator.clipboard
									.writeText(`https://${link.url}`)
									.catch(() => {});
								showToast("URL copied to clipboard");
							}}
							className="flex size-10 items-center justify-center border border-transparent text-[#8a8a8a] outline-none transition-colors hover:border-primary hover:text-foreground focus-visible:border-primary"
						>
							<Copy className="size-4" />
						</button>
						<button
							type="button"
							onClick={() => {
								window.open(
									`https://${link.url}`,
									"_blank",
									"noopener,noreferrer",
								);
								showToast("Opening link in new tab");
							}}
							className="flex size-10 items-center justify-center border border-transparent text-[#8a8a8a] outline-none transition-colors hover:border-primary hover:text-foreground focus-visible:border-primary"
						>
							<ExternalLink className="size-4" />
						</button>
						<button
							type="button"
							onClick={() => {
								void navigator.clipboard.writeText(window.location.href);
								showToast("Share link copied to clipboard");
							}}
							className="flex size-10 items-center justify-center border border-transparent text-[#8a8a8a] outline-none transition-colors hover:border-primary hover:text-foreground focus-visible:border-primary"
						>
							<Share2 className="size-4" />
						</button>
					</div>
				</div>

				<div className="flex flex-col gap-3">
					<h1 className="font-heading text-[32px] font-bold leading-tight tracking-tight text-foreground">
						{link.title}
					</h1>

					<div className="flex items-center gap-3">
						<a
							href={`https://${link.url}`}
							target="_blank"
							rel="noopener noreferrer"
							className="font-mono text-[11px] text-[#8a8a8a] transition-colors hover:text-primary"
						>
							{link.url}
						</a>
						<Badge
							variant="outline"
							className="border-primary/25 font-mono text-[9px] font-bold uppercase tracking-[0.5px] text-primary"
						>
							{link.tag}
						</Badge>
					</div>

					<div className="flex items-center gap-2">
						{MOCK_TAGS.map((tag) => (
							<Badge
								key={tag}
								variant="outline"
								className="border-[#2f2f2f] font-mono text-[9px] font-bold uppercase tracking-[0.5px] text-[#6a6a6a]"
							>
								{tag}
							</Badge>
						))}
					</div>
				</div>

				<Separator className="bg-[#2f2f2f]" />

				<div className="flex items-center gap-0">
					{TOOLBAR_GROUPS.map((group, groupIndex) => (
						<div
							key={group.map((t) => t.label).join("-")}
							className="flex items-center"
						>
							{groupIndex > 0 && <div className="mx-2 h-5 w-px bg-[#2f2f2f]" />}
							{group.map((tool) => (
								<button
									key={tool.label}
									type="button"
									title={tool.label}
									className="flex size-9 items-center justify-center text-[#8a8a8a] outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
								>
									<tool.icon className="size-4" />
								</button>
							))}
						</div>
					))}
				</div>

				<div className="flex flex-col gap-5">
					<h2 className="font-heading text-lg font-semibold text-primary">
						Summary
					</h2>
					<p className="font-mono text-[13px] leading-relaxed text-[#8a8a8a]">
						{link.description} The author, a former CTO at two YC-backed
						companies, argues that the problem isn&apos;t about compensation or
						perks — it&apos;s about misunderstanding what engineers actually
						value in their work environment.
					</p>

					<h2 className="font-heading text-lg font-semibold text-foreground">
						Key Takeaways
					</h2>
					<ul className="flex flex-col gap-3 pl-3">
						{MOCK_BULLETS.map((bullet) => (
							<li
								key={bullet.slice(0, 20)}
								className="flex gap-3 font-mono text-[13px] leading-relaxed text-[#8a8a8a]"
							>
								<span className="mt-2 block size-1.5 shrink-0 bg-[#6a6a6a]" />
								{bullet}
							</li>
						))}
					</ul>

					<h2 className="font-heading text-lg font-semibold text-foreground">
						Notable Quote
					</h2>
					<div className="border-l-[3px] border-primary bg-primary/[0.06] px-6 py-4">
						<p className="font-mono text-[13px] italic leading-relaxed text-[#8a8a8a]">
							&quot;The best engineers don&apos;t leave because of money. They
							leave because they stopped learning, or because nobody listens to
							them.&quot;
						</p>
					</div>

					<Separator className="bg-[#2f2f2f]" />

					<div className="flex items-center gap-8 pb-8">
						<div className="flex items-center gap-2">
							<span className="font-mono text-[11px] text-[#6a6a6a]">
								Saved by
							</span>
							<span className="font-mono text-[11px] font-bold text-foreground">
								Victor Nogueira
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="font-mono text-[11px] text-[#6a6a6a]">Info</span>
							<span className="font-mono text-[11px] font-bold text-foreground">
								2026-01-15
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="font-mono text-[11px] text-[#6a6a6a]">
								Source
							</span>
							<span className="font-mono text-[11px] font-bold text-primary">
								Web
							</span>
						</div>
					</div>
				</div>
			</div>
			{toastMessage &&
				typeof window !== "undefined" &&
				createPortal(
					<div className="fixed right-6 bottom-6 z-[9999] border border-[#2f2f2f] border-l-[3px] border-l-primary bg-[#141414] px-4 py-3 font-mono text-[13px] font-medium text-foreground shadow-lg">
						{toastMessage}
					</div>,
					document.body,
				)}
		</div>
	);
}
