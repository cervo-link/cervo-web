import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import {
	useGetMembersMe,
	useGetMembersMeIdentities,
} from '#/api/members/members'
import { clientEnv } from '#/lib/env'

const searchSchema = z.object({
	discord_success: z.coerce.boolean().optional(),
	discord_error: z.string().optional(),
	discord_user_id: z.string().optional(),
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
	const { discord_success, discord_error, discord_user_id } = Route.useSearch()
	const navigate = useNavigate()
	const { data: membersMeRaw } = useGetMembersMe()
	const member =
		membersMeRaw?.status === 200 ? (membersMeRaw.data.member ?? null) : null

	const { data: identitiesData, refetch: refetchIdentities } =
		useGetMembersMeIdentities()

	const identities =
		identitiesData?.status === 200 ? identitiesData.data.identities : []

	const hasDiscord = identities.some(i => i.provider === 'discord')
	const handledRef = useRef(false)

	useEffect(() => {
		if (handledRef.current) return

		if (discord_user_id) {
			handledRef.current = true
			fetch(`${clientEnv.VITE_API_URL}/api/v1/members/me/identities`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({
					provider: 'discord',
					providerUserId: discord_user_id,
				}),
			})
				.then(res => {
					if (res.status === 201) {
						toast.success('Discord account connected.')
						void refetchIdentities()
					} else if (res.status === 409) {
						toast.error(
							'This Discord account is already linked to your profile.'
						)
					} else if (res.status === 422) {
						toast.error(
							'This Discord account is linked to a different Cervo account.'
						)
					} else {
						toast.error('Failed to connect Discord account.')
					}
				})
				.catch(() => {
					toast.error('Failed to connect Discord account.')
				})
				.finally(() => {
					void navigate({ to: '/account', replace: true })
				})
			return
		}

		if (discord_success) {
			handledRef.current = true
			toast.success('Discord account connected.')
			void refetchIdentities()
			void navigate({ to: '/account', replace: true })
		}
		if (discord_error) {
			handledRef.current = true
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
			void navigate({ to: '/account', replace: true })
		}
	}, [
		discord_success,
		discord_error,
		discord_user_id,
		refetchIdentities,
		navigate,
	])

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
