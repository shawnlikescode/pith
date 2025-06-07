import { useMemo } from "react";
import { useInsightsWithBooks } from "./use-insights-with-books";
import {
	filterInsights,
	limitInsights,
	type FilterOptions,
} from "../utils/data-utils";
import type { InsightWithBook, FlexibleCategory, FlexibleTag } from "../types";

interface UseFilteredInsightsProps {
	searchQuery?: string;
	categories?: FlexibleCategory[];
	tags?: FlexibleTag[];
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
	categories = [],
	tags = [],
	limit,
}: UseFilteredInsightsProps = {}): UseFilteredInsightsResult {
	const { insights, loading, error, refetch } = useInsightsWithBooks();

	const filteredInsights = useMemo(() => {
		return filterInsights(insights, {
			searchQuery,
			categories,
			tags,
		});
	}, [insights, searchQuery, categories, tags]);

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
