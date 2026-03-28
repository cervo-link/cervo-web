/**
 * Pure CSS animation — no JS state needed.
 * 3 sequences in a 19.5s cycle (3 × 6.5s runs):
 *   Run 1: Row 6 highlights green, swaps with row 1
 *   Run 2: Row 3 highlights green, swaps with row 1
 *   Run 3: Row 4 highlights green, swaps with row 1
 *
 * Keyframes defined in styles.css under "w1-*" prefix.
 */

export function SemanticSearchWireframe() {
	return (
		<div className="flex items-center justify-center bg-[#0C0C0C] lg:justify-end">
			<div className="flex h-[260px] w-full max-w-[342px] flex-col rounded-[14px] bg-[#141414] shadow-[0_4px_30px_#00000030] lg:h-[380px] lg:max-w-none">
				{/* Toolbar */}
				<div className="flex h-7 shrink-0 items-center gap-1.5 rounded-t-[14px] bg-[#333333] px-2.5">
					<div className="size-2 rounded-full bg-[#FF5F57]" />
					<div className="size-2 rounded-full bg-[#FEBC2E]" />
					<div className="size-2 rounded-full bg-[#28C840]" />
				</div>

				{/* Body */}
				<div className="flex flex-1 flex-col gap-2.5 p-3 lg:gap-3 lg:p-4">
					{/* Search bar */}
					<div className="animate-w1-border flex items-center gap-2.5 rounded-[10px] border border-[#6a6a6a] bg-[#2A2A2A] px-3 py-2">
						<svg
							aria-hidden="true"
							className="animate-w1-icon size-4 shrink-0 text-[#6a6a6a]"
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
						<div className="animate-w1-query h-2 w-3/4 rounded bg-[#A3A3A3] opacity-0" />
					</div>

					{/* Separator */}
					<div className="h-px w-full bg-[#2A2A2A]" />

					{/* Result rows — CSS vars for swap offsets (gap × N rows) */}
					<div className="relative flex flex-col gap-3.5 [--w1-g2:28px] [--w1-g3:42px] [--w1-g5:70px] lg:gap-4 lg:[--w1-g2:32px] lg:[--w1-g3:48px] lg:[--w1-g5:80px]">
						{/* Row 1 — swaps to row 6 position */}
						<div className="animate-w1-row1 flex items-center gap-3 opacity-0">
							<div className="flex w-[110px] shrink-0 flex-col gap-1 lg:w-[140px]">
								<div className="h-1.5 w-[80px] rounded bg-white lg:h-2 lg:w-[95px]" />
								<div className="h-1 w-[100px] rounded bg-[#6a6a6a] lg:h-1.5 lg:w-[125px]" />
							</div>
							<div className="h-1 w-1/2 rounded bg-[#333333] lg:h-1.5" />
						</div>

						{/* Row 2 */}
						<div className="animate-w1-row2 flex items-center gap-3 opacity-0">
							<div className="flex w-[110px] shrink-0 flex-col gap-1 lg:w-[140px]">
								<div className="h-1.5 w-[100px] rounded bg-[#A3A3A3] lg:h-2 lg:w-[120px]" />
								<div className="h-1 w-[85px] rounded bg-[#6a6a6a] lg:h-1.5 lg:w-[110px]" />
							</div>
							<div className="h-1 w-2/3 rounded bg-[#333333] lg:h-1.5" />
						</div>

						{/* Row 3 — highlights green in run 2 */}
						<div className="animate-w1-row3 flex items-center gap-3 opacity-0">
							<div className="flex w-[110px] shrink-0 flex-col gap-1 lg:w-[140px]">
								<div className="animate-w1-row3-title h-1.5 w-[70px] rounded bg-[#A3A3A3] lg:h-2 lg:w-[85px]" />
								<div className="h-1 w-[105px] rounded bg-[#6a6a6a] lg:h-1.5 lg:w-[135px]" />
							</div>
							<div className="animate-w1-row3-bar h-1 w-2/5 rounded bg-[#333333] lg:h-1.5" />
						</div>

						{/* Row 4 — highlights green in run 3 */}
						<div className="animate-w1-row4 flex items-center gap-3 opacity-0">
							<div className="flex w-[110px] shrink-0 flex-col gap-1 lg:w-[140px]">
								<div className="animate-w1-row4-title h-1.5 w-[95px] rounded bg-[#6a6a6a] lg:h-2 lg:w-[115px]" />
								<div className="h-1 w-[80px] rounded bg-[#6a6a6a] lg:h-1.5 lg:w-[100px]" />
							</div>
							<div className="animate-w1-row4-bar h-1 w-3/5 rounded bg-[#333333] lg:h-1.5" />
						</div>

						{/* Row 5 */}
						<div className="animate-w1-row5 flex items-center gap-3 opacity-0">
							<div className="flex w-[110px] shrink-0 flex-col gap-1 lg:w-[140px]">
								<div className="h-1.5 w-[75px] rounded bg-[#6a6a6a] lg:h-2 lg:w-[90px]" />
								<div className="h-1 w-[95px] rounded bg-[#6a6a6a] lg:h-1.5 lg:w-[120px]" />
							</div>
							<div className="h-1 w-1/3 rounded bg-[#333333] lg:h-1.5" />
						</div>

						{/* Row 6 — highlights green, swaps to row 1 position */}
						<div className="animate-w1-row6 flex items-center gap-3 opacity-0">
							<div className="flex w-[110px] shrink-0 flex-col gap-1 lg:w-[140px]">
								<div className="animate-w1-row6-title h-1.5 w-[90px] rounded bg-[#6a6a6a] lg:h-2 lg:w-[105px]" />
								<div className="h-1 w-[75px] rounded bg-[#6a6a6a] lg:h-1.5 lg:w-[95px]" />
							</div>
							<div className="animate-w1-row6-bar h-1 w-2/5 rounded bg-[#333333] lg:h-1.5" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
