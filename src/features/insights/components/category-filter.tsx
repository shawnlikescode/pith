import React from "react";
import { View } from "react-native";
import {
	MessageSquare,
	Quote,
	Lightbulb,
	CircleHelp,
	type LucideIcon,
} from "~/lib/icons/icons";
import type { FlexibleCategory } from "../types";
import { CategoryButton } from "./ui/category-button";

interface CategoryOption {
	category: FlexibleCategory;
	label: string;
	Icon: LucideIcon;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
	{ category: "thought", label: "Thought", Icon: MessageSquare },
	{ category: "quote", label: "Quote", Icon: Quote },
	{ category: "idea", label: "Idea", Icon: Lightbulb },
	{ category: "question", label: "Question", Icon: CircleHelp },
];

interface CategoryFilterProps {
	availableCategories: FlexibleCategory[];
	selectedCategories: FlexibleCategory[];
	onCategoryToggle: (category: FlexibleCategory) => void;
}

export function CategoryFilter({
	availableCategories,
	selectedCategories,
	onCategoryToggle,
}: CategoryFilterProps) {
	// Filter to only show available categories
	const availableOptions = CATEGORY_OPTIONS.filter((option) =>
		availableCategories.includes(option.category)
	);

	return (
		<View className="gap-3">
			{/* First Row */}
			<View className="flex-row gap-3">
				{availableOptions.slice(0, 2).map((option) => (
					<CategoryButton
						key={option.category}
						label={option.label}
						Icon={option.Icon}
						isSelected={selectedCategories.includes(option.category)}
						onPress={() => onCategoryToggle(option.category)}
					/>
				))}
			</View>

			{/* Second Row */}
			{availableOptions.length > 2 && (
				<View className="flex-row gap-3">
					{availableOptions.slice(2, 4).map((option) => (
						<CategoryButton
							key={option.category}
							label={option.label}
							Icon={option.Icon}
							isSelected={selectedCategories.includes(option.category)}
							onPress={() => onCategoryToggle(option.category)}
						/>
					))}
					{/* Fill remaining space if odd number */}
					{availableOptions.length === 3 && <View className="flex-1" />}
				</View>
			)}
		</View>
	);
}
