import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";
import type { LucideIcon } from "~/lib/icons/icons";
import { ICON_SIZES } from "~/lib/constants";

interface CategoryButtonProps {
	readonly label: string;
	readonly Icon: LucideIcon;
	readonly isSelected: boolean;
	readonly onPress: () => void;
}

export function CategoryButton({
	label,
	Icon,
	isSelected,
	onPress,
}: CategoryButtonProps) {
	return (
		<TouchableOpacity
			className={cn(
				"flex-1 flex-row items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2",
				isSelected
					? "bg-primary/10 border-primary"
					: "bg-background border-border"
			)}
			onPress={onPress}
		>
			<Icon
				size={ICON_SIZES.MEDIUM}
				className={cn(isSelected ? "text-primary" : "text-muted-foreground")}
			/>
			<Text
				className={cn(
					"text-sm font-medium",
					isSelected ? "text-primary" : "text-foreground"
				)}
			>
				{label}
			</Text>
		</TouchableOpacity>
	);
}
