import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LandingLink } from "./landing-link";
import { useScrollAnimation } from "./use-scroll-animation";

interface Testimonial {
	avatar: string;
	name: string;
	role: string;
	roleColor?: "white" | "primary";
	rolePrefix?: string;
	quote: string;
	link?: { text: string; href: string };
}

interface TestimonialsCarouselProps {
	testimonials: Testimonial[];
}

export function TestimonialsCarousel({
	testimonials,
}: TestimonialsCarouselProps) {
	const { ref, isVisible } = useScrollAnimation();
	const total = testimonials.length;

	const extended = useMemo(
		() =>
			[
				{ ...testimonials[total - 1], _pos: "clone-last" },
				...testimonials.map((t, idx) => ({ ...t, _pos: `item-${idx}` })),
				{ ...testimonials[0], _pos: "clone-first" },
			] as Array<Testimonial & { _pos: string }>,
		[testimonials, total],
	);

	const [index, setIndex] = useState(1);
	const [animate, setAnimate] = useState(true);

	function handleTransitionEnd() {
		if (index === 0) {
			setAnimate(false);
			setIndex(total);
		}
		if (index === total + 1) {
			setAnimate(false);
			setIndex(1);
		}
	}

	useEffect(() => {
		if (!animate) {
			requestAnimationFrame(() => setAnimate(true));
		}
	}, [animate]);

	const navigate = useCallback((direction: "left" | "right") => {
		setIndex((prev) => (direction === "right" ? prev + 1 : prev - 1));
	}, []);

	return (
		<section
			ref={ref}
			className={`overflow-hidden py-[60px] transition-all duration-700 lg:py-20 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
		>
			{/* Mobile layout */}
			<div className="lg:hidden">
				<div className="flex flex-col items-center gap-4 px-6">
					<Header />
				</div>
				<div className="relative mt-8 overflow-hidden px-6">
					<div
						onTransitionEnd={handleTransitionEnd}
						className={`flex gap-5 ${animate ? "transition-transform duration-500 ease-in-out" : ""}`}
						style={{ transform: `translateX(calc(-${index} * (100% + 20px)))` }}
					>
						{extended.map((t) => (
							<Card key={`m-${t._pos}`} testimonial={t} className="w-full" />
						))}
					</div>
				</div>
				<div className="mt-4 flex justify-center pt-4">
					<NavButtons onNavigate={navigate} />
				</div>
			</div>

			{/* Desktop layout */}
			<div className="hidden lg:mx-auto lg:flex lg:max-w-7xl lg:items-start lg:gap-12 lg:pl-[163px]">
				<div className="flex w-[380px] shrink-0 flex-col gap-4">
					<Header />
					<div className="pt-4">
						<NavButtons onNavigate={navigate} />
					</div>
				</div>
				<div className="min-w-0 flex-1 overflow-hidden">
					<div
						onTransitionEnd={handleTransitionEnd}
						className={`flex gap-5 ${animate ? "transition-transform duration-500 ease-in-out" : ""}`}
						style={{ transform: `translateX(-${index * 440}px)` }}
					>
						{extended.map((t) => (
							<Card key={`d-${t._pos}`} testimonial={t} className="w-[420px]" />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function Header() {
	return (
		<>
			<h2 className="m-0 text-center font-sans text-[28px] font-bold text-white lg:text-left lg:text-[40px]">
				What Users Say
			</h2>
			<p className="m-0 text-center font-sans text-base leading-[1.5] text-[#A3A3A3] lg:text-left">
				People love how Cervo changes the way
				<br />
				they save and find things online.
			</p>
			<div className="flex items-center gap-1.5">
				<span className="font-sans text-sm text-[#ffbd00]">★★★★★</span>
				<span className="font-sans text-sm font-semibold text-white">4.9</span>
				<span className="font-sans text-[13px] text-[#8a8a8a]">
					Based on user reviews.
				</span>
			</div>
			<div className="pt-4">
				<LandingLink href="#stories" size="sm">
					Read more stories
				</LandingLink>
			</div>
		</>
	);
}

function NavButtons({
	onNavigate,
}: {
	onNavigate: (dir: "left" | "right") => void;
}) {
	return (
		<div className="flex items-center gap-8">
			<button
				type="button"
				onClick={() => onNavigate("left")}
				className="text-white transition-opacity hover:opacity-70"
				aria-label="Previous testimonial"
			>
				<ChevronLeft className="size-6" />
			</button>
			<button
				type="button"
				onClick={() => onNavigate("right")}
				className="text-white transition-opacity hover:opacity-70"
				aria-label="Next testimonial"
			>
				<ChevronRight className="size-6" />
			</button>
		</div>
	);
}

function Card({
	testimonial: t,
	className,
}: {
	testimonial: Testimonial;
	className: string;
}) {
	return (
		<div
			className={`flex shrink-0 flex-col gap-6 rounded-[16px] bg-[#1A1A1A] p-8 ${className}`}
		>
			<div className="flex items-center gap-3">
				<img
					src={t.avatar}
					alt={t.name}
					className="size-14 shrink-0 rounded-[8px] object-cover"
				/>
				<div className="flex flex-col gap-0.5">
					<span className="font-sans text-base font-bold text-white">
						{t.name}
					</span>
					<span
						className={`font-sans text-[15px] font-medium ${t.roleColor === "primary" ? "text-primary" : "text-white"}`}
					>
						{t.rolePrefix && <span className="mr-1">{t.rolePrefix}</span>}
						{t.role}
					</span>
				</div>
			</div>
			<p className="m-0 flex-1 font-sans text-base leading-[1.7] text-[#A3A3A3]">
				{t.quote}
			</p>
			{t.link && (
				<LandingLink href={t.link.href} size="sm">
					{t.link.text}
				</LandingLink>
			)}
		</div>
	);
}
