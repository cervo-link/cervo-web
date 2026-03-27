import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { GoogleIcon } from '#/components/icons/google'
import { Button } from '#/components/ui/button'
import { authClient } from '#/lib/auth-client'
import { ogImageUrl } from '#/lib/og'

export const Route = createFileRoute('/_auth/sign-in')({
	head: () => ({
		meta: [
			{ title: 'Sign In — Cervo' },
			{
				name: 'description',
				content: 'Sign in to your Cervo account',
			},
			{ property: 'og:title', content: 'Sign In — Cervo' },
			{
				property: 'og:description',
				content: 'Sign in to your Cervo account',
			},
			{
				property: 'og:image',
				content: ogImageUrl('Sign In', 'Access your bookmarks'),
			},
			{ name: 'twitter:title', content: 'Sign In — Cervo' },
			{
				name: 'twitter:description',
				content: 'Sign in to your Cervo account',
			},
			{
				name: 'twitter:image',
				content: ogImageUrl('Sign In', 'Access your bookmarks'),
			},
		],
	}),
	component: SignInPage,
})

function GithubIcon({ className }: { className?: string }) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M12 0.297C5.372 0.297 0 5.669 0 12.297c0 5.302 3.438 9.8 8.205 11.387 0.6 0.111 0.82-0.26 0.82-0.577 0-0.285-0.01-1.04-0.016-2.04-3.338 0.726-4.042-1.61-4.042-1.61-0.546-1.387-1.333-1.756-1.333-1.756-1.089-0.745 0.084-0.73 0.084-0.73 1.205 0.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495 0.997 0.108-0.775 0.418-1.305 0.762-1.605-2.665-0.303-5.467-1.332-5.467-5.93 0-1.31 0.468-2.382 1.236-3.221-0.124-0.303-0.536-1.524 0.117-3.176 0 0 1.008-0.323 3.3 1.23a11.49 11.49 0 0 1 3.003-0.404c1.018 0.005 2.044 0.138 3.003 0.404 2.29-1.553 3.296-1.23 3.296-1.23 0.656 1.653 0.244 2.874 0.12 3.176 0.77 0.84 1.234 1.912 1.234 3.221 0 4.61-2.807 5.624-5.48 5.922 0.43 0.371 0.814 1.103 0.814 2.222 0 1.606-0.014 2.902-0.014 3.296 0 0.32 0.216 0.694 0.825 0.576C20.565 22.093 24 17.597 24 12.297 24 5.669 18.627 0.297 12 0.297z" />
		</svg>
	)
}

function SignInPage() {
	const { data: session } = authClient.useSession()
	const navigate = useNavigate()

	useEffect(() => {
		if (session?.user) {
			void navigate({ to: '/links' })
		}
	}, [session, navigate])

	function handleGoogle() {
		void authClient.signIn.social({
			provider: 'google',
			callbackURL: `${window.location.origin}/callback`,
		})
	}

	function handleGithub() {
		void authClient.signIn.social({
			provider: 'github',
			callbackURL: `${window.location.origin}/callback`,
		})
	}

	return (
		<div className="space-y-8">
			<div className="space-y-2">
				<h2 className="font-heading text-5xl font-bold tracking-tight text-foreground">
					WELCOME
				</h2>
				<p className="text-base font-medium tracking-wide text-muted-foreground">
					Select your provider and sign in
				</p>
			</div>

			<div className="space-y-3">
				<Button
					variant="outline"
					size="lg"
					onClick={handleGoogle}
					className="h-12 w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
				>
					<GoogleIcon className="size-4" />
					<span className="text-sm font-bold tracking-wide">GOOGLE</span>
				</Button>

				<Button
					variant="outline"
					size="lg"
					onClick={handleGithub}
					className="h-12 w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
				>
					<GithubIcon className="size-4" />
					<span className="text-sm font-bold tracking-wide">GITHUB</span>
				</Button>
			</div>
		</div>
	)
}
