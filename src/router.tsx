import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { getContext } from './integrations/tanstack-query/root-provider'
import { routeTree } from './routeTree.gen'

// Use plain URLSearchParams parsing to prevent float64 precision loss on large
// numeric strings (e.g. Discord snowflake IDs). TanStack Router's default
// parseSearch applies JSON.parse to each value, which converts a 64-bit integer
// like "1432067091007012895" to the number 1432067091007012900.
function parseSearch(str: string): Record<string, unknown> {
	const params = new URLSearchParams(str.startsWith('?') ? str.slice(1) : str)
	const result: Record<string, unknown> = {}
	params.forEach((value, key) => {
		result[key] = value
	})
	return result
}

function stringifySearch(search: Record<string, unknown>): string {
	const params = new URLSearchParams()
	for (const [key, value] of Object.entries(search)) {
		if (value != null) params.set(key, String(value))
	}
	const str = params.toString()
	return str ? `?${str}` : ''
}

export function getRouter() {
	const router = createTanStackRouter({
		routeTree,

		context: getContext(),

		scrollRestoration: true,
		defaultPreload: 'intent',
		defaultPreloadStaleTime: 0,
		parseSearch,
		stringifySearch,
	})

	return router
}

declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof getRouter>
	}
}
