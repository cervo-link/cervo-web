const HEADING_FONT = "'Space Grotesk Variable', sans-serif";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen">
			<div className="flex w-1/2 flex-col items-center justify-center bg-[#141414] px-[60px]">
				<span className="text-[72px] leading-none">🫎</span>
				<h1
					className="mt-6 text-[42px] font-bold tracking-[4px] text-white"
					style={{ fontFamily: HEADING_FONT }}
				>
					CERVO
				</h1>
				<p className="mt-6 text-[11px] font-medium uppercase tracking-[2px] text-[#8a8a8a]">
					Save by URL. Find by meaning.
				</p>
			</div>
			<div className="flex w-1/2 flex-col items-center justify-center bg-[#0C0C0C] px-[80px]">
				<div className="w-full max-w-[380px]">{children}</div>
			</div>
		</div>
	);
}
