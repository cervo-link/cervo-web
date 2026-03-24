import { ChevronDown, ClipboardPaste, Link, Sparkles } from "lucide-react";
import { LandingButton } from "./landing-button";
import { useScrollAnimation } from "./use-scroll-animation";

export function CtaBanner() {
	const { ref, isVisible } = useScrollAnimation();

	return (
		<section
			ref={ref}
			className={`py-8 transition-all duration-700 lg:py-16 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
		>
			<div className="relative overflow-hidden rounded-[16px]">
				<MeshGradientBackground />

				<div className="relative z-10 flex flex-col items-center gap-6 px-6 py-10 text-center lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-0 lg:text-left">
					<div className="flex flex-col items-center gap-6 lg:items-start lg:min-h-[424px] lg:justify-center">
						<h2 className="whitespace-pre-line font-sans text-[28px] font-extrabold leading-[1.2] text-white lg:text-[44px]">
							{"Stop losing links.\nStart finding them."}
						</h2>
						<p className="max-w-[500px] font-sans text-[15px] text-white/90 lg:text-lg">
							Save any URL. Cervo enriches it with AI. Find it
							later by meaning.
						</p>
						<LandingButton
							href="/sign-in"
							variant="primary"
							className="w-fit bg-white text-[#0C0C0C] hover:bg-white/90"
						>
							Get Started
						</LandingButton>
					</div>

					<div className="hidden lg:block">
						<DecorativeIllustration />
					</div>
				</div>
			</div>
		</section>
	);
}

function MeshGradientBackground() {
	return (
		<div className="absolute inset-0">
			<div className="absolute inset-0 bg-[#052E1C]" />
			<div
				className="absolute inset-0 opacity-80"
				style={{
					background:
						"radial-gradient(ellipse at 0% 0%, #03ff88 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, #03ff88 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, #0e6d42 0%, transparent 60%), radial-gradient(ellipse at 0% 100%, #001d10 0%, transparent 50%), radial-gradient(ellipse at 100% 0%, #002e18 0%, transparent 50%)",
				}}
			/>
			<div
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(ellipse at 30% 70%, #009b53 0%, transparent 40%)",
					opacity: 0.5,
				}}
			/>
		</div>
	);
}

function DecorativeIllustration() {
	return (
		<div className="relative h-[380px] w-[380px] shrink-0 overflow-hidden rounded-[16px] bg-[#141414]">
			{/* Title bar */}
			<div className="flex h-7 items-center gap-1.5 bg-[#1A1A1A] px-3">
				<div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
				<div className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
				<div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
			</div>

			{/* Content area */}
			<div className="flex flex-col items-center px-10 pt-7">
				{/* URL card */}
				<div className="flex h-10 w-[300px] items-center gap-2.5 rounded-[10px] bg-[#1A1A1A] px-3.5">
					<Link className="h-4 w-4 text-[#A3A3A3]" />
					<div className="h-3.5 flex-1 rounded bg-[#2A2A2A]" />
					<ClipboardPaste className="h-3.5 w-3.5 text-primary" />
				</div>

				{/* Arrow */}
				<ChevronDown className="my-2 h-5 w-5 text-primary/40" />

				{/* AI circle */}
				<div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#052E1C]">
					<Sparkles className="h-6 w-6 text-primary" />
				</div>

				{/* Arrow */}
				<ChevronDown className="my-2 h-5 w-5 text-primary/40" />

				{/* Result card */}
				<div className="flex w-[340px] flex-col gap-3 rounded-[12px] border border-primary/20 bg-[#1A1A1A] p-4">
					{/* Title row */}
					<div className="flex items-center gap-2.5">
						<div className="h-3.5 w-3.5 rounded-full bg-primary" />
						<div className="h-3 flex-1 rounded bg-white/20" />
						<div className="h-2.5 w-[60px] rounded bg-[#2A2A2A]" />
					</div>

					{/* Tags */}
					<div className="flex gap-1.5">
						<div className="h-5 w-[55px] rounded-full border border-primary/25 bg-primary/15" />
						<div className="h-5 w-[70px] rounded-full border border-primary/25 bg-primary/15" />
						<div className="h-5 w-[45px] rounded-full border border-primary/25 bg-primary/15" />
					</div>

					{/* Separator */}
					<div className="h-px w-full bg-[#2f2f2f]" />

					{/* Description lines */}
					<div className="flex flex-col gap-2">
						<div className="h-2 w-full rounded bg-white/10" />
						<div className="h-2 w-[240px] rounded bg-white/10" />
						<div className="h-2 w-[200px] rounded bg-white/[0.06]" />
					</div>
				</div>
			</div>
		</div>
	);
}
