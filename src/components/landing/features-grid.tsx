import type { ReactNode } from 'react'
import { LandingLink } from './landing-link'
import { useScrollAnimation } from './use-scroll-animation'

interface FeatureCard {
	icon: ReactNode
	title: string
	description: string
}

interface FeaturesGridProps {
	cards: FeatureCard[]
	footerLink?: { text: string; href: string }
}

export function FeaturesGrid({ cards, footerLink }: FeaturesGridProps) {
	const { ref, isVisible } = useScrollAnimation()

	return (
		<section
			ref={ref}
			className={`flex flex-col items-center gap-10 py-[60px] transition-all duration-700 lg:py-[120px] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
		>
			<div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-3">
				{cards.map(card => (
					<div key={card.title} className="flex flex-col items-center gap-2.5">
						<div className="flex size-12 items-center justify-center rounded-[10px] bg-[#2A2A2A]">
							{card.icon}
						</div>
						<span className="text-center font-sans text-base font-bold text-white">
							{card.title}
						</span>
						<p className="m-0 max-w-[280px] text-center font-sans text-[13px] leading-[1.65] text-[#6a6a6a]">
							{card.description}
						</p>
					</div>
				))}
			</div>

			{footerLink && (
				<LandingLink href={footerLink.href} size="sm">
					{footerLink.text}
				</LandingLink>
			)}
		</section>
	)
}
