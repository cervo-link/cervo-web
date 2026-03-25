const SITE_URL = "https://cervo.link";

export function ogImageUrl(title: string, subtitle?: string): string {
	const params = new URLSearchParams({ title });
	if (subtitle) {
		params.set("subtitle", subtitle);
	}
	return `${SITE_URL}/api/og?${params.toString()}`;
}
