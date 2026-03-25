import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowDownLeft,
	Check,
	Circle,
	Cloud,
	Copy,
	Crop,
	Crosshair,
	Ear,
	Eye,
	Globe,
	Heart,
	ImageIcon,
	Info,
	Layers,
	Link,
	Pencil,
	PenTool,
	Play,
	Save,
	Scan,
	Scissors,
	Search,
	Shuffle,
	Smartphone,
	Sparkles,
	Square,
	Timer,
	TriangleRight,
	Type,
	UserRound,
	Users,
	Video,
	Zap,
} from "lucide-react";
import { CtaBanner } from "#/components/landing/cta-banner";
import { FeatureBanner } from "#/components/landing/feature-banner";
import { FeatureSection } from "#/components/landing/feature-section";
import { FeaturesGrid } from "#/components/landing/features-grid";
import { HeroSection } from "#/components/landing/hero-section";
import { NewsletterSection } from "#/components/landing/newsletter-section";
import { TestimonialsCarousel } from "#/components/landing/testimonials-carousel";
import { AIEnrichmentWireframe } from "#/components/landing/wireframes/ai-enrichment-wireframe";
import { DiscordWireframe } from "#/components/landing/wireframes/discord-wireframe";
import { DuplicateDetectionWireframe } from "#/components/landing/wireframes/duplicate-detection-wireframe";
import { PrivacyWireframe } from "#/components/landing/wireframes/privacy-wireframe";
import { PublicWorkspacesWireframe } from "#/components/landing/wireframes/public-workspaces-wireframe";
import { RichLinkWireframe } from "#/components/landing/wireframes/rich-link-wireframe";
import { SemanticSearchWireframe } from "#/components/landing/wireframes/semantic-search-wireframe";
import { SharedWorkspacesWireframe } from "#/components/landing/wireframes/shared-workspaces-wireframe";
import { SmartTagsWireframe } from "#/components/landing/wireframes/smart-tags-wireframe";
import { ogImageUrl } from "#/lib/og";

export const Route = createFileRoute("/_landing/")({
	head: () => ({
		meta: [
			{ title: "Cervo — Smart Bookmark Management" },
			{
				name: "description",
				content: "Save, organize, and search your bookmarks with AI",
			},
			{ property: "og:title", content: "Cervo — Smart Bookmark Management" },
			{
				property: "og:description",
				content: "Save, organize, and search your bookmarks with AI",
			},
			{
				property: "og:image",
				content: ogImageUrl(
					"AI-powered bookmark manager",
					"Save by link. Find by meaning.",
				),
			},
			{ name: "twitter:title", content: "Cervo — Smart Bookmark Management" },
			{
				name: "twitter:description",
				content: "Save, organize, and search your bookmarks with AI",
			},
			{
				name: "twitter:image",
				content: ogImageUrl(
					"AI-powered bookmark manager",
					"Save by link. Find by meaning.",
				),
			},
		],
	}),
	component: LandingPage,
});

function LandingPage() {
	return (
		<>
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
						mobileText: "Works out of the box",
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

				<FeatureSection
					title="Public Workspaces"
					body="Share your curated collection with the world. Toggle any workspace to public and anyone with the link can browse and search your saved links — read-only."
					wireframe={<PublicWorkspacesWireframe />}
					features={[
						{
							icon: <Smartphone className="size-4 text-white" />,
							text: "Shareable URL for each workspace",
						},
						{
							icon: <Layers className="size-4 text-white" />,
							text: "Rate-limited public search",
						},
					]}
				/>

				<FeatureSection
					title="Privacy & Controls"
					body="You own your data. Workspaces are private by default. Only the owner can manage settings, invite members, and control visibility. Members manage only their own links."
					wireframe={<PrivacyWireframe />}
					features={[
						{
							icon: <Sparkles className="size-4 text-white" />,
							text: "Private by default",
						},
						{
							icon: <Copy className="size-4 text-white" />,
							text: "Owner-controlled invitations",
						},
					]}
				/>

				<FeaturesGrid
					cards={[
						{
							icon: <Timer className="size-6 text-white" />,
							title: "Magic Link Auth",
							description:
								"Sign in with a magic link via email, or use Google, GitHub, or Discord OAuth. No passwords to remember.",
						},
						{
							icon: <Scan className="size-6 text-white" />,
							title: "Match Explanations",
							description:
								"Every search result includes a short AI-generated explanation of why Cervo thinks it matches your query.",
						},
						{
							icon: <Crosshair className="size-6 text-white" />,
							title: "Processing States",
							description:
								"See real-time status for every link: submitted, processing, ready, or failed — with retry on failures.",
						},
						{
							icon: <ImageIcon className="size-6 text-white" />,
							title: "Search History",
							description:
								"Your recent searches appear below the input, ready to re-run with a single click.",
						},
						{
							icon: <UserRound className="size-6 text-white" />,
							title: "Retry Failed Links",
							description:
								"If scraping or AI enrichment fails, hit retry from the detail page. Your URL is always saved.",
						},
						{
							icon: <Globe className="size-6 text-white" />,
							title: "Web-First Design",
							description:
								"A clean, focused web app built for speed. One input, instant results, zero clutter.",
						},
					]}
					footerLink={{ text: "See all features", href: "#features" }}
				/>
			</div>

			<TestimonialsCarousel
				testimonials={[
					{
						avatar:
							"https://images.unsplash.com/photo-1655494334540-94c6a9cfc4b6?w=120&h=120&fit=crop&crop=face",
						name: "Daniel Park,",
						role: "Senior Developer",
						quote:
							"Cervo has completely replaced my browser bookmarks. I save everything — articles, repos, docs — and when I need something, I just describe it. The AI search is scarily accurate. It's like having a personal librarian for the internet.",
					},
					{
						avatar:
							"https://images.unsplash.com/photo-1720575791688-645c1fe5a53e?w=120&h=120&fit=crop&crop=face",
						name: "Maria Santos,",
						role: "maria_santos",
						roleColor: "primary",
						rolePrefix: "𝕏",
						quote:
							"I share links all day in Discord and always lost track of the good ones. Now with Cervo's channel watch, everything gets auto-saved and enriched. The semantic search is a game-changer — I found a tutorial from months ago just by typing 'React state management patterns'.",
					},
					{
						avatar:
							"https://images.unsplash.com/photo-1603110502322-93cd2173d19a?w=120&h=120&fit=crop&crop=face",
						name: "James Liu,",
						role: "AI Researcher",
						roleColor: "primary",
						quote:
							"As a researcher, I save dozens of papers and articles weekly. Cervo's AI enrichment means I never have to manually tag or describe anything. And the 'matched because' explanations on search results? Chef's kiss. It tells me exactly why it surfaced a link.",
					},
				]}
			/>

			<div className="mx-auto max-w-7xl px-6 lg:px-[163px]">
				<CtaBanner />
				<NewsletterSection />
			</div>
		</>
	);
}
