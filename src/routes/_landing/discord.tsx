import { createFileRoute, redirect } from '@tanstack/react-router'

// TODO: Replace with actual Discord invite URL before shipping
const DISCORD_INVITE_URL = 'https://discord.gg/YOUR_INVITE_CODE'

export const Route = createFileRoute('/_landing/discord')({
	beforeLoad: () => {
		throw redirect({ href: DISCORD_INVITE_URL })
	},
	component: DiscordRedirect,
})

function DiscordRedirect() {
	return (
		<div className="mx-auto flex max-w-3xl items-center justify-center px-6 py-24">
			<p className="font-sans text-base text-[#A3A3A3]">
				Redirecting to Discord...
			</p>
		</div>
	)
}
