import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "~/components/ui/text";
import { X } from "~/lib/icons/icons";
import { cn } from "~/lib/utils";

type TagChipVariant = "available" | "selected" | "removable";

interface TagChipProps {
	readonly label: string;
	readonly variant: TagChipVariant;
	readonly onPress?: () => void;
}

const chipStyles = {
	available: "bg-background border-border px-3",
	selected: "bg-primary/10 border-primary px-3",
	removable: "bg-primary/10 border-primary pl-3 pr-2",
};

const textStyles = {
	available: "text-foreground",
	selected: "text-primary",
	removable: "text-primary mr-2",
};

export function TagChip({ label, variant, onPress }: TagChipProps) {
	return (
		<TouchableOpacity
			className={cn(
				"flex-row items-center rounded-full border py-1",
				chipStyles[variant]
			)}
			onPress={onPress}
		>
			<Text className={cn("text-sm", textStyles[variant])}>{label}</Text>
			{variant === "removable" && <X className="text-primary" size={14} />}
		</TouchableOpacity>
	);
}
