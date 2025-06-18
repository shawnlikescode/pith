import { useMemo } from "react";
import { useInsightsWithBooks } from "~/lib/hooks/use-insights-with-books";
import {
	filterInsights,
	limitInsights,
	type FilterOptions,
} from "../utils/data-utils";
import type { InsightWithBook } from "~/lib/types/insight";
import type { FlexibleCategory, FlexibleTag } from "~/lib/types";

interface UseFilteredInsightsProps {
	readonly searchQuery?: string;
	readonly categories?: FlexibleCategory[];
	readonly tags?: FlexibleTag[];
	readonly limit?: number;
}

interface UseFilteredInsightsResult {
	readonly insights: InsightWithBook[];
	readonly filteredInsights: InsightWithBook[];
	readonly displayedInsights: InsightWithBook[];
}

export function useFilteredInsights({
	searchQuery = "",
	categories = [],
	tags = [],
	limit,
}: UseFilteredInsightsProps = {}): UseFilteredInsightsResult {
	const { insights } = useInsightsWithBooks();

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
	};
}
