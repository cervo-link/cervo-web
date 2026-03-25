import { createFileRoute } from "@tanstack/react-router";
import { ImageResponse } from "@vercel/og";

export const Route = createFileRoute("/api/og")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const url = new URL(request.url);
				const rawTitle = url.searchParams.get("title") || "Cervo";
				const rawSubtitle = url.searchParams.get("subtitle") || "";

				const title = rawTitle.slice(0, 80);
				const subtitle = rawSubtitle.slice(0, 120);

				const baseUrl = new URL("/", request.url);
				const [boldItalicFontData, logoData] = await Promise.all([
					fetch(new URL("/JetBrainsMono-BoldItalic.ttf", baseUrl)).then(
						(res) => res.arrayBuffer(),
					),
					fetch(new URL("/cervo-og.png", baseUrl)).then((res) =>
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
							fontFamily: "JetBrains Mono",
							gap: "28px",
						}}
					>
						<div
							style={{
								fontSize: "100px",
								fontWeight: 700,
								fontStyle: "italic",
								textAlign: "center",
								lineHeight: 1.05,
								maxWidth: "1000px",
							}}
						>
							{title}
						</div>
						{subtitle ? (
							<div
								style={{
									fontSize: "48px",
									fontStyle: "italic",
									color: "#ffffff",
									textAlign: "center",
									maxWidth: "900px",
									lineHeight: 1.2,
								}}
							>
								{subtitle}
							</div>
						) : null}
						<img
							src={logoBase64}
							alt="Cervo"
							width={228}
							height={70}
							style={{ marginTop: "12px" }}
						/>
					</div>,
					{
						width: 1200,
						height: 630,
						fonts: [
							{
								name: "JetBrains Mono",
								data: boldItalicFontData,
								weight: 700 as const,
								style: "italic" as const,
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
