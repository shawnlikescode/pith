import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { cn } from "~/lib/utils";
import { useFormContext } from "../hooks/form-context";
import { Button } from "~/components/ui/button";

interface SubmitButtonProps {
	label: string;
	loadingLabel?: string;
	className?: string;
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
						"mt-6 mb-8 pt-4 pb-4 rounded-md bg-blue-400",
						isSubmitting ? "opacity-50" : "opacity-100",
						className
					)}
				>
					<Text className="text-white text-center text-lg font-semibold">
						{isSubmitting ? loadingLabel : label}
					</Text>
				</Button>
			)}
		/>
	);
}
