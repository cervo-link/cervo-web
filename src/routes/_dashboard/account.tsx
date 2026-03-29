import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { useGetMembersMe } from '#/api/members/members'
import { apiClient } from '#/lib/api-client'
import { clientEnv } from '#/lib/env'

const searchSchema = z.object({
	discord_success: z.string().optional(),
	discord_error: z.string().optional(),
})

export const Route = createFileRoute('/_dashboard/account')({
	validateSearch: searchSchema,
	head: () => ({
		meta: [
			{ title: 'Account — Cervo' },
			{ name: 'description', content: 'Manage your Cervo account' },
		],
	}),
	component: AccountPage,
})

type Identity = {
	id: string
	memberId: string
	provider: string
	providerUserId: string
	createdAt: string
}

const PROVIDER_LABELS: Record<string, string> = {
	discord: 'Discord',
	github: 'GitHub',
	google: 'Google',
}

function buildDiscordIdentityUrl(): string {
	const params = new URLSearchParams({
		client_id: clientEnv.VITE_CLIENT_ID,
		scope: 'identify',
		redirect_uri: `${window.location.origin}/discord/identity-callback`,
		response_type: 'code',
	})
	return `https://discord.com/oauth2/authorize?${params.toString()}`
}

function SectionLabel({ children }: { children: React.ReactNode }) {
	return (
		<span className="font-mono text-[11px] font-semibold tracking-[0.5px] text-[#6a6a6a]">
			{children}
		</span>
	)
}

function AccountPage() {
	const { discord_success, discord_error } = Route.useSearch()
	const { data: membersMeRaw } = useGetMembersMe()
	const member =
		membersMeRaw?.status === 200 ? (membersMeRaw.data.member ?? null) : null

	const { data: identitiesData, refetch: refetchIdentities } = useQuery({
		queryKey: ['/members/me/identities'],
		queryFn: () =>
			apiClient<{ data: { identities: Identity[] }; status: number }>(
				'/members/me/identities'
			),
	})

	const identities =
		identitiesData?.status === 200 ? identitiesData.data.identities : []

	const hasDiscord = identities.some(i => i.provider === 'discord')

	useEffect(() => {
		if (discord_success) {
			toast.success('Discord account connected.')
			void refetchIdentities()
		}
		if (discord_error) {
			const messages: Record<string, string> = {
				cancelled: 'Discord authorization was cancelled.',
				exchange_failed: 'Failed to complete Discord authorization.',
				user_failed: 'Failed to retrieve your Discord account.',
				already_linked:
					'This Discord account is already linked to your profile.',
				different_account:
					'This Discord account is linked to a different Cervo account.',
				link_failed: 'Failed to connect Discord account.',
			}
			toast.error(messages[discord_error] ?? 'Something went wrong.')
		}
	}, [discord_success, discord_error, refetchIdentities])

	return (
		<div className="flex h-full flex-col gap-10 p-8 md:px-10">
			<div className="flex flex-col gap-3">
				<h1 className="font-heading text-[42px] font-bold leading-none tracking-tight text-foreground">
					Account
				</h1>
				<p className="font-mono text-[14px] text-[#8a8a8a]">
					Manage your profile and connected accounts.
				</p>
			</div>

			<div className="flex max-w-2xl flex-col gap-10">
				{/* PROFILE */}
				<div className="flex flex-col gap-4">
					<SectionLabel>PROFILE</SectionLabel>
					<div className="border border-[#2f2f2f] bg-[#0A0A0A] p-5">
						<div className="flex items-center gap-4">
							<div className="flex size-10 items-center justify-center bg-[#1A1A1A]">
								<span className="font-mono text-[14px] font-semibold text-[#00FF88]">
									{(member?.name ?? member?.email ?? '?')[0].toUpperCase()}
								</span>
							</div>
							<div className="flex flex-col gap-0.5">
								<span className="font-mono text-[13px] font-semibold tracking-[0.5px] text-foreground">
									{member?.name ?? member?.username ?? 'Unknown'}
								</span>
								<span className="font-mono text-[11px] text-[#6a6a6a]">
									{member?.email ?? ''}
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* CONNECTED ACCOUNTS */}
				<div className="flex flex-col gap-4">
					<SectionLabel>CONNECTED ACCOUNTS</SectionLabel>
					<div className="border border-[#2f2f2f] bg-[#0A0A0A] p-5">
						<div className="flex flex-col gap-4">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center bg-[#5865F2]">
									<span className="font-mono text-base font-bold text-white">
										D
									</span>
								</div>
								<div className="flex flex-1 flex-col gap-0.5">
									<span className="font-mono text-[13px] font-semibold tracking-[0.5px] text-foreground">
										Discord
									</span>
									<span className="font-mono text-[11px] text-[#6a6a6a]">
										{hasDiscord
											? 'Connected — your Discord activity is linked to this account'
											: 'Link your Discord account to merge activity'}
									</span>
								</div>
								{!hasDiscord && (
									<button
										type="button"
										onClick={() => {
											window.location.href = buildDiscordIdentityUrl()
										}}
										className="flex h-11 items-center border border-sidebar-border bg-[#141414] px-5 font-mono text-[11px] font-bold tracking-[0.5px] text-foreground transition-colors hover:border-primary"
									>
										CONNECT
									</button>
								)}
								{hasDiscord && (
									<div className="flex h-11 items-center border border-[#00FF8830] bg-[#00FF8808] px-4">
										<span className="font-mono text-[11px] font-bold tracking-[0.5px] text-[#00FF88]">
											CONNECTED
										</span>
									</div>
								)}
							</div>
						</div>
					</div>

					{identities.length > 0 && (
						<div className="flex flex-col gap-1">
							{identities.map(identity => (
								<div
									key={identity.id}
									className="flex items-center justify-between border border-[#2f2f2f] bg-[#0A0A0A] px-4 py-3"
								>
									<span className="font-mono text-[12px] text-[#8a8a8a]">
										{PROVIDER_LABELS[identity.provider] ?? identity.provider}
									</span>
									<span className="font-mono text-[11px] text-[#6a6a6a]">
										{identity.providerUserId}
									</span>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
