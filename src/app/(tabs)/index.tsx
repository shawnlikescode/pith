import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Text } from "~/components/ui/text";
import "~/global.css";
import { useInsightsWithBooks } from "~/features/insights/hooks/use-insights-with-books";
import InsightsList from "~/features/insights/components/insight-list";
import { Input } from "~/components/ui/input";
import { BookOpen, Search, Filter } from "~/lib/icons/icons";
import { cn } from "~/lib/utils";
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

	const handleSearchChange = (text: string) => {
		router.setParams({ searchQuery: text });
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="flex-1 pl-4 pr-4 pt-6">
				<View className="mb-6 pl-4 pr-4">
					<View className="flex flex-row justify-between">
						<View className="rounded-sm flex flex-row items-center gap-2">
							<View className="bg-black p-1 rounded-md">
								<BookOpen size={16} className="text-white" />
							</View>
							<Text className="text-3xl font-bold text-gray-800">Pith</Text>
						</View>
					</View>

					{insights.length > 0 && (
						<Text className="text-gray-600">
							{insights.length} {insights.length === 1 ? "insight" : "insights"}{" "}
							captured
						</Text>
					)}
				</View>
				<View className="mb-6 pl-4 pr-4">
					<Search
						size={18}
						className="absolute left-6 text-gray-500 z-10 top-1/2 -mt-[9px]"
					/>
					<Input
						className="bg-white pl-10 border-blue-200 focus:border-blue-700"
						placeholder="Search insights, books, tags, etc."
						value={searchQuery}
						onChangeText={handleSearchChange}
					/>
					<Filter
						size={18}
						className={cn(
							"absolute right-6 z-10 top-1/2 -mt-[9px]",
							hasActiveFilters ? "text-blue-600" : "text-gray-500"
						)}
						onPress={() =>
							router.push({
								pathname: "/filter-modal",
								params: {
									searchQuery,
									selectedCategories: JSON.stringify(selectedCategories),
									selectedTags: JSON.stringify(selectedTags),
								},
							})
						}
					/>
				</View>
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
