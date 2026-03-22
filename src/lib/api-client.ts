const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export async function apiClient<T>(
	url: string,
	options?: RequestInit,
): Promise<T> {
	const response = await fetch(`${BASE_URL}${url}`, {
		...options,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			...options?.headers,
		},
	})

	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`)
	}

	return response.json() as Promise<T>
}
