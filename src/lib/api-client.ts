import { clientEnv } from '#/lib/env'

const BASE_URL = clientEnv.VITE_API_URL

export async function apiClient<T>(
	url: string,
	options?: RequestInit
): Promise<T> {
	const response = await fetch(`${BASE_URL}${url}`, {
		...options,
		credentials: 'include',
		headers: {
			...(options?.body !== undefined
				? { 'Content-Type': 'application/json' }
				: {}),
			...options?.headers,
		},
	})

	const data = response.status === 204 ? undefined : await response.json()

	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`)
	}

	return { data, status: response.status, headers: response.headers } as T
}
