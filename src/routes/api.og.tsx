import { createFileRoute } from "@tanstack/react-router";
import { ImageResponse } from "@vercel/og";

const INTER_BOLD_URL = "https://rsms.me/inter/font-files/Inter-Bold.woff2";

export const Route = createFileRoute("/api/og")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const url = new URL(request.url);
				const rawTitle = url.searchParams.get("title") || "Cervo";
				const rawSubtitle = url.searchParams.get("subtitle") || "";

				const title = rawTitle.slice(0, 80);
				const subtitle = rawSubtitle.slice(0, 120);

				const [fontData, logoData] = await Promise.all([
					fetch(INTER_BOLD_URL).then((res) => res.arrayBuffer()),
					fetch(new URL("/cervo-horizontal.png", request.url)).then((res) =>
						res.arrayBuffer(),
					),
				]);

				const logoBase64 = `data:image/png;base64,${Buffer.from(logoData).toString("base64")}`;

				return new ImageResponse(
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							width: "1200px",
							height: "630px",
							backgroundColor: "#000000",
							color: "#ffffff",
							fontFamily: "Inter",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								flex: 1,
								gap: "16px",
								paddingTop: "40px",
							}}
						>
							<div
								style={{
									fontSize: "60px",
									fontWeight: 700,
									textAlign: "center",
									lineHeight: 1.1,
									maxWidth: "900px",
								}}
							>
								{title}
							</div>
							{subtitle ? (
								<div
									style={{
										fontSize: "30px",
										color: "#cccccc",
										textAlign: "center",
										maxWidth: "800px",
									}}
								>
									{subtitle}
								</div>
							) : null}
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								paddingBottom: "60px",
							}}
						>
							<img
								src={logoBase64}
								alt="Cervo"
								height="40"
								style={{ objectFit: "contain" }}
							/>
						</div>
					</div>,
					{
						width: 1200,
						height: 630,
						fonts: [
							{
								name: "Inter",
								data: fontData,
								weight: 700 as const,
								style: "normal" as const,
							},
						],
						headers: {
							"Cache-Control":
								"public, max-age=86400, s-maxage=31536000, immutable",
						},
					},
				);
			},
		},
	},
});
