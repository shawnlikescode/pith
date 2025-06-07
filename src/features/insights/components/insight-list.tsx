import React from "react";
import { View, FlatList } from "react-native";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";
import { useFilteredInsights } from "../hooks/use-filtered-insights";
import InsightCard from "./insight-card";
import type { InsightWithBook, FlexibleCategory, FlexibleTag } from "../types";

interface InsightsListProps {
	limit?: number;
	showHeader?: boolean;
	searchQuery?: string;
	categories?: FlexibleCategory[];
	tags?: FlexibleTag[];
}

export default function InsightsList({
	limit,
	showHeader = true,
	searchQuery = "",
	categories = [],
	tags = [],
}: InsightsListProps) {
	const { insights, filteredInsights, displayedInsights, loading, error } =
		useFilteredInsights({
			searchQuery,
			categories,
			tags,
			limit,
		});

	const renderEntry = ({ item }: { item: InsightWithBook }) => (
		<InsightCard insight={item} />
	);

	const renderEmptyState = () => {
		if (loading) {
			return (
				<View className="justify-center items-center p-4">
					<Text className="text-gray-600">Loading insights...</Text>
				</View>
			);
		}

		if (error) {
			return (
				<View className="justify-center items-center p-4">
					<Text className="text-red-600">Error loading insights: {error}</Text>
				</View>
			);
		}

		if (insights.length === 0) {
			return (
				<View className="justify-center items-center p-4">
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
				<View className="justify-center items-center p-4">
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
		loading ||
		error ||
		insights.length === 0 ||
		(filteredInsights.length === 0 && searchQuery.trim())
	) {
		return renderEmptyState();
	}

	return (
		<View className={cn(showHeader && "flex-1")}>
			{showHeader && (
				<View className="">
					<Text className="text-2xl font-bold text-gray-800 mb-1">
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
				className="pl-4 pr-4"
				data={displayedInsights}
				renderItem={renderEntry}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				removeClippedSubviews={true}
				maxToRenderPerBatch={10}
				windowSize={10}
				scrollEnabled={!limit} // Disable scrolling for recent insights (limited lists)
			/>
		</View>
	);
}
