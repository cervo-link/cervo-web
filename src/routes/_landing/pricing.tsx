import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/_landing/pricing")({
	head: () => ({
		meta: [
			{ title: "Pricing — Cervo" },
			{
				name: "description",
				content:
					"Simple, transparent pricing for Cervo. Start free and upgrade when you're ready.",
			},
		],
	}),
	component: PricingPage,
});

const FREE_FEATURES = [
	"Save up to 100 links",
	"1 workspace",
	"Semantic search",
	"AI enrichment",
	"Basic tags",
];

const PRO_FEATURES = [
	"Unlimited links",
	"Unlimited workspaces",
	"Discord integration",
	"Smart tags",
	"Public workspaces",
	"Team management",
	"Priority support",
];

function PricingPage() {
	return (
		<div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
			<h1 className="mb-4 font-heading text-3xl font-bold text-white lg:text-4xl">
				Pricing
			</h1>
			<p className="mb-12 font-sans text-base text-[#A3A3A3]">
				Start for free. Upgrade when you need more.
			</p>

			<div className="grid gap-6 sm:grid-cols-2">
				{/* Free tier */}
				<div className="flex flex-col border border-[#2f2f2f] bg-[#1A1A1A] p-8">
					<div className="mb-6">
						<p className="mb-2 font-sans text-sm font-semibold uppercase tracking-widest text-[#A3A3A3]">
							Free
						</p>
						<p className="font-mono text-4xl font-bold text-white">
							$0
							<span className="ml-1 font-sans text-base font-normal text-[#A3A3A3]">
								/ mo
							</span>
						</p>
					</div>

					<ul className="mb-8 flex flex-col gap-3 font-sans text-sm text-[#A3A3A3]">
						{FREE_FEATURES.map((feature) => (
							<li key={feature} className="flex items-center gap-3">
								<Check className="h-4 w-4 shrink-0 text-white" />
								{feature}
							</li>
						))}
					</ul>

					<div className="mt-auto">
						<a
							href="/sign-in"
							className="flex h-11 w-full items-center justify-center border border-[#2f2f2f] font-sans text-sm font-bold text-white"
						>
							Get Started
						</a>
					</div>
				</div>

				{/* Pro tier */}
				<div className="flex flex-col border border-primary bg-[#1A1A1A] p-8">
					<div className="mb-6">
						<div className="mb-2 flex items-center gap-2">
							<p className="font-sans text-sm font-semibold uppercase tracking-widest text-[#A3A3A3]">
								Pro
							</p>
							<span className="font-sans text-xs font-semibold uppercase tracking-widest text-primary">
								Most Popular
							</span>
						</div>
						<p className="font-mono text-4xl font-bold text-primary">
							$9
							<span className="ml-1 font-sans text-base font-normal text-[#A3A3A3]">
								/ mo
							</span>
						</p>
					</div>

					<ul className="mb-8 flex flex-col gap-3 font-sans text-sm text-[#A3A3A3]">
						{PRO_FEATURES.map((feature) => (
							<li key={feature} className="flex items-center gap-3">
								<Check className="h-4 w-4 shrink-0 text-primary" />
								{feature}
							</li>
						))}
					</ul>

					<div className="mt-auto">
						<a
							href="/sign-in"
							className="flex h-11 w-full items-center justify-center bg-primary font-sans text-sm font-bold text-[#0C0C0C]"
						>
							Get Started
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
