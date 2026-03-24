import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { FeatureBanner } from "#/components/landing/feature-banner";
import { FeatureSection } from "#/components/landing/feature-section";
import { HeroSection } from "#/components/landing/hero-section";
import { LandingNavbar } from "#/components/landing/landing-navbar";
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
			</div>
		</div>
	);
}
