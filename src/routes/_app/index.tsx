import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowDownLeft,
	Circle,
	Cloud,
	Crop,
	Info,
	PenTool,
	Play,
	Scissors,
	Square,
	TriangleRight,
	Type,
	Video,
} from "lucide-react";
import { FeatureBanner } from "#/components/landing/feature-banner";
import { FeatureSection } from "#/components/landing/feature-section";
import { HeroSection } from "#/components/landing/hero-section";
import { LandingNavbar } from "#/components/landing/landing-navbar";
import { AIEnrichmentWireframe } from "#/components/landing/wireframes/ai-enrichment-wireframe";
import { SemanticSearchWireframe } from "#/components/landing/wireframes/semantic-search-wireframe";

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
			</div>
		</div>
	);
}
