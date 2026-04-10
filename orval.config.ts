import { defineConfig } from 'orval'

export default defineConfig({
	cervo: {
		input: {
			target: '../cervo-api/src/infra/http/swagger/spec.json',
			filters: {
				tags: ['service', 'bookmarks', 'members', 'workspaces', 'workspace-integrations', 'invites'],
			},
		},
		output: {
			mode: 'tags-split',
			target: 'src/api',
			client: 'react-query',
			httpClient: 'fetch',
			clean: true,
			override: {
				mutator: {
					path: 'src/lib/api-client.ts',
					name: 'apiClient',
				},
				// Strip /api/v1 prefix from generated function/type names so that
				// names remain stable (e.g. useGetBookmarks, not useGetApiV1Bookmarks).
				// The actual URL strings in the generated code still include /api/v1.
				operationName: (_operation, route, verb) => {
					const cleanRoute = route.replace(/^\/api\/v1/, '')
					const routeName = cleanRoute
						.split('/')
						.filter(Boolean)
						.map((segment) =>
							segment
								// handles both {param} and ${param} (template literal) formats
								.replace(/\$?\{([^}]+)\}/, '$1')
								.replace(/-([a-z])/g, (_, l) => l.toUpperCase())
								.replace(/^[a-z]/, (l) => l.toUpperCase()),
						)
						.join('')
					return `${verb}${routeName}`
				},
			},
		},
	},
})
