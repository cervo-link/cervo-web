import { z } from "zod";

const serverEnvSchema = z.object({
	ANTHROPIC_API_KEY: z.string().optional(),
	OPENAI_API_KEY: z.string().optional(),
	GEMINI_API_KEY: z.string().optional(),
});

function parseServerEnv() {
	const result = serverEnvSchema.safeParse({
		ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
		GEMINI_API_KEY: process.env.GEMINI_API_KEY,
	});

	if (!result.success) {
		console.error(
			"Invalid server environment variables:",
			result.error.format(),
		);
		throw new Error("Invalid server environment variables");
	}

	return result.data;
}

export const serverEnv = parseServerEnv();
