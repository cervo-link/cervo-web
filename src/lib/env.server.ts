import { z } from 'zod'

const serverEnvSchema = z.object({
	ANTHROPIC_API_KEY: z.string().optional(),
	OPENAI_API_KEY: z.string().optional(),
	GEMINI_API_KEY: z.string().optional(),
	CLIENT_ID: z.string(),
	CLIENT_SECRET: z.string(),
	API_URL: z.url().default('http://localhost:8080'),
	DISCORD_BOT_TOKEN: z.string().optional(),
})

function parseServerEnv() {
	const result = serverEnvSchema.safeParse({
		ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
		GEMINI_API_KEY: process.env.GEMINI_API_KEY,
		CLIENT_ID: process.env.CLIENT_ID,
		CLIENT_SECRET: process.env.CLIENT_SECRET,
		API_URL: process.env.API_URL,
		DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
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
