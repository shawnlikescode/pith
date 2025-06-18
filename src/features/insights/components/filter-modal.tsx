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
	const params = useLocalSearchParams<{
		searchQuery?: string;
		selectedCategories?: string;
		selectedTags?: string;
	}>();

	const availableCategories = getUniqueCategories(insights);
	const availableTags = getUniqueTags(insights);

	const searchQuery = params.searchQuery || "";
	const selectedCategories: FlexibleCategory[] = params.selectedCategories
		? JSON.parse(params.selectedCategories)
		: [];
	const selectedTags: FlexibleTag[] = params.selectedTags
		? JSON.parse(params.selectedTags)
		: [];

	function handleCategoryToggle(category: FlexibleCategory): void {
		const newCategories = selectedCategories.includes(category)
			? selectedCategories.filter((c) => c !== category)
			: [...selectedCategories, category];

		// Update the URL params for this modal only (for UI state)
		router.setParams({
			selectedCategories: JSON.stringify(newCategories),
		});
	}

	function handleTagToggle(tag: FlexibleTag): void {
		const newTags = selectedTags.includes(tag)
			? selectedTags.filter((t) => t !== tag)
			: [...selectedTags, tag];

		// Update the URL params for this modal only (for UI state)
		router.setParams({
			selectedTags: JSON.stringify(newTags),
		});
	}

	function handleClearAll(): void {
		// Navigate back to main screen with cleared filters
		router.replace({
			pathname: "/(tabs)",
			params: {
				searchQuery: "",
				selectedCategories: JSON.stringify([]),
				selectedTags: JSON.stringify([]),
			},
		});
	}

	function handleApplyFilters(): void {
		// Navigate back to the main screen with the filter params
		router.replace({
			pathname: "/(tabs)",
			params: {
				searchQuery,
				selectedCategories: JSON.stringify(selectedCategories),
				selectedTags: JSON.stringify(selectedTags),
			},
		});
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* Header */}
			<View className="flex-row items-center justify-between p-4 border-b border-blue-200">
				<Text className="text-xl font-semibold">Filter</Text>
				<Button
					variant="ghost"
					size="icon"
					onPress={() =>
						router.replace({
							pathname: "/(tabs)",
							params: {
								searchQuery,
								selectedCategories: JSON.stringify(selectedCategories),
								selectedTags: JSON.stringify(selectedTags),
							},
						})
					}
				>
					<X size={24} className="text-gray-600" />
				</Button>
			</View>

			<ScrollView className="flex-1 p-4" contentContainerStyle={{ gap: 32 }}>
				{/* Category Section */}
				<View>
					<Text className="text-lg font-semibold mb-4">Category</Text>
					<CategoryFilter
						availableCategories={availableCategories}
						selectedCategories={selectedCategories}
						onCategoryToggle={handleCategoryToggle}
					/>
				</View>

				{/* Tags Section */}
				<View>
					<Text className="text-lg font-semibold mb-4">Tags</Text>
					<TagFilter
						availableTags={availableTags}
						selectedTags={selectedTags}
						onTagToggle={handleTagToggle}
					/>
				</View>
			</ScrollView>

			{/* Footer */}
			<View className="p-4 border-t border-blue-200">
				<View className="flex-row gap-3">
					<Button
						variant="outline"
						onPress={handleClearAll}
						className="flex-1 bg-transparent border-blue-200"
					>
						<Text>Clear All</Text>
					</Button>
					<Button onPress={handleApplyFilters} className="flex-1">
						<Text>Apply Filters</Text>
					</Button>
				</View>
			</View>
		</SafeAreaView>
	);
}
