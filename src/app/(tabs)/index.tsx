import React from "react";
import { ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import "~/global.css";
import { useInsightsWithBooks } from "~/lib/hooks/use-insights-with-books";
import { InsightsList } from "~/features/insights/components/insight-list";
import { SearchBar } from "~/features/insights/components/search-bar";
import { FlexibleCategory, FlexibleTag } from "~/lib/types";

export default function IndexScreen() {
	const { insights } = useInsightsWithBooks();
	const params = useLocalSearchParams<{
		searchQuery?: string;
		selectedCategories?: string;
		selectedTags?: string;
	}>();

	const searchQuery = params.searchQuery || "";

	const selectedCategories: FlexibleCategory[] = React.useMemo(() => {
		try {
			return params.selectedCategories
				? JSON.parse(params.selectedCategories)
				: [];
		} catch {
			return [];
		}
	}, [params.selectedCategories]);

	const selectedTags: FlexibleTag[] = React.useMemo(() => {
		try {
			return params.selectedTags ? JSON.parse(params.selectedTags) : [];
		} catch {
			return [];
		}
	}, [params.selectedTags]);

	const hasActiveFilters = React.useMemo(
		() =>
			selectedCategories.length > 0 ||
			selectedTags.length > 0 ||
			searchQuery.trim().length > 0,
		[selectedCategories.length, selectedTags.length, searchQuery]
	);

	const handleSearchChange = React.useCallback((text: string): void => {
		router.setParams({ searchQuery: text });
	}, []);

	return (
		<View className="flex-1 bg-white p-4 gap-6">
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
	);
}
