import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface LandingButtonProps {
	children: ReactNode;
	variant?: "primary" | "secondary";
	size?: "sm" | "md";
	href?: string;
	icon?: ReactNode;
	onClick?: () => void;
	className?: string;
}

const variantStyles = {
	primary:
		"bg-primary text-[#0C0C0C] no-underline transition-opacity hover:opacity-90",
	secondary: "bg-[#1A1A1A] text-[#E5E5E5] transition-colors hover:bg-[#222]",
} as const;

const sizeStyles = {
	sm: "rounded-[20px] px-5 py-2 text-[13px]",
	md: "rounded-[24px] px-8 py-3.5 text-base",
} as const;

export function LandingButton({
	children,
	variant = "primary",
	size = "md",
	href,
	icon,
	onClick,
	className = "",
}: LandingButtonProps) {
	const baseClasses = `flex items-center justify-center gap-2 whitespace-nowrap font-sans font-semibold ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

	if (href) {
		return (
			<Link to={href} className={baseClasses}>
				{icon}
				{children}
			</Link>
		);
	}

	return (
		<button type="button" className={baseClasses} onClick={onClick}>
			{icon}
			{children}
		</button>
	);
}
