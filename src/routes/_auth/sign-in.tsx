import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { GithubIcon } from '#/components/icons/github'
import { GoogleIcon } from '#/components/icons/google'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { authClient } from '#/lib/auth-client'
import { ogImageUrl } from '#/lib/og'

const searchSchema = z.object({
	redirect: z.string().optional(),
})

export const Route = createFileRoute('/_auth/sign-in')({
	validateSearch: searchSchema,
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

function SignInPage() {
	const { redirect } = Route.useSearch()
	const { data: session } = authClient.useSession()
	const navigate = useNavigate()

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

		try {
			const result = await authClient.signIn.email({
				email,
				password,
				callbackURL: `${window.location.origin}/callback`,
			})

			if (result.error) {
				const code = result.error.code
				setError(
					code === 'INVALID_EMAIL_OR_PASSWORD'
						? 'Invalid email or password. If you signed up with Google or GitHub, use those buttons below.'
						: 'Something went wrong. Please try again.'
				)
				return
			}

			const safeRedirect = redirect?.startsWith('/') ? redirect : '/callback'
			void navigate({ to: safeRedirect })
		} finally {
			setLoading(false)
		}
	}

	function handleGoogle() {
		void authClient.signIn.social({
			provider: 'google',
			callbackURL: `${window.location.origin}${redirect ?? '/callback'}`,
		})
	}

	function handleGithub() {
		void authClient.signIn.social({
			provider: 'github',
			callbackURL: `${window.location.origin}${redirect ?? '/callback'}`,
		})
	}

	return (
		<div className="space-y-8">
			<div className="space-y-2">
				<h2 className="font-heading text-5xl font-bold tracking-tight text-foreground">
					WELCOME
				</h2>
				<p className="text-base font-medium tracking-wide text-muted-foreground">
					Sign in to your account
				</p>
			</div>

			{/* email + password form */}
			<form onSubmit={handleSubmit} className="space-y-4">
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
						autoComplete="current-password"
						required
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
					{loading ? 'SIGNING IN...' : 'SIGN IN'}
				</Button>
			</form>

			<p className="text-center font-mono text-[11px] text-[#6a6a6a]">
				Don&apos;t have an account?{' '}
				<Link to="/sign-up" className="text-primary hover:underline">
					Sign up
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
