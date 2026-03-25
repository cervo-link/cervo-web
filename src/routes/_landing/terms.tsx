import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing/terms")({
	head: () => ({
		meta: [
			{ title: "Terms of Service — Cervo" },
			{
				name: "description",
				content: "Cervo Terms of Service",
			},
		],
	}),
	component: TermsPage,
});

function TermsPage() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
			<h1 className="mb-8 font-heading text-3xl font-bold text-white lg:text-4xl">
				Terms of Service
			</h1>
			<p className="mb-6 font-sans text-sm text-[#8a8a8a]">
				Last updated: March 25, 2026
			</p>
			<div className="flex flex-col gap-8 font-sans text-base leading-[1.8] text-[#A3A3A3]">
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						1. Acceptance of Terms
					</h2>
					<p>
						By accessing or using Cervo ("the Service"), you agree to be bound
						by these Terms of Service. If you do not agree to these terms, do
						not use the Service.
					</p>
				</section>
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						2. Description of Service
					</h2>
					<p>
						Cervo is an AI-powered bookmark management tool that helps you save,
						organize, and search your bookmarks. We reserve the right to modify
						or discontinue the Service at any time.
					</p>
				</section>
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						3. User Obligations
					</h2>
					<p>
						You are responsible for maintaining the security of your account and
						for all activities that occur under your account. You agree not to
						use the Service for any unlawful purpose.
					</p>
				</section>
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						4. Limitation of Liability
					</h2>
					<p>
						The Service is provided "as is" without warranties of any kind.
						Cervo shall not be liable for any indirect, incidental, or
						consequential damages arising from your use of the Service.
					</p>
				</section>
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						5. Changes to Terms
					</h2>
					<p>
						We may update these terms from time to time. Continued use of the
						Service after changes constitutes acceptance of the new terms.
					</p>
				</section>
			</div>
		</div>
	);
}
