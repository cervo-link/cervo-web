import { defineConfig } from 'orval'

export default defineConfig({
	cervo: {
		input: {
			target: '../cervo-api/src/infra/http/swagger/spec.json',
			filters: {
				tags: ['service', 'bookmarks', 'members', 'workspaces', 'workspace-integrations'],
			},
		},
		output: {
			mode: 'tags-split',
			target: 'src/api',
			client: 'react-query',
			httpClient: 'fetch',
			clean: true,
			biome: true,
			override: {
				mutator: {
					path: 'src/lib/api-client.ts',
					name: 'apiClient',
				},
			},
		},
	},
})
