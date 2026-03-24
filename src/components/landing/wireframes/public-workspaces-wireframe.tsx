import { Globe } from "lucide-react";

export function PublicWorkspacesWireframe() {
	return (
		<div className="w-full bg-[#0C0C0C]">
			<div className="mx-auto flex h-[280px] w-full max-w-[342px] flex-col overflow-hidden rounded-[14px] bg-[#141414] shadow-[0_4px_30px_#00000030] lg:mx-0 lg:h-[310px] lg:max-w-none">
				{/* Browser bar */}
				<div className="flex h-[30px] shrink-0 items-center gap-2 bg-[#1A1A1A] px-3">
					<div className="flex gap-1.5">
						<div className="size-[6px] rounded-full bg-[#FF5F57]" />
						<div className="size-[6px] rounded-full bg-[#FEBC2E]" />
						<div className="size-[6px] rounded-full bg-[#28C840]" />
					</div>
					<div className="flex h-5 flex-1 items-center rounded-[5px] bg-[#2A2A2A] px-2.5">
						<div className="h-[5px] w-[100px] rounded bg-[#6a6a6a]" />
					</div>
				</div>

				{/* Body */}
				<div className="flex flex-1 flex-col gap-3 p-4">
					{/* Header */}
					<div className="flex items-center justify-between">
						<div className="h-[10px] w-[120px] rounded bg-white" />
						<Globe className="size-4 text-primary" />
					</div>

					{/* Grid */}
					<div className="flex flex-col gap-2.5">
						<div className="flex gap-2.5">
							<WorkspaceCard color="bg-primary" />
							<WorkspaceCard color="bg-[#5B8DEF]" />
						</div>
						<div className="flex gap-2.5">
							<WorkspaceCard color="bg-[#F97316]" />
							<WorkspaceCard color="bg-[#A855F7]" />
						</div>
						<div className="flex gap-2.5">
							<WorkspaceCard color="bg-[#EC4899]" />
							<WorkspaceCard color="bg-[#06B6D4]" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function WorkspaceCard({ color }: { color: string }) {
	return (
		<div className="flex flex-1 flex-col overflow-hidden rounded-[8px] bg-[#1A1A1A]">
			<div className={`h-1 w-full ${color}`} />
			<div className="flex flex-col gap-[5px] p-2.5">
				<div className="h-[6px] w-[80px] rounded bg-white" />
				<div className="h-[5px] w-[100px] rounded bg-[#6a6a6a]" />
				<div className="h-[5px] w-[70px] rounded bg-[#6a6a6a]" />
			</div>
		</div>
	);
}
