import { ImageIcon } from 'lucide-react'

export function RichLinkWireframe() {
	return (
		<div className="w-full bg-[#0C0C0C]">
			<div className="mx-auto flex h-[260px] w-full max-w-[342px] flex-col overflow-hidden rounded-[14px] bg-[#141414] shadow-[0_4px_30px_#00000030] lg:mx-0 lg:h-[320px] lg:max-w-none">
				{/* Title bar */}
				<div className="flex h-7 shrink-0 items-center gap-1.5 bg-[#333333] px-2.5">
					<div className="size-2 rounded-full bg-[#FF5F57]" />
					<div className="size-2 rounded-full bg-[#FEBC2E]" />
					<div className="size-2 rounded-full bg-[#28C840]" />
				</div>

				{/* Image placeholder */}
				<div className="relative flex h-[120px] shrink-0 items-center justify-center bg-[#2A2A2A]">
					<ImageIcon className="size-6 text-[#6a6a6a]" />
				</div>

				{/* Body */}
				<div className="flex flex-1 flex-col gap-2 p-3.5">
					{/* URL row */}
					<div className="flex items-center gap-1.5">
						<div className="size-3 rounded-full bg-primary" />
						<div className="h-1.5 w-24 rounded bg-[#A3A3A3]" />
					</div>

					{/* Title */}
					<div className="h-[10px] w-[240px] rounded bg-white" />

					{/* Description lines */}
					<div className="h-1.5 w-[280px] rounded bg-[#A3A3A3]" />
					<div className="h-1.5 w-[240px] rounded bg-[#6a6a6a]" />

					{/* Tag pills */}
					<div className="flex gap-1.5">
						<div className="rounded-[14px] bg-primary px-2 py-[3px]">
							<div className="h-1.5 w-6 rounded bg-[#0C0C0C]" />
						</div>
						<div className="rounded-[14px] bg-[#052E1C] px-2 py-[3px]">
							<div className="h-1.5 w-5 rounded bg-primary" />
						</div>
						<div className="rounded-[14px] bg-[#2A2A2A] px-2 py-[3px]">
							<div className="h-1.5 w-8 rounded bg-[#6a6a6a]" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
