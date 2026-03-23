import { clientEnv } from "#/lib/env";

const BASE_URL = clientEnv.VITE_API_URL;

export async function apiClient<T>(
	url: string,
	options?: RequestInit,
): Promise<T> {
	const response = await fetch(`${BASE_URL}${url}`, {
		...options,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...options?.headers,
		},
	});

	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`);
	}

	return response.json() as Promise<T>;
}
