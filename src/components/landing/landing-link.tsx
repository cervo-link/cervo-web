import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface LandingLinkProps {
	children: ReactNode
	href?: string
	icon?: ReactNode
	iconPosition?: 'left' | 'right'
	size?: 'sm' | 'md' | 'lg'
	onClick?: () => void
}

const sizeStyles = {
	sm: 'text-[13px] gap-1',
	md: 'text-base gap-1.5',
	lg: 'text-lg gap-1.5',
} as const

const iconSizes = {
	sm: 'h-3.5 w-3.5',
	md: 'h-4 w-4',
	lg: 'h-4 w-4',
} as const

export function LandingLink({
	children,
	href,
	icon,
	iconPosition = 'right',
	size = 'md',
	onClick,
}: LandingLinkProps) {
	const classes = `group flex items-center ${sizeStyles[size]} font-sans font-bold text-primary no-underline`

	const iconClasses = `${iconSizes[size]} text-primary transition-transform duration-200 ${
		iconPosition === 'right'
			? 'group-hover:translate-x-0.5'
			: 'group-hover:-translate-x-0.5'
	}`

	const resolvedIcon = icon ?? <ChevronRight className={iconClasses} />

	const wrappedIcon = icon ? (
		<span className="inline-flex">{icon}</span>
	) : (
		resolvedIcon
	)

	const labelClasses =
		iconPosition === 'left'
			? 'transition-transform duration-200 group-hover:translate-x-0.5'
			: ''

	const content = (
		<>
			{iconPosition === 'left' && wrappedIcon}
			<span className={labelClasses}>{children}</span>
			{iconPosition === 'right' && wrappedIcon}
		</>
	)

	if (href) {
		return (
			<a href={href} className={classes}>
				{content}
			</a>
		)
	}

	return (
		<button type="button" className={classes} onClick={onClick}>
			{content}
		</button>
	)
}
