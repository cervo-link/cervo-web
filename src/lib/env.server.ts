import { z } from 'zod'

const serverEnvSchema = z.object({
	CLIENT_SECRET: z.string(),
})

function parseServerEnv() {
	const result = serverEnvSchema.safeParse({
		CLIENT_SECRET: process.env.CLIENT_SECRET,
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
