import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import "~/global.css";
import { useInsightsWithBooks } from "~/features/insights/hooks/use-insights-with-books";
import { InsightsList } from "~/features/insights/components/insight-list";
import { SearchBar } from "~/features/insights/components/search-bar";
import type { FlexibleCategory, FlexibleTag } from "~/features/insights/types";

export default function IndexScreen() {
	const { insights, loading } = useInsightsWithBooks();
	const params = useLocalSearchParams<{
		searchQuery?: string;
		selectedCategories?: string;
		selectedTags?: string;
	}>();

	const searchQuery = params.searchQuery || "";

	const selectedCategories: FlexibleCategory[] = (() => {
		try {
			return params.selectedCategories
				? JSON.parse(params.selectedCategories)
				: [];
		} catch {
			return [];
		}
	})();

	const selectedTags: FlexibleTag[] = (() => {
		try {
			return params.selectedTags ? JSON.parse(params.selectedTags) : [];
		} catch {
			return [];
		}
	})();

	const hasActiveFilters =
		selectedCategories.length > 0 ||
		selectedTags.length > 0 ||
		searchQuery.trim().length > 0;

	function handleSearchChange(text: string): void {
		router.setParams({ searchQuery: text });
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="flex-1 pl-4 pr-4 pt-6">
				<SearchBar
					searchQuery={searchQuery}
					onSearchChange={handleSearchChange}
					hasActiveFilters={hasActiveFilters}
					selectedCategories={selectedCategories}
					selectedTags={selectedTags}
					insightsCount={insights.length}
				/>
				<View className="flex-1">
					<InsightsList
						showHeader={false}
						searchQuery={searchQuery}
						categories={selectedCategories}
						tags={selectedTags}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
