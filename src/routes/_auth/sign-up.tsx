import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { GoogleIcon } from '#/components/icons/google'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { authClient } from '#/lib/auth-client'
import { ogImageUrl } from '#/lib/og'

export const Route = createFileRoute('/_auth/sign-up')({
	head: () => ({
		meta: [
			{ title: 'Sign Up — Cervo' },
			{
				name: 'description',
				content: 'Create your Cervo account',
			},
			{ property: 'og:title', content: 'Sign Up — Cervo' },
			{
				property: 'og:description',
				content: 'Create your Cervo account',
			},
			{
				property: 'og:image',
				content: ogImageUrl('Sign Up', 'Start saving bookmarks'),
			},
			{ name: 'twitter:title', content: 'Sign Up — Cervo' },
			{
				name: 'twitter:description',
				content: 'Create your Cervo account',
			},
			{
				name: 'twitter:image',
				content: ogImageUrl('Sign Up', 'Start saving bookmarks'),
			},
		],
	}),
	component: SignUpPage,
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

const ERROR_MESSAGES: Record<string, string> = {
	'User already exists': 'An account with this email already exists.',
	USER_ALREADY_EXISTS: 'An account with this email already exists.',
}

function SignUpPage() {
	const { data: session } = authClient.useSession()
	const navigate = useNavigate()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (session?.user) {
			void navigate({ to: '/links' })
		}
	}, [session, navigate])

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setLoading(true)

		const result = await authClient.signUp.email({
			name,
			email,
			password,
			callbackURL: `${window.location.origin}/callback`,
		})

		if (result.error) {
			const message = result.error.message ?? ''
			setError(
				ERROR_MESSAGES[message] ?? 'Something went wrong. Please try again.'
			)
			setLoading(false)
			return
		}

		void navigate({ to: '/callback' })
	}

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
					CREATE ACCOUNT
				</h2>
				<p className="text-base font-medium tracking-wide text-muted-foreground">
					Start saving and searching your bookmarks
				</p>
			</div>

			{/* registration form */}
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-1.5">
					<Label
						htmlFor="name"
						className="font-mono text-[11px] font-semibold tracking-[0.5px] text-[#6a6a6a]"
					>
						NAME
					</Label>
					<Input
						id="name"
						type="text"
						autoComplete="name"
						required
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder="Your name"
						className="h-11 border-sidebar-border bg-[#0A0A0A] font-mono text-[13px] placeholder:text-[#6a6a6a] focus-visible:border-primary focus-visible:ring-0"
					/>
				</div>

				<div className="space-y-1.5">
					<Label
						htmlFor="email"
						className="font-mono text-[11px] font-semibold tracking-[0.5px] text-[#6a6a6a]"
					>
						EMAIL
					</Label>
					<Input
						id="email"
						type="email"
						autoComplete="email"
						required
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder="you@example.com"
						className="h-11 border-sidebar-border bg-[#0A0A0A] font-mono text-[13px] placeholder:text-[#6a6a6a] focus-visible:border-primary focus-visible:ring-0"
					/>
				</div>

				<div className="space-y-1.5">
					<Label
						htmlFor="password"
						className="font-mono text-[11px] font-semibold tracking-[0.5px] text-[#6a6a6a]"
					>
						PASSWORD
					</Label>
					<Input
						id="password"
						type="password"
						autoComplete="new-password"
						required
						minLength={8}
						value={password}
						onChange={e => setPassword(e.target.value)}
						placeholder="••••••••"
						className="h-11 border-sidebar-border bg-[#0A0A0A] font-mono text-[13px] placeholder:text-[#6a6a6a] focus-visible:border-primary focus-visible:ring-0"
					/>
				</div>

				{error && (
					<p className="font-mono text-[11px] text-destructive">{error}</p>
				)}

				<Button
					type="submit"
					disabled={loading}
					className="h-11 w-full font-mono text-[11px] font-bold tracking-[0.5px]"
				>
					{loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
				</Button>
			</form>

			<p className="text-center font-mono text-[11px] text-[#6a6a6a]">
				Already have an account?{' '}
				<Link to="/sign-in" className="text-primary hover:underline">
					Sign in
				</Link>
			</p>

			{/* social divider */}
			<div className="flex items-center gap-3">
				<div className="h-px flex-1 bg-[#2f2f2f]" />
				<span className="font-mono text-[10px] tracking-[0.5px] text-[#6a6a6a]">
					OR CONTINUE WITH
				</span>
				<div className="h-px flex-1 bg-[#2f2f2f]" />
			</div>

			<div className="space-y-3">
				<Button
					type="button"
					variant="outline"
					size="lg"
					onClick={handleGoogle}
					disabled={loading}
					className="h-11 w-full border-sidebar-border text-foreground hover:border-primary hover:bg-transparent hover:text-foreground"
				>
					<GoogleIcon className="size-4" />
					<span className="font-mono text-[11px] font-bold tracking-[0.5px]">
						GOOGLE
					</span>
				</Button>

				<Button
					type="button"
					variant="outline"
					size="lg"
					onClick={handleGithub}
					disabled={loading}
					className="h-11 w-full border-sidebar-border text-foreground hover:border-primary hover:bg-transparent hover:text-foreground"
				>
					<GithubIcon className="size-4" />
					<span className="font-mono text-[11px] font-bold tracking-[0.5px]">
						GITHUB
					</span>
				</Button>
			</div>
		</div>
	)
}
