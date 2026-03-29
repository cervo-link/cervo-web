import { z } from 'zod'

const serverEnvSchema = z.object({
	CLIENT_ID: z.string(),
	CLIENT_SECRET: z.string(),
	API_URL: z.url().default('http://localhost:8080'),
})

function parseServerEnv() {
	const result = serverEnvSchema.safeParse({
		CLIENT_ID: process.env.CLIENT_ID,
		CLIENT_SECRET: process.env.CLIENT_SECRET,
		API_URL: process.env.API_URL,
	})

	if (!result.success) {
		console.error(
			'Invalid server environment variables:',
			result.error.format()
		)
		throw new Error('Invalid server environment variables')
	}

	return result.data
}

export const serverEnv = parseServerEnv()
