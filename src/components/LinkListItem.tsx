import { cn } from "#/lib/utils";

interface LinkListItemProps {
	title: string;
	description: string;
	url: string;
	tag: string;
	badge: string;
	isSelected: boolean;
	onMouseEnter: () => void;
	onClick: () => void;
}

export function LinkListItem({
	title,
	description,
	url,
	tag,
	badge,
	isSelected,
	onMouseEnter,
	onClick,
}: LinkListItemProps) {
	return (
		<button
			type="button"
			data-link-list-item
			onMouseEnter={onMouseEnter}
			onClick={onClick}
			className={cn(
				"flex w-full cursor-pointer items-center gap-4 border border-transparent py-4 pl-4 text-left outline-none transition-colors focus-visible:border-primary",
				isSelected && "shadow-[inset_3px_0_0_0_var(--color-primary)]",
			)}
		>
			<div className="flex min-w-0 flex-1 flex-col gap-1.5">
				<span className="font-heading text-lg font-medium text-foreground">
					{title}
				</span>
				<span className="truncate font-sans text-xs leading-relaxed text-[#8a8a8a]">
					{description}
				</span>
				<span className="font-mono text-[11px] font-normal text-[#6a6a6a]">
					{url}
				</span>
			</div>
			<div className="flex items-center gap-2">
				<span
					className={cn(
						"inline-flex h-[22px] items-center border px-2 font-mono text-[9px] font-bold uppercase tracking-[0.5px]",
						isSelected
							? "border-[#00FF8840] text-primary"
							: "border-[#2f2f2f] text-[#6a6a6a]",
					)}
				>
					{tag}
				</span>
				<span
					className={cn(
						"inline-flex h-[22px] items-center px-2 font-mono text-[9px] font-bold tracking-[0.5px]",
						isSelected ? "text-primary" : "text-[#6a6a6a]",
					)}
				>
					{badge}
				</span>
			</div>
		</button>
	);
}
