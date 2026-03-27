import { Lock, ShieldCheck } from 'lucide-react'

export function PrivacyWireframe() {
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
				<div className="flex flex-1 flex-col items-center gap-3.5 p-4">
					{/* Shield badge */}
					<div className="flex size-[50px] items-center justify-center rounded-[25px] bg-[#052E1C]">
						<ShieldCheck className="size-6 text-primary" />
					</div>

					{/* Grid */}
					<div className="flex w-full gap-3">
						<SecurityCard active />
						<SecurityCard />
					</div>
					<div className="flex w-full gap-3">
						<SecurityCard />
						<SecurityCard />
					</div>
				</div>
			</div>
		</div>
	)
}

function SecurityCard({ active = false }: { active?: boolean }) {
	return (
		<div
			className={`flex flex-1 flex-col gap-2 rounded-[8px] bg-[#1A1A1A] p-2.5 ${
				active ? 'border border-primary/20' : 'border border-[#2f2f2f]'
			}`}
		>
			<div className="flex items-center gap-1.5">
				<Lock
					className={`size-3 ${active ? 'text-primary' : 'text-[#6a6a6a]'}`}
				/>
				<div
					className={`h-[7px] w-[50px] rounded ${active ? 'bg-primary' : 'bg-[#6a6a6a]'}`}
				/>
			</div>
			<div className="flex items-center gap-1.5">
				<div
					className={`size-1.5 rounded-full ${active ? 'bg-primary' : 'bg-[#6a6a6a]'}`}
				/>
				<div className="h-[5px] w-[90px] rounded bg-[#A3A3A3]" />
			</div>
			<div className="flex items-center gap-1.5">
				<div
					className={`size-1.5 rounded-full ${active ? 'bg-primary' : 'bg-[#6a6a6a]'}`}
				/>
				<div className="h-[5px] w-[70px] rounded bg-[#A3A3A3]" />
			</div>
		</div>
	)
}
