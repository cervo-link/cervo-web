import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

function Toaster({ ...props }: ToasterProps) {
	return (
		<Sonner
			theme="dark"
			closeButton
			style={{ '--border-radius': '0px' } as React.CSSProperties}
			icons={{
				success: <CircleCheck size={18} className="text-[#00FF88]" />,
				error: <CircleAlert size={18} className="text-[#FF4444]" />,
				warning: <TriangleAlert size={18} className="text-[#FF8800]" />,
				info: <Info size={18} className="text-[#3b82f6]" />,
			}}
			toastOptions={{
				classNames: {
					toast: '!rounded-none !shadow-none font-mono !py-[14px] !px-[18px] !gap-3 border border-[#2f2f2f] bg-[#0A0A0A]',
					title: 'font-mono text-[11px] font-bold tracking-[0.5px] text-foreground',
					description: 'font-mono text-[11px] font-medium text-[#8a8a8a]',
					success:
						'!bg-[#00FF8810] !border-[#00FF88] [&_[data-title]]:text-[#00FF88] [&_[data-close-button]]:text-[#00FF88] [&_[data-close-button]]:border-[#00FF8840]',
					error: '!bg-[#FF444410] !border-[#FF4444] [&_[data-title]]:text-[#FF4444] [&_[data-close-button]]:text-[#FF4444] [&_[data-close-button]]:border-[#FF444440]',
					warning:
						'!bg-[#141414] !border-[#FF880020] [&_[data-title]]:text-[#FF8800] [&_[data-close-button]]:text-[#6a6a6a] [&_[data-close-button]]:border-[#2f2f2f]',
					info: '!bg-[#3b82f610] !border-[#3b82f6] [&_[data-title]]:text-[#3b82f6] [&_[data-close-button]]:text-[#3b82f6] [&_[data-close-button]]:border-[#3b82f640]',
					closeButton:
						'!rounded-none !w-7 !h-7 bg-transparent border border-[#2f2f2f] text-[#6a6a6a]',
				},
			}}
			{...props}
		/>
	)
}

export { Toaster }
