import React from "react";
import { FlatList, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { router } from "expo-router";
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

	if (isEmpty && showEmpty) {
		const emptyStateMessage = hasActiveFilters
			? "No insights match your filters"
			: emptyMessage;

		return (
			<View
				className={cn("flex-1 justify-center items-center px-6", className)}
			>
				<Text className="text-muted-foreground text-center mb-4">
					{emptyStateMessage}
				</Text>
				{hasActiveFilters && (
					<Button
						variant="outline"
						onPress={handleClearFilters}
						className="mt-2"
					>
						<Text className="text-foreground">Clear Filters</Text>
					</Button>
				)}
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
