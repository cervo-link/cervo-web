import {
	CircleCheckIcon,
	InfoIcon,
	Loader2Icon,
	OctagonXIcon,
	TriangleAlertIcon,
} from "lucide-react";
import { toast, Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster({ ...props }: ToasterProps) {
	return (
		<Sonner
			theme="dark"
			className="toaster group"
			icons={{
				success: <CircleCheckIcon className="size-4 text-primary" />,
				info: <InfoIcon className="size-4 text-primary" />,
				warning: <TriangleAlertIcon className="size-4" />,
				error: <OctagonXIcon className="size-4" />,
				loading: <Loader2Icon className="size-4 animate-spin text-primary" />,
			}}
			toastOptions={{
				classNames: {
					toast: "font-mono text-[13px] border-[#2f2f2f] bg-[#141414]",
					title: "text-foreground font-medium",
					description: "text-[#8a8a8a]",
					success: "border-l-[3px] border-l-primary",
					info: "border-l-[3px] border-l-primary",
				},
			}}
			style={
				{
					"--normal-bg": "#141414",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "#2f2f2f",
					"--border-radius": "0px",
				} as React.CSSProperties
			}
			{...props}
		/>
	);
}

export { Toaster, toast };
