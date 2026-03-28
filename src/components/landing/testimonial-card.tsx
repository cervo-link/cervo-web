interface TestimonialCardProps {
	avatar: string
	quote: string
	name: string
	jobTitle: string
	transparent?: boolean
}

export function TestimonialCard({
	avatar,
	quote,
	name,
	jobTitle,
	transparent = false,
}: TestimonialCardProps) {
	return (
		<div
			className={`flex w-full gap-3 ${
				transparent ? '' : 'rounded-[12px] bg-[#1A1A1A] px-5 py-4'
			}`}
		>
			<img
				src={avatar}
				alt={name}
				className="size-[55px] shrink-0 rounded-[8px] object-cover"
			/>
			<div className="flex flex-col gap-1">
				<p className="m-0 font-sans text-sm leading-[1.5] text-[#A3A3A3]">
					{quote}
				</p>
				<p className="m-0 font-sans text-[13px] font-bold text-white">
					{name}, <span className="font-bold">{jobTitle}</span>
				</p>
			</div>
		</div>
	)
}
