import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { cn } from "~/lib/utils";
import {
	MessageSquare,
	Quote,
	Lightbulb,
	CircleHelp,
	type LucideIcon,
} from "~/lib/icons/icons";
import { Button } from "~/components/ui/button";
import { useFieldContext } from "../hooks/form-context";
import { type InsightType } from "../types/form-schema";

interface InsightTypeOption {
	type: InsightType;
	label: string;
	Icon: LucideIcon;
}

const INSIGHT_TYPES: InsightTypeOption[] = [
	{ type: "thought", label: "Thought", Icon: MessageSquare },
	{ type: "quote", label: "Quote", Icon: Quote },
	{ type: "idea", label: "Idea", Icon: Lightbulb },
	{ type: "question", label: "Question", Icon: CircleHelp },
];

export function InsightTypeSelector() {
	const field = useFieldContext<InsightType>();

	return (
		<View className="gap-3">
			{/* First Row */}
			<View className="flex-row gap-3">
				{INSIGHT_TYPES.slice(0, 2).map((option) => (
					<InsightTypeButton
						key={option.type}
						option={option}
						isSelected={field.state.value === option.type}
						onPress={() => field.handleChange(option.type)}
					/>
				))}
			</View>

			{/* Second Row */}
			<View className="flex-row gap-3">
				{INSIGHT_TYPES.slice(2, 4).map((option) => (
					<InsightTypeButton
						key={option.type}
						option={option}
						isSelected={field.state.value === option.type}
						onPress={() => field.handleChange(option.type)}
					/>
				))}
			</View>
		</View>
	);
}

interface InsightTypeButtonProps {
	option: InsightTypeOption;
	isSelected: boolean;
	onPress: () => void;
}

function InsightTypeButton({
	option,
	isSelected,
	onPress,
}: InsightTypeButtonProps) {
	const { Icon } = option;

	return (
		<Button
			onPress={onPress}
			className={cn(
				"flex-1 flex-row items-center justify-center rounded-lg border gap-2 pt-3 pb-3",
				isSelected ? "border-blue-500 bg-blue-100" : "border-0 bg-white"
			)}
		>
			<Icon
				size={16}
				className={cn(
					"flex-shrink-0",
					isSelected ? "text-blue-700" : "text-gray-500"
				)}
			/>
			<Text
				className={cn(
					"text-base font-medium leading-none",
					isSelected ? "text-blue-700" : "text-gray-700"
				)}
			>
				{option.label}
			</Text>
		</Button>
	);
}
