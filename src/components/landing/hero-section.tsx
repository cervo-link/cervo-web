import { Play } from 'lucide-react'
import { LandingButton } from './landing-button'
import { LandingLink } from './landing-link'
import { TestimonialCard } from './testimonial-card'
import { useScrollAnimation } from './use-scroll-animation'

export function HeroSection() {
	const { ref, isVisible } = useScrollAnimation()

	return (
		<section
			ref={ref}
			className={`flex flex-col justify-center gap-8 bg-[#0C0C0C] py-12 transition-all duration-700 lg:flex-row lg:items-start lg:justify-start lg:gap-[60px] lg:py-20 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
		>
			<div className="flex min-w-0 flex-col items-center gap-8 lg:items-start lg:gap-7">
				<div className="flex items-center gap-1.5 rounded-[20px] bg-[#052E1C] px-3.5 py-1.5">
					<span className="font-sans text-xs font-bold text-primary">
						AI-powered semantic bookmark manager
					</span>
				</div>

				<h1 className="whitespace-pre-line text-center font-sans text-[32px] font-bold leading-[1.1] text-white lg:text-left lg:text-5xl">
					{'Save any link.\nFind it by meaning.'}
				</h1>

				<div className="flex w-full flex-col items-center gap-4 lg:w-auto lg:flex-row lg:justify-start">
					<LandingButton href="/sign-in" className="w-[200px] lg:w-auto">
						Get Started
					</LandingButton>
					<LandingButton
						variant="secondary"
						icon={<Play className="h-4 w-4 fill-current" />}
						className="w-[200px] lg:w-auto"
					>
						How it works
					</LandingButton>
				</div>

				<LandingLink size="sm">30-Day Money-Back Guarantee</LandingLink>

				<TestimonialCard
					avatar="https://github.com/vmnog.png"
					quote="I saved a blog post months ago about startup hiring mistakes. Typed 'recruiting problems' into Cervo and it found it instantly. This is how bookmarks should work."
					name="Victor Nogueira"
					jobTitle="Founding Engineer"
					transparent
				/>
			</div>

			<div className="relative h-[220px] w-full overflow-hidden rounded-[16px] bg-gradient-to-br from-[#1A1A1A] to-[#0C0C0C] lg:h-[352px] lg:w-[527px] lg:shrink-0">
				<div className="absolute inset-0 bg-[#0000004d]" />
				<button
					type="button"
					className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[32px] bg-[#1A1A1ACC] shadow-lg backdrop-blur-sm"
					aria-label="Play video"
				>
					<Play className="h-6 w-6 fill-primary text-primary" />
				</button>
			</div>
		</section>
	)
}
