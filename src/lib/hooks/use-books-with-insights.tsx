import { useMemo } from "react";
import { useBooksMap } from "~/lib/stores/books-store";
import { useInsightsMap, useByBookIdIndex } from "~/lib/stores/insights-store";
import type { Book } from "~/lib/types/book";
import type { Insight } from "~/lib/types/insight";

// Define BookWithInsights inline
type BookWithInsights = Book & {
	readonly insights: Insight[];
};

interface UseBooksWithInsightsResult {
	readonly books: BookWithInsights[];
}

/**
 * Hook that combines books with their insights
 */
export function useBooksWithInsights(): UseBooksWithInsightsResult {
	const booksMap = useBooksMap();
	const insightsMap = useInsightsMap();
	const byBookId = useByBookIdIndex();

	const booksWithInsights = useMemo((): BookWithInsights[] => {
		return Array.from(booksMap.values()).map((book): BookWithInsights => {
			const insightIds = byBookId.get(book.id) || new Set();

			const insights = Array.from(insightIds)
				.map((id) => insightsMap.get(id))
				.filter((insight): insight is Insight => insight !== undefined);

			return {
				...book,
				insights,
			};
		});
	}, [booksMap, insightsMap, byBookId]);

	// Sort books by insight count (most insights first), then by most recent updatedAt
	const sortedBooks = useMemo((): BookWithInsights[] => {
		return [...booksWithInsights].sort((a, b) => {
			// First sort by insight count (descending)
			if (a.insights.length !== b.insights.length) {
				return b.insights.length - a.insights.length;
			}
			// Then sort by updatedAt (most recent first)
			return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
		});
	}, [booksWithInsights]);

	return {
		books: sortedBooks,
	};
}
