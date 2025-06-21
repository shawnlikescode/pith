import React from "react";
import { FlatList, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { router } from "expo-router";
import { Plus, BookOpen } from "~/lib/icons/icons";
import { InsightCard } from "./insight-card";
import { useInsightsWithBooks } from "~/lib/hooks/use-insights-with-books";
import { useFilteredInsights } from "../hooks/use-filtered-insights";
import { cn } from "~/lib/utils";
import type { InsightWithBook } from "~/lib/types/insight";

interface InsightListProps {
	readonly limit?: number;
	readonly showEmpty?: boolean;
	readonly emptyMessage?: string;
	readonly className?: string;
}

export function InsightList({
	limit,
	showEmpty = true,
	emptyMessage = "No insights found",
	className,
}: InsightListProps) {
	const { insights } = useInsightsWithBooks();
	const { filteredInsights, hasActiveFilters } = useFilteredInsights(insights);

	// Apply limit if specified
	const displayedInsights = React.useMemo(() => {
		if (!Array.isArray(filteredInsights)) {
			return [];
		}
		return limit ? filteredInsights.slice(0, limit) : filteredInsights;
	}, [filteredInsights, limit]);

	// Move hooks BEFORE any early returns to fix hooks rule violation
	const renderItem = React.useCallback(
		({ item }: { item: InsightWithBook }) => (
			<InsightCard key={item.id} insight={item} />
		),
		[]
	);

	const keyExtractor = React.useCallback(
		(item: InsightWithBook) => String(item.id || ""),
		[]
	);

	const isEmpty =
		!Array.isArray(displayedInsights) || displayedInsights.length === 0;

	function handleClearFilters(): void {
		router.setParams({
			q: undefined,
			categories: undefined,
			tags: undefined,
		});
	}

	function handleAddInsight(): void {
		router.push("/add-insight");
	}

	if (isEmpty && showEmpty) {
		// Different empty states based on context
		if (hasActiveFilters) {
			return (
				<View
					className={cn("flex-1 justify-center items-center px-6", className)}
				>
					<Text className="text-muted-foreground text-center mb-4">
						No insights match your current filters
					</Text>
					<Button
						variant="outline"
						onPress={handleClearFilters}
						className="mt-2"
					>
						<Text className="text-foreground">Clear Filters</Text>
					</Button>
				</View>
			);
		}

		// Empty state for new users (no insights at all)
		const isCompletelyEmpty = insights.length === 0;

		if (isCompletelyEmpty) {
			return (
				<View
					className={cn("flex-1 justify-center items-center px-6", className)}
				>
					<BookOpen className="w-16 h-16 text-muted-foreground mb-6" />
					<Text className="text-xl font-semibold text-foreground mb-2 text-center">
						Welcome to Pith!
					</Text>
					<Text className="text-muted-foreground text-center mb-6 leading-6">
						Capture your thoughts and insights while reading.{"\n"}
						Start by adding your first insight from a book.
					</Text>
					<Button onPress={handleAddInsight} className="flex-row items-center">
						<Plus className="w-4 h-4 text-primary-foreground mr-2" />
						<Text className="text-primary-foreground font-medium">
							Add Your First Insight
						</Text>
					</Button>
				</View>
			);
		}

		// Default empty message for other cases
		return (
			<View
				className={cn("flex-1 justify-center items-center px-6", className)}
			>
				<Text className="text-muted-foreground text-center mb-4">
					{emptyMessage}
				</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={displayedInsights}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			className={className}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingBottom: 100, gap: 16, paddingTop: 16 }}
		/>
	);
}
