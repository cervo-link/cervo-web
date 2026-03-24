import { TriangleAlert } from "lucide-react";

export function DuplicateDetectionWireframe() {
	return (
		<div className="relative h-[260px] w-full bg-[#0C0C0C] lg:h-[340px]">
			{/* Card A - top left */}
			<div className="absolute left-0 top-0 flex h-[140px] w-[80%] max-w-[260px] flex-col overflow-hidden rounded-[12px] border border-[#2f2f2f] bg-[#141414] shadow-[0_4px_20px_#00000030] lg:left-auto lg:right-[20%] lg:w-[55%] lg:max-w-none">
				<div className="flex h-6 shrink-0 items-center gap-[5px] bg-[#333333] px-2">
					<div className="size-1.5 rounded-full bg-[#FF5F57]" />
					<div className="size-1.5 rounded-full bg-[#FEBC2E]" />
					<div className="size-1.5 rounded-full bg-[#28C840]" />
				</div>
				<div className="flex flex-1 flex-col gap-[5px] p-2.5">
					<div className="h-2 w-[160px] rounded bg-white" />
					<div className="h-[5px] w-[180px] rounded bg-[#6a6a6a]" />
					<div className="h-[5px] w-[200px] rounded bg-[#6a6a6a]" />
				</div>
			</div>

			{/* Warning badge */}
			<div className="absolute left-[45px] top-[65px] z-10 flex size-[50px] items-center justify-center rounded-[25px] border-[1.5px] border-[#F9A825] bg-[#F9A82520] lg:left-[40%] lg:top-[70px]">
				<TriangleAlert className="size-5 text-[#F9A825]" />
			</div>

			{/* Card B - bottom right, with yellow border */}
			<div className="absolute left-[60px] top-[120px] flex h-[140px] w-[calc(100%-60px)] max-w-[260px] flex-col overflow-hidden rounded-[12px] border-[1.5px] border-[#F9A825] bg-[#141414] shadow-[0_4px_20px_#00000030] lg:left-auto lg:right-0 lg:w-[55%] lg:max-w-none">
				<div className="flex h-6 shrink-0 items-center gap-[5px] bg-[#333333] px-2">
					<div className="size-1.5 rounded-full bg-[#FF5F57]" />
					<div className="size-1.5 rounded-full bg-[#FEBC2E]" />
					<div className="size-1.5 rounded-full bg-[#28C840]" />
				</div>
				<div className="flex flex-1 flex-col gap-[5px] p-2.5">
					<div className="h-2 w-[160px] rounded bg-white" />
					<div className="h-[5px] w-[180px] rounded bg-[#6a6a6a]" />
					<div className="h-[5px] w-[200px] rounded bg-[#6a6a6a]" />
				</div>
			</div>
		</div>
	);
}
