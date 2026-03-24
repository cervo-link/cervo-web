import type { ComponentProps, ReactNode } from "react";
import { LandingButton } from "./landing-button";
import { LandingLink } from "./landing-link";
import { TestimonialCard } from "./testimonial-card";
import { useScrollAnimation } from "./use-scroll-animation";

interface FeatureItem {
	icon: ReactNode;
	text: string;
	badge?: string;
}

interface ToolIcon {
	id: string;
	icon: ReactNode;
	highlighted?: boolean;
}

interface FeatureSectionProps {
	title: string;
	body: string;
	wireframe: ReactNode;
	reverse?: boolean;
	centered?: boolean;
	link?: { text: string; icon?: ReactNode; href?: string };
	badge?: { icon: ReactNode; text: string };
	features?: FeatureItem[];
	toolIcons?: ToolIcon[][];
	cta?: { text: string; href: string };
	testimonial?: ComponentProps<typeof TestimonialCard>;
}

export function FeatureSection({
	title,
	body,
	wireframe,
	reverse = false,
	centered = false,
	link,
	badge,
	features,
	toolIcons,
	cta,
	testimonial,
}: FeatureSectionProps) {
	const { ref, isVisible } = useScrollAnimation();

	if (centered) {
		return (
			<section
				ref={ref}
				className={`flex flex-col items-center gap-8 py-[60px] transition-all duration-700 lg:flex-row lg:items-center lg:gap-[60px] lg:py-[120px] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
			>
				<div className="flex w-full flex-col items-center gap-4 lg:order-2 lg:items-start">
					<h2 className="m-0 text-center font-sans text-[28px] font-bold text-white lg:text-left lg:text-4xl">
						{title}
					</h2>
					<p className="m-0 text-center font-sans text-base leading-[1.65] text-[#A3A3A3] lg:text-left lg:text-lg">
						{body}
					</p>
					{toolIcons && <ToolIconsGrid rows={toolIcons} />}

					{features && (
						<div className="flex flex-col gap-3">
							{features.map((feat) => (
								<div key={feat.text} className="flex items-center gap-2.5">
									<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#2A2A2A]">
										{feat.icon}
									</div>
									<span className="font-sans text-[15px] font-bold text-[#E5E5E5]">
										{feat.text}
									</span>
								</div>
							))}
						</div>
					)}
				</div>
				<div className="w-full lg:order-1 lg:w-1/2 lg:shrink-0">
					{wireframe}
				</div>
			</section>
		);
	}

	return (
		<section
			ref={ref}
			className={`flex flex-col items-center gap-8 py-[60px] transition-all duration-700 lg:items-start lg:gap-[60px] lg:py-[120px] ${
				reverse ? "lg:flex-row-reverse" : "lg:flex-row"
			} ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
		>
			<div className="flex w-full flex-col items-center gap-4 lg:items-start lg:gap-4">
				{badge && (
					<div className="flex items-center gap-2">
						<div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#0A3D23]">
							{badge.icon}
						</div>
						<span className="text-center font-sans text-[13px] font-bold text-primary">
							{badge.text}
						</span>
					</div>
				)}

				<h2 className="m-0 text-center font-sans text-[28px] font-bold text-white lg:text-left lg:text-4xl">
					{title}
				</h2>

				<p className="m-0 text-center font-sans text-base leading-[1.65] text-[#A3A3A3] lg:text-left lg:text-lg">
					{body}
				</p>

				{link && (
					<LandingLink href={link.href} icon={link.icon} iconPosition="left">
						{link.text}
					</LandingLink>
				)}

				{features && (
					<div className="flex flex-col gap-3">
						{features.map((feat) => (
							<div key={feat.text} className="flex items-center gap-2.5">
								<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#2A2A2A]">
									{feat.icon}
								</div>
								<span className="font-sans text-[15px] font-bold text-[#E5E5E5]">
									{feat.text}
								</span>
								{feat.badge && (
									<span className="rounded-[20px] bg-[#052E1C] px-1.5 py-1 font-sans text-[11px] font-bold text-primary">
										{feat.badge}
									</span>
								)}
							</div>
						))}
					</div>
				)}

				{cta && (
					<LandingButton href={cta.href} className="mt-6">
						{cta.text}
					</LandingButton>
				)}

				{testimonial && (
					<div className="mt-4 w-full">
						<TestimonialCard {...testimonial} />
					</div>
				)}
			</div>

			<div className="w-full lg:w-1/2 lg:shrink-0">{wireframe}</div>
		</section>
	);
}

function ToolIconsGrid({ rows }: { rows: ToolIcon[][] }) {
	return (
		<div className="flex w-full flex-col items-center gap-2 lg:items-start">
			{rows.map((row) => {
				const rowKey = row.map((i) => i.id).join("-");
				return (
					<div
						key={rowKey}
						className="flex justify-center gap-2 lg:justify-start"
					>
						{row.map((item) => (
							<div
								key={item.id}
								className={`flex size-8 items-center justify-center rounded-[8px] ${
									item.highlighted
										? "border-[1.5px] border-primary bg-[#052E1C]"
										: "bg-[#2A2A2A]"
								}`}
							>
								{item.icon}
							</div>
						))}
					</div>
				);
			})}
		</div>
	);
}
