import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowDownLeft,
	Check,
	Circle,
	Cloud,
	Crop,
	Ear,
	Eye,
	Globe,
	Heart,
	Info,
	Layers,
	Link,
	Pencil,
	PenTool,
	Play,
	Save,
	Scissors,
	Search,
	Shuffle,
	Sparkles,
	Square,
	TriangleRight,
	Type,
	Users,
	Video,
	Zap,
} from "lucide-react";
import { FeatureBanner } from "#/components/landing/feature-banner";
import { FeatureSection } from "#/components/landing/feature-section";
import { HeroSection } from "#/components/landing/hero-section";
import { LandingNavbar } from "#/components/landing/landing-navbar";
import { AIEnrichmentWireframe } from "#/components/landing/wireframes/ai-enrichment-wireframe";
import { DiscordWireframe } from "#/components/landing/wireframes/discord-wireframe";
import { DuplicateDetectionWireframe } from "#/components/landing/wireframes/duplicate-detection-wireframe";
import { RichLinkWireframe } from "#/components/landing/wireframes/rich-link-wireframe";
import { SemanticSearchWireframe } from "#/components/landing/wireframes/semantic-search-wireframe";
import { SharedWorkspacesWireframe } from "#/components/landing/wireframes/shared-workspaces-wireframe";
import { SmartTagsWireframe } from "#/components/landing/wireframes/smart-tags-wireframe";

export const Route = createFileRoute("/_app/")({
	component: LandingPage,
});

function LandingPage() {
	return (
		<div className="min-h-screen bg-[#0C0C0C] [&_a]:cursor-default [&_button]:cursor-default">
			<LandingNavbar />
			<div className="mx-auto max-w-7xl px-6 lg:px-[163px]">
				<HeroSection />
				<FeatureBanner />

				<FeatureSection
					title="Semantic Search"
					body="Type what you're thinking about — not the exact title or URL. Cervo uses AI embeddings to match your query to the meaning of your saved links, not just keywords."
					wireframe={<SemanticSearchWireframe />}
					link={{
						text: "See it in action",
						icon: <Play className="size-3.5 fill-current text-primary" />,
					}}
					testimonial={{
						avatar: "https://github.com/eulixir.png",
						quote:
							"I used to lose links in browser bookmarks constantly. With Cervo, I just describe what I'm looking for and it finds the right page every time.",
						name: "João Pedro",
						jobTitle: "Backend Staff Engineer",
					}}
				/>
				<FeatureSection
					title="AI Enrichment"
					body="Paste a URL and Cervo does the rest. It scrapes the page, generates a readable title, writes a description, and adds smart tags — so you never have to organize anything manually."
					wireframe={<AIEnrichmentWireframe />}
					centered
					toolIcons={[
						[
							{
								id: "square",
								icon: <Square className="size-4 text-[#E5E5E5]" />,
							},
							{
								id: "square-fill",
								icon: (
									<Square className="size-4 fill-[#E5E5E5] text-[#E5E5E5]" />
								),
							},
							{
								id: "circle",
								icon: <Circle className="size-4 text-[#E5E5E5]" />,
							},
							{
								id: "triangle",
								icon: <TriangleRight className="size-4 text-[#E5E5E5]" />,
							},
							{
								id: "arrow",
								icon: <ArrowDownLeft className="size-4 text-[#E5E5E5]" />,
							},
							{
								id: "type",
								icon: <Type className="size-4 text-primary" />,
								highlighted: true,
							},
						],
						[
							{
								id: "scissors",
								icon: <Scissors className="size-4 text-[#E5E5E5]" />,
							},
							{
								id: "video",
								icon: <Video className="size-4 text-[#E5E5E5]" />,
							},
							{ id: "info", icon: <Info className="size-4 text-[#E5E5E5]" /> },
							{
								id: "pen",
								icon: <PenTool className="size-4 text-[#E5E5E5]" />,
							},
							{
								id: "cloud",
								icon: <Cloud className="size-4 text-[#E5E5E5]" />,
							},
							{ id: "crop", icon: <Crop className="size-4 text-[#E5E5E5]" /> },
						],
					]}
				/>

				<FeatureSection
					title="Shared Workspaces"
					body="Invite your team and build a shared knowledge base. Members can save, search, and browse links together — all in one place."
					wireframe={<SharedWorkspacesWireframe />}
					badge={{
						icon: <Check className="size-3 text-primary" />,
						text: "Works with your personal workspace out of the box",
					}}
					features={[
						{
							icon: <Link className="size-4 text-white" />,
							text: "Invite & and manage members by email",
						},
						{
							icon: <Globe className="size-4 text-white" />,
							text: "Set workspace public or private",
							badge: "Pro",
						},
						{
							icon: <Users className="size-4 text-white" />,
							text: "Team management",
							badge: "Pro",
						},
					]}
					cta={{ text: "Get Started", href: "/sign-in" }}
				/>

				<FeatureSection
					title="Discord Integration"
					body="Save links straight from Discord with a slash command. Watch a channel to auto-save every URL posted. Search your Cervo workspace without leaving the chat."
					wireframe={<DiscordWireframe />}
					centered
					features={[
						{
							icon: <Save className="size-4 text-white" />,
							text: "Save with /cervo save <url>",
						},
						{
							icon: <Ear className="size-4 text-white" />,
							text: "Auto-listen any channel",
						},
					]}
				/>

				<FeatureSection
					title="Smart Tags"
					body="Cervo's AI generates relevant tags for every link you save. Tags are freeform and workspace-scoped, making your collection effortlessly organized."
					wireframe={<SmartTagsWireframe />}
					features={[
						{
							icon: <Sparkles className="size-4 text-white" />,
							text: "AI-generated from page content",
							badge: "Pro",
						},
						{
							icon: <Pencil className="size-4 text-white" />,
							text: "Edit, add, or remove tags anytime",
						},
						{
							icon: <Shuffle className="size-4 text-white" />,
							text: "Workspace-scoped tag vocabulary",
						},
						{
							icon: <Search className="size-4 text-white" />,
							text: "Tags boost search relevance",
						},
						{
							icon: <Type className="size-4 text-white" />,
							text: "Freeform — no rigid categories",
						},
					]}
				/>

				<FeatureSection
					title="Rich Link Details"
					body="Every saved link gets its own detail page with a block editor. Edit the AI-generated title, description, and tags. Supported blocks: headings, paragraphs, lists, bold, italic, inline code, and links."
					wireframe={<RichLinkWireframe />}
					reverse
					features={[
						{
							icon: <Heart className="size-4 text-white" />,
							text: "Block editor for descriptions",
						},
						{
							icon: <Sparkles className="size-4 text-white" />,
							text: "Editable titles and tags",
						},
						{
							icon: <Layers className="size-4 text-white" />,
							text: "Copy or open original URL",
						},
					]}
				/>

				<FeatureSection
					title="Duplicate Detection"
					body="Cervo checks every URL you save against your workspace. If it already exists, you get a notification with a link to the existing entry — no duplicates, ever."
					wireframe={<DuplicateDetectionWireframe />}
					features={[
						{
							icon: <Layers className="size-4 text-white" />,
							text: "Instant duplicate check on save",
						},
						{
							icon: <Eye className="size-4 text-white" />,
							text: "Works across web and Discord",
						},
						{
							icon: <Zap className="size-4 text-white" />,
							text: "Link to existing entry on match",
						},
					]}
				/>
			</div>
		</div>
	);
}
