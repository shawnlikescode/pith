import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Input } from "~/components/ui/input";
import { Search, Filter } from "~/lib/icons/icons";
import { cn } from "~/lib/utils";
import { ICON_SIZES } from "~/lib/constants";
import type { FlexibleCategory, FlexibleTag } from "~/lib/types/insight";

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
	function handleFilterPress(): void {
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
			<View className="">
				<Search
					size={ICON_SIZES.MEDIUM_LARGE}
					className="absolute left-3 text-gray-500 z-10 top-1/2 -mt-[9px]"
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
						"absolute right-3 z-10 top-1/2 -mt-[9px]",
						hasActiveFilters ? "text-blue-600" : "text-gray-500"
					)}
					onPress={handleFilterPress}
				/>
			</View>
		</>
	);
}
