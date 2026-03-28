import { z } from 'zod'

const clientEnvSchema = z.object({
	VITE_API_URL: z.url().default('http://localhost:8080'),
})

function parseClientEnv() {
	const result = clientEnvSchema.safeParse({
		VITE_API_URL: import.meta.env.VITE_API_URL,
	})

	if (!result.success) {
		console.error(
			'Invalid client environment variables:',
			result.error.format()
		)
		throw new Error('Invalid client environment variables')
	}

	return result.data
}

export const clientEnv = parseClientEnv()
