import React from "react";
import { View, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { X } from "~/lib/icons/icons";
import { useInsightsWithBooks } from "~/lib/hooks/use-insights-with-books";
import { getUniqueCategories, getUniqueTags } from "../utils/data-utils";
import { CategoryFilter } from "./category-filter";
import { TagFilter } from "./tag-filter";
import type { FlexibleCategory, FlexibleTag } from "~/lib/types";

export function FilterModal() {
	const { insights } = useInsightsWithBooks();
	const { categories, tags } = useLocalSearchParams<{
		categories?: string;
		tags?: string;
	}>();

	// Parse URL parameters
	const selectedCategories: FlexibleCategory[] = React.useMemo(() => {
		try {
			return categories ? JSON.parse(categories) : [];
		} catch {
			return [];
		}
	}, [categories]);

	const selectedTags: FlexibleTag[] = React.useMemo(() => {
		try {
			return tags ? JSON.parse(tags) : [];
		} catch {
			return [];
		}
	}, [tags]);

	const availableCategories = getUniqueCategories(insights);
	const availableTags = getUniqueTags(insights);

	function handleCategoryToggle(category: FlexibleCategory): void {
		const newCategories = selectedCategories.includes(category)
			? selectedCategories.filter((c) => c !== category)
			: [...selectedCategories, category];

		router.setParams({
			categories:
				newCategories.length > 0 ? JSON.stringify(newCategories) : undefined,
		});
	}

	function handleTagToggle(tag: FlexibleTag): void {
		const newTags = selectedTags.includes(tag)
			? selectedTags.filter((t) => t !== tag)
			: [...selectedTags, tag];

		router.setParams({
			tags: newTags.length > 0 ? JSON.stringify(newTags) : undefined,
		});
	}

	function handleClearAll(): void {
		// Clear all filters and go back to main screen
		router.push({
			pathname: "/(tabs)/",
			params: {
				q: undefined,
				categories: undefined,
				tags: undefined,
			},
		});
	}

	function handleClose(): void {
		// Navigate to index screen with current filter parameters
		const filterParams = {
			...(categories && { categories }),
			...(tags && { tags }),
		};

		router.replace({
			pathname: "/",
			params: filterParams,
		});
	}

	const hasActiveFilters =
		selectedCategories.length > 0 || selectedTags.length > 0;

	return (
		<SafeAreaView className="flex-1 bg-background">
			{/* Header */}
			<View className="flex-row items-center justify-between p-4 border-b border-border">
				<Text className="text-xl font-semibold text-foreground">
					Filter Insights
				</Text>
				<Button variant="ghost" size="icon" onPress={handleClose}>
					<X size={24} className="text-muted-foreground" />
				</Button>
			</View>

			<ScrollView className="flex-1 p-4" contentContainerStyle={{ gap: 32 }}>
				{/* Category Section */}
				<View>
					<Text className="text-lg font-semibold mb-4 text-foreground">
						Category
					</Text>
					<CategoryFilter
						availableCategories={availableCategories}
						selectedCategories={selectedCategories}
						onCategoryToggle={handleCategoryToggle}
					/>
				</View>

				{/* Tags Section */}
				<View>
					<Text className="text-lg font-semibold mb-4 text-foreground">
						Tags
					</Text>
					<TagFilter
						availableTags={availableTags}
						selectedTags={selectedTags}
						onTagToggle={handleTagToggle}
					/>
				</View>
			</ScrollView>

			{/* Footer */}
			<View className="p-4 border-t border-border">
				<View className="flex-row gap-3">
					<Button
						variant="outline"
						onPress={handleClearAll}
						className="flex-1"
						disabled={!hasActiveFilters}
					>
						<Text className="text-foreground">Clear All</Text>
					</Button>
					<Button onPress={handleClose} className="flex-1">
						<Text className="text-primary-foreground">Done</Text>
					</Button>
				</View>
			</View>
		</SafeAreaView>
	);
}
