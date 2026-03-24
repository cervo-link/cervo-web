import { Sparkles } from "lucide-react";

export function AIEnrichmentWireframe() {
	return (
		<div className="relative h-[280px] w-full bg-[#0C0C0C] lg:h-[420px]">
			{/* Plain card - top left */}
			<div className="absolute left-0 top-0 flex h-[180px] w-[280px] flex-col overflow-hidden rounded-[14px] bg-[#141414] shadow-[0_4px_30px_#00000030] lg:top-[30px] lg:w-[60%]">
				<div className="flex h-7 shrink-0 items-center gap-1.5 bg-[#333333] px-2.5">
					<div className="size-2 rounded-full bg-[#FF5F57]" />
					<div className="size-2 rounded-full bg-[#FEBC2E]" />
					<div className="size-2 rounded-full bg-[#28C840]" />
				</div>
				<div className="flex flex-1 flex-col gap-2 p-3.5">
					<div className="flex items-center gap-1.5">
						<div className="size-3.5 rounded-full bg-primary" />
						<div className="h-1.5 w-24 rounded bg-[#A3A3A3]" />
					</div>
					<div className="h-[9px] w-[180px] rounded bg-white" />
					<div className="h-1.5 w-[200px] rounded bg-[#6a6a6a]" />
					<div className="h-1.5 w-[160px] rounded bg-[#6a6a6a]" />
				</div>
			</div>

			{/* Sparkles arrow badge */}
			<div className="absolute left-[266px] top-[76px] flex size-10 items-center justify-center rounded-[20px] bg-[#052E1C] lg:left-[58%] lg:top-[120px]">
				<Sparkles className="size-[18px] text-primary" />
			</div>

			{/* Enriched card - bottom right, with green border */}
			<div className="absolute left-[91px] top-[148px] flex h-[132px] w-[208px] flex-col overflow-hidden rounded-[12px] border border-primary bg-[#1A1A1A] shadow-[0_6px_20px_#00000050] lg:left-[50%] lg:top-[100px] lg:h-[240px] lg:w-[48%]">
				<div className="flex h-[22px] shrink-0 items-center gap-[5px] bg-[#333333] px-2">
					<div className="size-1.5 rounded-full bg-[#FF5F57]" />
					<div className="size-1.5 rounded-full bg-[#FEBC2E]" />
					<div className="size-1.5 rounded-full bg-[#28C840]" />
				</div>
				<div className="flex flex-1 flex-col gap-2 p-2.5">
					<div className="h-2 w-[140px] rounded bg-white" />
					<div className="flex gap-1">
						<div className="rounded bg-primary/20 px-1.5 py-0.5">
							<div className="h-1.5 w-8 rounded bg-primary" />
						</div>
						<div className="rounded bg-primary/20 px-1.5 py-0.5">
							<div className="h-1.5 w-6 rounded bg-primary" />
						</div>
					</div>
					<div className="h-px w-full bg-[#2A2A2A]" />
					<div className="h-[7px] w-20 rounded bg-[#A3A3A3]" />
					<div className="h-[5px] w-[170px] rounded bg-[#6a6a6a]" />
					<div className="h-[5px] w-[150px] rounded bg-[#6a6a6a]" />
					<div className="hidden h-[5px] w-[130px] rounded bg-[#6a6a6a] lg:block" />
				</div>
			</div>
		</div>
	);
}
