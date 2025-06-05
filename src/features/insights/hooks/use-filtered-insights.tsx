import { useMemo } from "react";
import { useInsightsWithBooks } from "./use-insights-with-books";
import { filterInsightsByQuery, limitInsights } from "../utils/data-utils";
import type { InsightWithBook } from "../types";

interface UseFilteredInsightsProps {
	searchQuery?: string;
	limit?: number;
}

interface UseFilteredInsightsResult {
	insights: InsightWithBook[];
	filteredInsights: InsightWithBook[];
	displayedInsights: InsightWithBook[];
	loading: boolean;
	error: string | null;
	refetch: () => Promise<void>;
}

export function useFilteredInsights({
	searchQuery = "",
	limit,
}: UseFilteredInsightsProps = {}): UseFilteredInsightsResult {
	const { insights, loading, error, refetch } = useInsightsWithBooks();

	const filteredInsights = useMemo(() => {
		return filterInsightsByQuery(insights, searchQuery);
	}, [insights, searchQuery]);

	const displayedInsights = useMemo(() => {
		return limitInsights(filteredInsights, limit);
	}, [filteredInsights, limit]);

	return {
		insights,
		filteredInsights,
		displayedInsights,
		loading,
		error,
		refetch,
	};
}
