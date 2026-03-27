export function DiscordWireframe() {
	return (
		<div className="relative h-[260px] w-full bg-[#0C0C0C] lg:h-[380px]">
			{/* Discord window */}
			<div className="absolute left-1/2 top-0 flex h-[200px] w-[342px] -translate-x-1/2 overflow-hidden rounded-[14px] bg-[#141414] shadow-[0_4px_30px_#00000030] lg:left-0 lg:right-[60px] lg:top-[15px] lg:h-[310px] lg:w-auto lg:translate-x-0">
				{/* Server bar */}
				<div className="flex w-10 shrink-0 flex-col items-center gap-1.5 bg-[#0C0C0C] px-1.5 py-2">
					<div className="size-7 rounded-full bg-[#2A2A2A]" />
					<div className="size-7 rounded-full bg-[#2A2A2A]" />
					<div className="size-7 rounded-full bg-primary" />
					<div className="size-7 rounded-full bg-[#2A2A2A]" />
				</div>

				{/* Channel bar */}
				<div className="flex w-[100px] shrink-0 flex-col gap-1.5 bg-[#1A1A1A] px-2 pt-7 pb-2">
					<div className="h-[7px] w-[60px] rounded bg-[#A3A3A3]" />
					<div className="flex items-center rounded bg-[#2A2A2A] px-1.5 py-1">
						<div className="h-1.5 w-[50px] rounded bg-white" />
					</div>
					<div className="h-1.5 w-[55px] rounded bg-[#6a6a6a]" />
					<div className="h-1.5 w-[65px] rounded bg-[#6a6a6a]" />
				</div>

				{/* Chat area */}
				<div className="flex flex-1 flex-col gap-2.5 p-3">
					<ChatMessage nameWidth="w-[50px]" textWidth="w-[141px]" />
					<ChatMessage nameWidth="w-[50px]" textWidth="w-[141px]" />
					<CervoMessage />
				</div>
			</div>

			{/* Cervo floating card */}
			<div className="absolute left-[151px] top-[150px] flex h-[110px] w-[160px] flex-col overflow-hidden rounded-[10px] bg-[#1A1A1A] shadow-[0_6px_20px_#00000050] lg:left-[340px] lg:top-[230px]">
				<div className="flex h-5 shrink-0 items-center gap-1 bg-[#333333] px-[7px]">
					<div className="size-[5px] rounded-full bg-[#FF5F57]" />
					<div className="size-[5px] rounded-full bg-[#FEBC2E]" />
					<div className="size-[5px] rounded-full bg-[#28C840]" />
				</div>
				<div className="flex flex-1 flex-col gap-[5px] p-2">
					<div className="h-[6px] w-[100px] rounded bg-white" />
					<div className="h-[5px] w-[120px] rounded bg-[#6a6a6a]" />
					<div className="h-[5px] w-[90px] rounded bg-[#6a6a6a]" />
					<div className="mt-1 flex gap-1">
						<div className="rounded bg-primary/20 px-1 py-0.5">
							<div className="h-1 w-5 rounded bg-primary" />
						</div>
						<div className="rounded bg-primary/20 px-1 py-0.5">
							<div className="h-1 w-4 rounded bg-primary" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function ChatMessage({
	nameWidth,
	textWidth,
}: {
	nameWidth: string
	textWidth: string
}) {
	return (
		<div className="flex gap-2">
			<div className="size-5 shrink-0 rounded-full bg-[#6a6a6a]" />
			<div className="flex flex-col gap-[3px]">
				<div className={`h-1.5 rounded bg-[#A3A3A3] ${nameWidth}`} />
				<div className={`h-[5px] rounded bg-[#6a6a6a] ${textWidth}`} />
			</div>
		</div>
	)
}

function CervoMessage() {
	return (
		<div className="flex gap-2">
			<div className="size-5 shrink-0 rounded-full bg-[#6a6a6a]" />
			<div className="flex flex-col gap-[3px]">
				<div className="h-1.5 w-10 rounded bg-[#A3A3A3]" />
				<div className="flex flex-col gap-[3px] rounded-[6px] bg-[#052E1C] p-1.5">
					<div className="h-[5px] w-[100px] rounded bg-primary/60" />
					<div className="h-[5px] w-[80px] rounded bg-primary/40" />
				</div>
			</div>
		</div>
	)
}
