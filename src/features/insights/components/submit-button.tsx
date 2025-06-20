import React from "react";
import { Text } from "react-native";
import { cn } from "~/lib/utils";
import { useFormContext } from "../hooks/form-context";
import { Button } from "~/components/ui/button";

interface SubmitButtonProps {
	readonly label: string;
	readonly loadingLabel?: string;
	readonly className?: string;
}

export function SubmitButton({
	label,
	loadingLabel = "Saving...",
	className,
}: SubmitButtonProps) {
	const form = useFormContext();

	return (
		<form.Subscribe
			selector={(state) => state.isSubmitting}
			children={(isSubmitting) => (
				<Button
					onPress={form.handleSubmit}
					disabled={isSubmitting}
					className={cn(
						"w-full rounded-xl bg-primary h-14",
						isSubmitting && "opacity-50",
						className
					)}
				>
					<Text className="text-primary-foreground text-center text-lg font-semibold">
						{isSubmitting ? loadingLabel : label}
					</Text>
				</Button>
			)}
		/>
	);
}
