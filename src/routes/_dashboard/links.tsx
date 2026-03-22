import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, SearchX, X } from "lucide-react";
import { useQueryState, parseAsString } from "nuqs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LinkListItem } from "#/components/LinkListItem";
import { Badge } from "#/components/ui/badge";
import { Input } from "#/components/ui/input";
import { Separator } from "#/components/ui/separator";

export const Route = createFileRoute("/_dashboard/links")({
	component: LinksPage,
});

interface MockLink {
	id: string;
	title: string;
	description: string;
	url: string;
	tag: string;
	timeAgo: string;
}

const MOCK_LINKS: MockLink[] = [
	{
		id: "1",
		title: "Understanding Vector Embeddings for Search",
		description:
			"A deep dive into how vector embeddings power modern semantic search systems and why they matter for information retrieval.",
		url: "arxiv.org/abs/2301.03749",
		tag: "Embeddings",
		timeAgo: "3min ago",
	},
	{
		id: "2",
		title: "Building a Personal Knowledge Base with Bookmarks",
		description:
			"How to organize and retrieve saved links effectively using semantic tagging and intelligent clustering approaches.",
		url: "blog.notion.so/knowledge-management",
		tag: "Pkm",
		timeAgo: "yesterday",
	},
	{
		id: "3",
		title: "RAG Patterns in Production Applications",
		description:
			"Practical patterns for implementing retrieval-augmented generation in real-world applications with bookmark-based context.",
		url: "github.com/langchain-ai/rag-patterns",
		tag: "Rag",
		timeAgo: "3 days ago",
	},
	{
		id: "4",
		title: "Cosine Similarity vs Dot Product for Nearest Neighbor",
		description:
			"Comparing distance metrics for semantic similarity in bookmark search and when to use each approach effectively.",
		url: "stackoverflow.com/questions/52318422",
		tag: "Math",
		timeAgo: "last week",
	},
];

const RECENT_SEARCHES = [
	"recruiting mistakes",
	"react server components",
	"design tokens",
];

function computeRelevance(link: MockLink, query: string): number {
	const q = query.toLowerCase();
	const fields = [link.title, link.description, link.url, link.tag];
	let score = 0;
	for (const field of fields) {
		if (!field.toLowerCase().includes(q)) {
			continue;
		}
		score += 25;
	}
	return Math.min(score, 99);
}

function LinksPage() {
	const [searchValue, setSearchValue] = useQueryState(
		"q",
		parseAsString.withDefault(""),
	);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	const isSearching = searchValue.trim().length > 0;

	const filteredLinks = useMemo(() => {
		setSelectedIndex(0);
		if (!isSearching) {
			return MOCK_LINKS;
		}
		const q = searchValue.trim().toLowerCase();
		return MOCK_LINKS.filter((link) => {
			const searchable = [
				link.title,
				link.description,
				link.url,
				link.tag,
			].join(" ");
			return searchable.toLowerCase().includes(q);
		});
	}, [searchValue, isSearching]);

	function handleClear() {
		void setSearchValue(null);
		inputRef.current?.focus();
	}

	const handleItemClick = useCallback(
		(linkId: string) => {
			void navigate({ to: "/links", search: { id: linkId } });
		},
		[navigate],
	);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (filteredLinks.length === 0) {
				return;
			}

			if (e.key === "ArrowDown") {
				e.preventDefault();
				setSelectedIndex((prev) =>
					prev >= filteredLinks.length - 1 ? 0 : prev + 1,
				);
				return;
			}

			if (e.key === "ArrowUp") {
				e.preventDefault();
				setSelectedIndex((prev) =>
					prev <= 0 ? filteredLinks.length - 1 : prev - 1,
				);
				return;
			}

			if (e.key === "Enter" && document.activeElement !== inputRef.current) {
				e.preventDefault();
				const link = filteredLinks[selectedIndex];
				if (link) {
					handleItemClick(link.id);
				}
			}
		},
		[selectedIndex, handleItemClick, filteredLinks],
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [handleKeyDown]);

	const headerText = isSearching
		? `${filteredLinks.length} results found`
		: "Recently added";

	return (
		<div className="flex h-full flex-col gap-8 p-8 md:px-10">
			<div className="flex max-w-7xl flex-col gap-8">
				<h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
					Links
				</h1>

				<div className="flex flex-col gap-4">
					<div className="group/search relative">
						<Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within/search:text-primary" />
						<Input
							ref={inputRef}
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							placeholder="Paste URL or Search..."
							className="h-12 border-sidebar-border bg-[#0A0A0A] pl-10 pr-12 font-mono text-[13px] font-medium text-foreground transition-colors placeholder:text-muted-foreground hover:border-primary focus-visible:border-primary focus-visible:ring-0"
						/>
						{searchValue.length > 0 && (
							<button
								type="button"
								onClick={handleClear}
								className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center text-[#8a8a8a] transition-colors hover:text-foreground"
							>
								<X className="size-4" />
							</button>
						)}
					</div>
					{!isSearching && (
						<div className="flex gap-2">
							{RECENT_SEARCHES.map((search) => (
								<button
									key={search}
									type="button"
									onClick={() => {
										void setSearchValue(search);
										inputRef.current?.focus();
									}}
								>
									<Badge
										variant="outline"
										className="cursor-pointer border-sidebar-border font-mono text-[11px] font-medium text-muted-foreground hover:text-foreground"
									>
										{search}
									</Badge>
								</button>
							))}
						</div>
					)}
				</div>

				<div className="flex flex-1 flex-col gap-2">
					<span className="font-mono text-[11px] font-medium tracking-[0.5px] text-[#6a6a6a]">
						{headerText}
					</span>

					{filteredLinks.length > 0 && (
						<div ref={listRef} className="flex flex-col">
							{filteredLinks.map((link, index) => (
								<div key={link.id}>
									{index > 0 && <Separator className="bg-[#2f2f2f]" />}
									<LinkListItem
										title={link.title}
										description={link.description}
										url={link.url}
										tag={link.tag}
										badge={
											isSearching
												? `${computeRelevance(link, searchValue.trim())}%`
												: link.timeAgo
										}
										isSelected={index === selectedIndex}
										onMouseEnter={() => setSelectedIndex(index)}
										onClick={() => handleItemClick(link.id)}
									/>
								</div>
							))}
						</div>
					)}

					{filteredLinks.length === 0 && (
						<div className="flex flex-1 flex-col items-center justify-center gap-6 py-24">
							<SearchX className="size-12 text-primary" />
							<div className="flex flex-col items-center gap-2">
								<span className="font-heading text-2xl font-bold text-foreground">
									No Matches Found
								</span>
								<span className="max-w-[400px] text-center font-mono text-[13px] leading-relaxed text-[#8a8a8a]">
									We couldn't find any links matching your search. Try different
									keywords or save a new link.
								</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
