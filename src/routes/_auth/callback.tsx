import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { usePostMembersSync } from '#/api/members/members'

export const Route = createFileRoute('/_auth/callback')({
	component: CallbackPage,
})

function CallbackPage() {
	const navigate = useNavigate()
	const { mutateAsync: syncMember } = usePostMembersSync()

	useEffect(() => {
		syncMember()
			.catch(() => {})
			.finally(() => {
				void navigate({ to: '/links', replace: true })
			})
	}, [syncMember, navigate])

	return null
}
