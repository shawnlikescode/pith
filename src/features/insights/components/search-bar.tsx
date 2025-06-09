import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { BookOpen, Search, Filter } from "~/lib/icons/icons";
import { cn } from "~/lib/utils";
import { ICON_SIZES } from "~/lib/constants";
import type { FlexibleCategory, FlexibleTag } from "../types";

interface SearchBarProps {
	searchQuery: string;
	onSearchChange: (text: string) => void;
	hasActiveFilters: boolean;
	selectedCategories: FlexibleCategory[];
	selectedTags: FlexibleTag[];
	insightsCount: number;
}

export function SearchBar({
	searchQuery,
	onSearchChange,
	hasActiveFilters,
	selectedCategories,
	selectedTags,
	insightsCount,
}: SearchBarProps) {
	function handleFilterPress() {
		router.push({
			pathname: "/filter-modal",
			params: {
				searchQuery,
				selectedCategories: JSON.stringify(selectedCategories),
				selectedTags: JSON.stringify(selectedTags),
			},
		});
	}

	return (
		<>
			<View className="mb-6 pl-4 pr-4">
				<View className="flex flex-row justify-between">
					<View className="rounded-sm flex flex-row items-center gap-2">
						<View className="bg-black p-1 rounded-md">
							<BookOpen size={ICON_SIZES.MEDIUM} className="text-white" />
						</View>
						<Text className="text-3xl font-bold text-gray-800">Pith</Text>
					</View>
				</View>

				{insightsCount > 0 && (
					<Text className="text-gray-600">
						{insightsCount} {insightsCount === 1 ? "insight" : "insights"}{" "}
						captured
					</Text>
				)}
			</View>
			<View className="mb-6 pl-4 pr-4">
				<Search
					size={ICON_SIZES.MEDIUM_LARGE}
					className="absolute left-6 text-gray-500 z-10 top-1/2 -mt-[9px]"
				/>
				<Input
					className="bg-white pl-10 border-blue-200 focus:border-blue-700"
					placeholder="Search insights, books, tags, etc."
					value={searchQuery}
					onChangeText={onSearchChange}
				/>
				<Filter
					size={ICON_SIZES.MEDIUM_LARGE}
					className={cn(
						"absolute right-6 z-10 top-1/2 -mt-[9px]",
						hasActiveFilters ? "text-blue-600" : "text-gray-500"
					)}
					onPress={handleFilterPress}
				/>
			</View>
		</>
	);
}
