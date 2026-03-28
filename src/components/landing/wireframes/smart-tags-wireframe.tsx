import { Bookmark, Tags } from 'lucide-react'

export function SmartTagsWireframe() {
	return (
		<div className="w-full bg-[#0C0C0C]">
			<div className="mx-auto flex h-[280px] w-full max-w-[342px] flex-col overflow-hidden rounded-[14px] bg-[#141414] shadow-[0_4px_30px_#00000030] lg:mx-0 lg:h-[310px] lg:max-w-none">
				{/* Title bar */}
				<div className="flex h-7 shrink-0 items-center gap-1.5 bg-[#333333] px-2.5">
					<div className="size-2 rounded-full bg-[#FF5F57]" />
					<div className="size-2 rounded-full bg-[#FEBC2E]" />
					<div className="size-2 rounded-full bg-[#28C840]" />
				</div>

				{/* Body */}
				<div className="flex flex-1 flex-col gap-3 p-3.5">
					{/* Header */}
					<div className="flex items-center gap-2">
						<Tags className="size-4 text-primary" />
						<div className="h-[9px] w-20 rounded bg-white" />
					</div>

					{/* Tag pills row */}
					<div className="flex gap-1.5">
						<div className="rounded-[14px] bg-primary px-2.5 py-[5px]">
							<div className="h-2 w-10 rounded bg-[#0C0C0C]" />
						</div>
						<div className="rounded-[14px] bg-[#052E1C] px-2.5 py-[5px]">
							<div className="h-2 w-7 rounded bg-primary" />
						</div>
						<div className="rounded-[14px] bg-[#2A2A2A] px-2.5 py-[5px]">
							<div className="h-2 w-11 rounded bg-[#A3A3A3]" />
						</div>
						<div className="rounded-[14px] bg-[#2A2A2A] px-2.5 py-[5px]">
							<div className="h-2 w-8 rounded bg-[#6a6a6a]" />
						</div>
					</div>

					{/* Separator */}
					<div className="flex h-5 items-center">
						<div className="h-px w-full bg-[#2A2A2A]" />
					</div>

					{/* Group A */}
					<div className="flex flex-col gap-1.5">
						<div className="flex items-center gap-1">
							<div className="rounded bg-primary px-[5px] py-0.5">
								<div className="h-1.5 w-5 rounded bg-[#0C0C0C]" />
							</div>
						</div>
						<div className="flex items-center gap-2 pl-4">
							<Bookmark className="size-2.5 text-[#6a6a6a]" />
							<div className="h-1.5 w-[140px] rounded bg-[#A3A3A3]" />
						</div>
						<div className="flex items-center gap-2 pl-4">
							<Bookmark className="size-2.5 text-[#6a6a6a]" />
							<div className="h-1.5 w-[120px] rounded bg-[#A3A3A3]" />
						</div>
					</div>

					{/* Group B */}
					<div className="flex flex-col gap-1.5">
						<div className="flex items-center gap-1">
							<div className="rounded bg-[#052E1C] px-[5px] py-0.5">
								<div className="h-1.5 w-5 rounded bg-primary" />
							</div>
						</div>
						<div className="flex items-center gap-2 pl-4">
							<Bookmark className="size-2.5 text-[#6a6a6a]" />
							<div className="h-1.5 w-[130px] rounded bg-[#A3A3A3]" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
