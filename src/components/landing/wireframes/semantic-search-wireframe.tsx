export function SemanticSearchWireframe() {
	return (
		<div className="flex h-[260px] items-center justify-end bg-[#0C0C0C] lg:h-[380px]">
			<div className="flex h-full w-full max-w-[420px] flex-col rounded-[14px] bg-[#141414] shadow-[0_4px_30px_#00000030]">
				{/* Toolbar */}
				<div className="flex h-7 shrink-0 items-center gap-1.5 rounded-t-[14px] bg-[#333333] px-2.5">
					<div className="size-2 rounded-full bg-[#FF5F57]" />
					<div className="size-2 rounded-full bg-[#FEBC2E]" />
					<div className="size-2 rounded-full bg-[#28C840]" />
				</div>

				{/* Body */}
				<div className="flex flex-1 flex-col gap-4 p-4">
					{/* Search bar */}
					<div className="flex items-center gap-2.5 rounded-[10px] border border-primary bg-[#2A2A2A] px-3 py-2">
						<svg
							aria-hidden="true"
							className="size-4 shrink-0 text-primary"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
						<div className="h-2 w-3/4 rounded bg-[#A3A3A3]" />
					</div>

					{/* Separator */}
					<div className="h-px w-full bg-[#2A2A2A]" />

					{/* Result rows - abstract wireframe bars */}
					<div className="flex items-center gap-3">
						<div className="flex w-[140px] shrink-0 flex-col gap-1">
							<div className="h-2 w-[120px] rounded bg-white" />
							<div className="h-1.5 w-[140px] rounded bg-[#6a6a6a]" />
						</div>
						<div className="h-1.5 flex-1 rounded bg-primary" />
					</div>

					<div className="flex items-center gap-3">
						<div className="flex w-[140px] shrink-0 flex-col gap-1">
							<div className="h-2 w-[100px] rounded bg-[#A3A3A3]" />
							<div className="h-1.5 w-[130px] rounded bg-[#6a6a6a]" />
						</div>
						<div className="h-1.5 w-2/3 rounded bg-primary/40" />
					</div>

					<div className="flex items-center gap-3">
						<div className="flex w-[140px] shrink-0 flex-col gap-1">
							<div className="h-2 w-[90px] rounded bg-[#6a6a6a]" />
							<div className="h-1.5 w-[120px] rounded bg-[#6a6a6a]" />
						</div>
						<div className="h-1.5 w-1/3 rounded bg-primary/20" />
					</div>
				</div>
			</div>
		</div>
	);
}
