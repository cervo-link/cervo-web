import { useEffect, useRef } from "react";

export function SharedWorkspacesWireframe() {
	return (
		<div className="relative h-[280px] w-full bg-[#0C0C0C] lg:h-[414px]">
			<div className="mx-auto flex h-[233px] w-[342px] overflow-hidden rounded-[14px] bg-[#141414] shadow-[0_4px_30px_#00000030] lg:ml-5 lg:mt-[25px] lg:h-[300px] lg:w-[440px]">
				{/* Sidebar - team members */}
				<div className="flex w-[110px] shrink-0 flex-col gap-2.5 bg-[#1A1A1A] p-2.5">
					<div className="h-2 w-[60px] rounded bg-white" />
					<TeamMember color="bg-primary" nameWidth="w-[45px]" online />
					<TeamMember color="bg-[#5B8DEF]" nameWidth="w-[35px]" online />
					<TeamMember
						color="bg-[#F97316]"
						nameWidth="w-[40px]"
						online={false}
					/>
				</div>

				{/* Main content - bookmarks */}
				<div className="flex flex-1 flex-col gap-2.5 p-3.5">
					<div className="flex h-7 shrink-0 items-center gap-1.5 rounded-[8px] bg-[#333333] px-2.5">
						<div className="size-2 rounded-full bg-[#FF5F57]" />
						<div className="size-2 rounded-full bg-[#FEBC2E]" />
						<div className="size-2 rounded-full bg-[#28C840]" />
					</div>
					<BookmarkRow titleWidth="w-[160px]" descWidth="w-[179px]" />
					<BookmarkRow titleWidth="w-[140px]" descWidth="w-[180px]" />
					<BookmarkRow titleWidth="w-[120px]" descWidth="w-[170px]" />
				</div>
			</div>

			{/* Floating cursors */}
			<FloatingCursor
				color="fill-primary"
				startX={260}
				startY={80}
				duration={7}
				points={[
					[0, 0],
					[40, 25],
					[-20, 40],
					[-35, -10],
				]}
			/>
			<FloatingCursor
				color="fill-[#5B8DEF]"
				startX={200}
				startY={140}
				duration={8}
				points={[
					[0, 0],
					[-30, 20],
					[25, 35],
					[40, -15],
				]}
			/>
		</div>
	);
}

function TeamMember({
	color,
	nameWidth,
	online,
}: {
	color: string;
	nameWidth: string;
	online: boolean;
}) {
	return (
		<div className="flex items-center gap-1.5">
			<div className={`size-[18px] shrink-0 rounded-full ${color}`} />
			<div className={`h-1.5 rounded bg-[#A3A3A3] ${nameWidth}`} />
			<div
				className={`ml-auto size-1.5 shrink-0 rounded-full ${online ? "bg-primary" : "bg-[#6a6a6a]"}`}
			/>
		</div>
	);
}

function BookmarkRow({
	titleWidth,
	descWidth,
}: {
	titleWidth: string;
	descWidth: string;
}) {
	return (
		<div className="rounded-[6px] bg-[#2A2A2A] px-2 py-2">
			<div className={`h-[7px] rounded bg-white ${titleWidth}`} />
			<div className={`mt-2 h-1 rounded bg-[#6a6a6a] ${descWidth}`} />
		</div>
	);
}

function FloatingCursor({
	color,
	startX,
	startY,
	duration,
	points,
}: {
	color: string;
	startX: number;
	startY: number;
	duration: number;
	points: [number, number][];
}) {
	const ref = useRef<SVGSVGElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) {
			return;
		}

		const closed = [...points, points[0]];
		const keyframes = closed.map(([x, y]) => ({
			transform: `translate(${x}px, ${y}px)`,
			easing: "ease-in-out",
		}));

		const animation = el.animate(keyframes, {
			duration: duration * 1000,
			iterations: Number.POSITIVE_INFINITY,
		});

		return () => animation.cancel();
	}, [duration, points]);

	return (
		<svg
			ref={ref}
			className={`absolute size-3.5 ${color}`}
			viewBox="0 0 24 24"
			aria-hidden="true"
			style={{ left: startX, top: startY }}
		>
			<path d="M5 3l14 9-7 2-3 7z" />
		</svg>
	);
}
