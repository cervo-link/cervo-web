import { Check } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useScrollAnimation } from "./use-scroll-animation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSection() {
	const { ref, isVisible } = useScrollAnimation();
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			if (!email.trim()) {
				setError("Please enter your email address.");
				return;
			}

			if (!EMAIL_REGEX.test(email)) {
				setError("Please enter a valid email address.");
				return;
			}

			setError("");
			setSubmitted(true);

			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}

			timerRef.current = setTimeout(() => {
				setSubmitted(false);
				setEmail("");
			}, 3000);
		},
		[email],
	);

	return (
		<section
			ref={ref}
			className={`flex flex-col items-center gap-6 px-6 py-10 transition-all duration-700 lg:px-0 lg:py-[60px] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
		>
			<h2 className="text-center font-sans text-2xl font-bold text-white lg:text-[28px]">
				Stay in the loop
			</h2>
			<p className="text-center font-sans text-sm text-[#8a8a8a]">
				Get updates on new features and integrations. No spam, we promise.
			</p>
			<form
				onSubmit={handleSubmit}
				className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-start lg:gap-4"
			>
				<div className="flex w-full flex-col gap-1.5 lg:w-[340px]">
					<input
						type="email"
						placeholder="Your e-mail address"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							if (error) {
								setError("");
							}
						}}
						onBlur={() => setError("")}
						className={`h-11 w-full rounded-full border bg-[#141414] px-6 font-sans text-sm text-white shadow-[0_4px_4px_rgba(0,0,0,0.05)] outline-none placeholder:text-[#6a6a6a] focus:border-primary ${error ? "border-red-500" : "border-[#3f3f3f]"}`}
					/>
					{error && (
						<span className="px-4 font-sans text-xs text-red-500">{error}</span>
					)}
				</div>
				<button
					type="submit"
					disabled={submitted}
					className="relative h-11 w-full overflow-hidden rounded-full bg-primary px-8 font-sans text-sm font-bold text-[#0C0C0C] transition-opacity hover:opacity-90 disabled:opacity-90 lg:w-auto"
				>
					<span
						className={`flex items-center justify-center transition-all duration-300 ${submitted ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
					>
						Subscribe
					</span>
					<span
						className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${submitted ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
					>
						<Check className="size-5 text-[#0C0C0C]" strokeWidth={3} />
					</span>
				</button>
			</form>
		</section>
	);
}
