/**
 * W2: AI Enrichment — Gray Skeleton → Sparkle Process → Green Insertion
 *
 * Gray elements appear one at a time, intercalated left→right, top→bottom:
 *   g-1(L1) → g-2(R1) → g-3(L2) → g-4(R2) → ... → g-13(R8)
 * Then sparkle spins/bounces/turns green.
 * Then green elements insert one at a time (gi-1 → gi-8).
 */
import { Sparkles } from 'lucide-react'

export function AIEnrichmentWireframe() {
	return (
		<div className="relative h-[280px] w-full bg-[#0C0C0C] lg:h-[420px]">
			{/* Left card */}
			<div className="animate-w2-border absolute left-0 top-0 flex h-[180px] w-[280px] flex-col overflow-hidden rounded-[14px] border border-transparent bg-[#141414] shadow-[0_4px_30px_#00000030] lg:top-[30px] lg:w-[60%]">
				<div className="flex h-7 shrink-0 items-center gap-1.5 bg-[#333333] px-2.5">
					<div className="size-2 rounded-full bg-[#FF5F57]" />
					<div className="size-2 rounded-full bg-[#FEBC2E]" />
					<div className="size-2 rounded-full bg-[#28C840]" />
				</div>
				<div className="flex flex-1 flex-col p-3.5">
					{/* L1: favicon + domain (g-1, 1%) */}
					<div className="animate-w2-g-1 flex items-center gap-1.5 opacity-0">
						<div className="size-3.5 rounded-full bg-[#6a6a6a]" />
						<div className="h-1.5 w-24 rounded bg-[#555]" />
					</div>
					{/* L2: title (g-3, 2%) */}
					<div className="animate-w2-g-3 mt-2 h-[9px] w-[190px] rounded bg-[#6a6a6a] opacity-0" />
					{/* L3: subtitle (g-5, 3%) */}
					<div className="animate-w2-g-5 mt-1.5 h-1.5 w-[140px] rounded bg-[#555] opacity-0" />

					{/* ── INSERT 1: tag pills ── */}
					<div className="animate-w2-insert-1 max-h-0 overflow-hidden">
						<div className="mt-2 flex gap-1">
							<div className="animate-w2-gi-1 rounded bg-primary/20 px-1.5 py-0.5 opacity-0">
								<div className="h-1.5 w-8 rounded bg-primary" />
							</div>
							<div className="animate-w2-gi-2 rounded bg-primary/20 px-1.5 py-0.5 opacity-0">
								<div className="h-1.5 w-6 rounded bg-primary" />
							</div>
							<div className="animate-w2-gi-3 rounded bg-primary/20 px-1.5 py-0.5 opacity-0">
								<div className="h-1.5 w-10 rounded bg-primary" />
							</div>
						</div>
					</div>

					{/* L4: desc line 1 (g-7, 4%) */}
					<div className="animate-w2-g-7 mt-2 h-1.5 w-[210px] rounded bg-[#555] opacity-0" />
					{/* L5: desc line 2 (g-9, 5%) */}
					<div className="animate-w2-g-9 mt-1.5 h-1.5 w-[180px] rounded bg-[#444] opacity-0" />

					{/* ── INSERT 2: summary bar ── */}
					<div className="animate-w2-insert-2 max-h-0 overflow-hidden">
						<div className="animate-w2-gi-5 mt-2 h-[7px] w-[130px] rounded bg-primary/40 opacity-0" />
					</div>
				</div>
			</div>

			{/* Sparkle badge */}
			<div className="animate-w2-sparkle absolute left-[60px] top-[170px] z-10 flex size-10 items-center justify-center rounded-[20px] bg-[#2a2a2a] text-[#6a6a6a] lg:left-[46%] lg:top-[180px]">
				<Sparkles className="size-[18px]" />
			</div>

			{/* Right card */}
			<div className="animate-w2-border absolute left-[91px] top-[108px] flex h-[170px] w-[220px] flex-col overflow-hidden rounded-[12px] border border-transparent bg-[#1A1A1A] shadow-[0_6px_20px_#00000050] lg:left-[50%] lg:top-[100px] lg:h-[280px] lg:w-[48%]">
				<div className="flex h-[22px] shrink-0 items-center gap-[5px] bg-[#333333] px-2">
					<div className="size-1.5 rounded-full bg-[#FF5F57]" />
					<div className="size-1.5 rounded-full bg-[#FEBC2E]" />
					<div className="size-1.5 rounded-full bg-[#28C840]" />
				</div>
				<div className="flex flex-1 flex-col p-2.5">
					{/* R1: title (g-2, 1.5%) */}
					<div className="animate-w2-g-2 h-2.5 w-[160px] rounded bg-[#6a6a6a] opacity-0" />
					{/* R2: author + avatar (g-4, 2.5%) */}
					<div className="animate-w2-g-4 mt-2 flex items-center gap-1.5 opacity-0">
						<div className="size-2.5 rounded-full bg-[#555]" />
						<div className="h-1.5 w-16 rounded bg-[#555]" />
					</div>

					{/* ── INSERT 1: tags + summary ── */}
					<div className="animate-w2-insert-1 max-h-0 overflow-hidden">
						<div className="mt-2 flex flex-col gap-1.5">
							<div className="flex gap-1">
								<div className="animate-w2-gi-1 rounded bg-primary/20 px-1 py-0.5 opacity-0">
									<div className="h-1 w-8 rounded bg-primary" />
								</div>
								<div className="animate-w2-gi-2 rounded bg-primary/20 px-1 py-0.5 opacity-0">
									<div className="h-1 w-5 rounded bg-primary" />
								</div>
								<div className="animate-w2-gi-3 rounded bg-primary/20 px-1 py-0.5 opacity-0">
									<div className="h-1 w-10 rounded bg-primary" />
								</div>
							</div>
							<div className="animate-w2-gi-4 h-[5px] w-[120px] rounded bg-primary/30 opacity-0" />
						</div>
					</div>

					{/* R3: separator (g-6, 3.5%) */}
					<div className="animate-w2-g-6 mt-2 h-px w-full bg-[#3a3a3a] opacity-0" />
					{/* R4: paragraph 1 (g-8, 4.5%) */}
					<div className="animate-w2-g-8 mt-2 h-[5px] w-[175px] rounded bg-[#555] opacity-0" />
					{/* R5: paragraph 2 (g-10, 5.5%) */}
					<div className="animate-w2-g-10 mt-1.5 h-[5px] w-[150px] rounded bg-[#444] opacity-0" />

					{/* ── INSERT 2: description block ── */}
					<div className="animate-w2-insert-2 max-h-0 overflow-hidden">
						<div className="mt-1.5 flex flex-col gap-1">
							<div className="animate-w2-gi-5 h-[5px] w-[140px] rounded bg-primary/25 opacity-0" />
							<div className="animate-w2-gi-6 h-[5px] w-[105px] rounded bg-primary/20 opacity-0" />
						</div>
					</div>

					{/* R6: paragraph 3 (g-11, 6%) */}
					<div className="animate-w2-g-11 mt-1.5 h-[5px] w-[130px] rounded bg-[#444] opacity-0" />
					{/* R7: taller bar (g-12, 6.5%) */}
					<div className="animate-w2-g-12 mt-2 h-[8px] w-[100px] rounded bg-[#555] opacity-0" />
					{/* R8: thin line (g-13, 7%) */}
					<div className="animate-w2-g-13 mt-1.5 h-[4px] w-[165px] rounded bg-[#3a3a3a] opacity-0" />

					{/* ── INSERT 3: line + pill ── */}
					<div className="animate-w2-insert-3 max-h-0 overflow-hidden">
						<div className="mt-1.5 flex items-center gap-2">
							<div className="animate-w2-gi-7 h-[5px] w-[80px] rounded bg-primary/30 opacity-0" />
							<div className="animate-w2-gi-8 rounded bg-primary/20 px-1 py-0.5 opacity-0">
								<div className="h-1 w-6 rounded bg-primary" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
