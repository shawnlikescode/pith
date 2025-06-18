import React from "react";
import { View, FlatList } from "react-native";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";
import { PERFORMANCE } from "~/lib/constants";
import { useFilteredInsights } from "../hooks/use-filtered-insights";
import { InsightCard } from "./insight-card";
import type { InsightWithBook } from "~/lib/types/insight";
import type { FlexibleCategory, FlexibleTag } from "~/lib/types";

interface InsightsListProps {
	readonly limit?: number;
	readonly showHeader?: boolean;
	readonly searchQuery?: string;
	readonly categories?: FlexibleCategory[];
	readonly tags?: FlexibleTag[];
}

export function InsightsList({
	limit,
	showHeader = true,
	searchQuery = "",
	categories = [],
	tags = [],
}: InsightsListProps) {
	const { insights, filteredInsights, displayedInsights } = useFilteredInsights(
		{
			searchQuery,
			categories,
			tags,
			limit,
		}
	);

	const renderEntry = ({ item }: { item: InsightWithBook }) => (
		<View className="mb-4">
			<InsightCard insight={item} />
		</View>
	);

	const renderEmptyState = () => {
		if (insights.length === 0) {
			return (
				<View className="justify-center items-center">
					<Text className="text-xl font-semibold text-gray-800 mb-2">
						No insights yet
					</Text>
					<Text className="text-gray-600 text-center">
						Start adding your first book note to see it here!
					</Text>
				</View>
			);
		}

		if (filteredInsights.length === 0 && searchQuery.trim()) {
			return (
				<View className="justify-center items-center">
					<Text className="text-xl font-semibold text-gray-800 mb-2">
						No results found
					</Text>
					<Text className="text-gray-600 text-center">
						No insights match "{searchQuery}". Try a different search term.
					</Text>
				</View>
			);
		}

		return null;
	};

	// Handle empty states
	if (
		insights.length === 0 ||
		(filteredInsights.length === 0 && searchQuery.trim())
	) {
		return renderEmptyState();
	}

	return (
		<View className={cn(showHeader && "flex-1")}>
			{showHeader && (
				<View className="">
					<Text className="text-2xl font-bold text-gray-800">
						Your Insights
					</Text>
					<Text className="text-gray-600">
						{searchQuery?.trim()
							? `${displayedInsights.length} of ${insights.length} ${
									insights.length === 1 ? "entry" : "insights"
							  }`
							: `${displayedInsights.length} ${
									displayedInsights.length === 1 ? "entry" : "insights"
							  }`}
						{limit && " (recent)"}
					</Text>
				</View>
			)}

			{/* Scrollable list */}
			<FlatList
				data={displayedInsights}
				renderItem={renderEntry}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				removeClippedSubviews={true}
				maxToRenderPerBatch={PERFORMANCE.MAX_RENDER_PER_BATCH}
				windowSize={PERFORMANCE.WINDOW_SIZE}
				scrollEnabled={!limit} // Disable scrolling for recent insights (limited lists)
			/>
		</View>
	);
}
