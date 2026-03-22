export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen">
			<div className="flex w-1/2 flex-col items-center justify-center bg-card px-16">
				<img src="/cervo.png" alt="Cervo" className="size-72" />
				<p className="text-lg font-medium uppercase tracking-widest text-muted-foreground">
					Save by URL. Find by meaning.
				</p>
			</div>
			<div className="flex w-1/2 flex-col items-center justify-center bg-background px-20">
				<div className="w-full max-w-sm">{children}</div>
			</div>
		</div>
	);
}
