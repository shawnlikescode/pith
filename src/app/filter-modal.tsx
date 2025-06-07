import React from "react";
import { View, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { X } from "~/lib/icons/icons";
import { useInsightsWithBooks } from "~/features/insights/hooks/use-insights-with-books";
import {
	getUniqueCategories,
	getUniqueTags,
} from "~/features/insights/utils/data-utils";
import { CategoryFilter } from "~/features/insights/components/category-filter";
import { TagFilter } from "~/features/insights/components/tag-filter";
import type { FlexibleCategory, FlexibleTag } from "~/features/insights/types";

export default function FilterModal() {
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

	const handleCategoryToggle = (category: FlexibleCategory) => {
		const newCategories = selectedCategories.includes(category)
			? selectedCategories.filter((c) => c !== category)
			: [...selectedCategories, category];

		// Update the URL params for this modal only (for UI state)
		router.setParams({
			selectedCategories: JSON.stringify(newCategories),
		});
	};

	const handleTagToggle = (tag: FlexibleTag) => {
		const newTags = selectedTags.includes(tag)
			? selectedTags.filter((t) => t !== tag)
			: [...selectedTags, tag];

		// Update the URL params for this modal only (for UI state)
		router.setParams({
			selectedTags: JSON.stringify(newTags),
		});
	};

	const handleClearAll = () => {
		// Navigate back to main screen with cleared filters
		router.replace({
			pathname: "/(tabs)",
			params: {
				searchQuery: "",
				selectedCategories: JSON.stringify([]),
				selectedTags: JSON.stringify([]),
			},
		});
	};

	const handleApplyFilters = () => {
		// Navigate back to the main screen with the filter params
		router.replace({
			pathname: "/(tabs)",
			params: {
				searchQuery,
				selectedCategories: JSON.stringify(selectedCategories),
				selectedTags: JSON.stringify(selectedTags),
			},
		});
	};

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

			<ScrollView className="flex-1 p-4">
				{/* Category Section */}
				<View className="mb-8">
					<Text className="text-lg font-semibold mb-4">Category</Text>
					<CategoryFilter
						availableCategories={availableCategories}
						selectedCategories={selectedCategories}
						onCategoryToggle={handleCategoryToggle}
					/>
				</View>

				{/* Tags Section */}
				<View className="mb-8">
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
