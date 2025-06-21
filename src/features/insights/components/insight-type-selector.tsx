import React from "react";
import { View } from "react-native";
import { MessageSquare, Quote, Lightbulb, CircleHelp } from "~/lib/icons/icons";
import type { LucideIcon } from "~/lib/icons/icons";
import { useFieldContext } from "../hooks/form-context";
import type { InsightCategory } from "../types/form-schema";
import { CategoryButton } from "./ui/category-button";

interface InsightTypeOption {
	readonly type: InsightCategory;
	readonly label: string;
	readonly Icon: LucideIcon;
}

const INSIGHT_TYPES: InsightTypeOption[] = [
	{ type: "thought", label: "Thought", Icon: MessageSquare },
	{ type: "quote", label: "Quote", Icon: Quote },
	{ type: "idea", label: "Idea", Icon: Lightbulb },
	{ type: "question", label: "Question", Icon: CircleHelp },
];

export function InsightTypeSelector() {
	const field = useFieldContext<InsightCategory>();

	return (
		<View className="gap-3">
			{/* First Row */}
			<View className="flex-row gap-3">
				{INSIGHT_TYPES.slice(0, 2).map((option) => (
					<CategoryButton
						key={option.type}
						label={option.label}
						Icon={option.Icon}
						isSelected={field.state.value === option.type}
						onPress={() => field.handleChange(option.type)}
					/>
				))}
			</View>

			{/* Second Row */}
			<View className="flex-row gap-3">
				{INSIGHT_TYPES.slice(2, 4).map((option) => (
					<CategoryButton
						key={option.type}
						label={option.label}
						Icon={option.Icon}
						isSelected={field.state.value === option.type}
						onPress={() => field.handleChange(option.type)}
					/>
				))}
			</View>
		</View>
	);
}
