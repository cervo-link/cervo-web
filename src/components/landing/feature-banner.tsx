import {
	ArrowDown,
	Camera,
	Eye,
	History,
	Monitor,
	PenTool,
	RotateCw,
	Video,
} from "lucide-react";
import type { ReactNode } from "react";
import { LandingLink } from "./landing-link";
import { useScrollAnimation } from "./use-scroll-animation";

export function FeatureBanner() {
	const { ref, isVisible } = useScrollAnimation();

	return (
		<section
			ref={ref}
			className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
		>
			<div className="relative overflow-hidden rounded-[16px] bg-[#1A1A1A] px-8 py-[60px] lg:h-[375px] lg:px-16 lg:py-12">
				<div className="relative z-10 flex h-full flex-col items-center justify-center gap-9 lg:items-start">
					<p className="m-0 font-sans text-2xl text-[#E5E5E5]">
						One input to rule them all.
					</p>

					<div className="flex flex-col items-center gap-0 lg:items-start">
						<span className="text-center font-sans text-[28px] font-extrabold text-white lg:text-left lg:text-4xl">
							Cervo understands your links with
						</span>
						<span className="text-center font-sans text-[28px] font-extrabold lg:text-left lg:text-4xl">
							<span className="text-primary">AI-powered search</span>
							<span className="text-white"> so you always</span>
						</span>
						<span className="text-center font-sans text-[28px] font-extrabold text-white lg:text-left lg:text-4xl">
							find what you saved.
						</span>
					</div>

					<div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-6">
						<LandingLink href="#features" size="lg">
							Check all features
						</LandingLink>
						<LandingLink href="#changelog" size="lg">
							What&apos;s new?
						</LandingLink>
					</div>
				</div>

				<div className="pointer-events-none absolute -right-10 top-2 hidden lg:block">
					<IconGrid />
				</div>
			</div>
		</section>
	);
}

interface IconCellProps {
	icon?: ReactNode;
	bg: string;
}

function IconCell({ icon, bg }: IconCellProps) {
	return (
		<div
			className={`flex h-12 w-12 items-center justify-center rounded-[12px] ${bg}`}
		>
			{icon}
		</div>
	);
}

const ico = "h-5 w-5 text-[#555555]";

function IconGrid() {
	return (
		<div className="relative h-[338px] w-[174px] pr-4">
			{/* Row 0 */}
			<div className="absolute left-[58px] top-0">
				<IconCell icon={<RotateCw className={ico} />} bg="bg-[#0C0C0C]" />
			</div>
			{/* Row 1 */}
			<div className="absolute left-0 top-[58px]">
				<IconCell icon={<Monitor className={ico} />} bg="bg-[#0C0C0C]" />
			</div>
			<div className="absolute left-[58px] top-[58px]">
				<IconCell icon={<PenTool className={ico} />} bg="bg-[#2f2f2f]" />
			</div>
			<div className="absolute left-[116px] top-[58px]">
				<IconCell bg="bg-[#2f2f2f]" />
			</div>
			{/* Row 2 */}
			<div className="absolute left-0 top-[116px]">
				<IconCell bg="bg-[#2f2f2f]" />
			</div>
			<div className="absolute left-[58px] top-[116px]">
				<IconCell icon={<Camera className={ico} />} bg="bg-[#0C0C0C]" />
			</div>
			<div className="absolute left-[116px] top-[116px]">
				<IconCell bg="bg-[#2f2f2f]" />
			</div>
			{/* Row 3 */}
			<div className="absolute left-[58px] top-[174px]">
				<IconCell icon={<Eye className={ico} />} bg="bg-[#2f2f2f]" />
			</div>
			<div className="absolute left-[116px] top-[174px]">
				<IconCell bg="bg-[#2f2f2f]" />
			</div>
			{/* Row 4 */}
			<div className="absolute left-0 top-[232px]">
				<IconCell icon={<ArrowDown className={ico} />} bg="bg-[#0C0C0C]" />
			</div>
			<div className="absolute left-[116px] top-[232px]">
				<IconCell bg="bg-[#2f2f2f]" />
			</div>
			{/* Row 5 */}
			<div className="absolute left-0 top-[290px]">
				<IconCell icon={<History className={ico} />} bg="bg-[#0C0C0C]" />
			</div>
			<div className="absolute left-[58px] top-[290px]">
				<IconCell icon={<Video className={ico} />} bg="bg-[#0C0C0C]" />
			</div>
			<div className="absolute left-[116px] top-[290px]">
				<IconCell bg="bg-[#2f2f2f]" />
			</div>
			{/* Extra bottom */}
			<div className="absolute left-[58px] top-[348px]">
				<IconCell bg="bg-[#2f2f2f]" />
			</div>
		</div>
	);
}
