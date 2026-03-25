import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing/privacy")({
	head: () => ({
		meta: [
			{ title: "Privacy Policy — Cervo" },
			{
				name: "description",
				content: "Cervo Privacy Policy",
			},
		],
	}),
	component: PrivacyPage,
});

function PrivacyPage() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
			<h1 className="mb-8 font-heading text-3xl font-bold text-white lg:text-4xl">
				Privacy Policy
			</h1>
			<p className="mb-6 font-sans text-sm text-[#8a8a8a]">
				Last updated: March 25, 2026
			</p>
			<div className="flex flex-col gap-8 font-sans text-base leading-[1.8] text-[#A3A3A3]">
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						1. Information We Collect
					</h2>
					<p>
						We collect information you provide when creating an account,
						including your name and email address via third-party OAuth
						providers (Google, GitHub). We also collect the bookmarks and links
						you save to the Service.
					</p>
				</section>
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						2. How We Use Your Information
					</h2>
					<p>
						We use your information to provide and improve the Service,
						including AI-powered features like semantic search and automatic
						tagging. We do not sell your personal data to third parties.
					</p>
				</section>
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						3. Third-Party Services
					</h2>
					<p>
						We use Google and GitHub for authentication. These providers may
						collect information according to their own privacy policies. We
						encourage you to review their policies.
					</p>
				</section>
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						4. Data Security
					</h2>
					<p>
						We implement reasonable security measures to protect your
						information. However, no method of transmission over the Internet is
						100% secure.
					</p>
				</section>
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">5. Contact</h2>
					<p>
						If you have questions about this Privacy Policy, please reach out
						through our Discord community.
					</p>
				</section>
			</div>
		</div>
	);
}
