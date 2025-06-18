import { useMemo } from "react";
import { useBooksMap } from "~/lib/stores/books-store";
import { useInsightsMap } from "~/lib/stores/insights-store";
import type { Insight } from "~/lib/types/insight";
import type { Book } from "~/lib/types/book";
import type { InsightWithBook } from "~/lib/types/insight";

interface UseInsightsWithBooksResult {
	readonly insights: InsightWithBook[];
}

/**
 * Hook that combines insights with their associated books
 */
export function useInsightsWithBooks(): UseInsightsWithBooksResult {
	const insightsMap = useInsightsMap();
	const booksMap = useBooksMap();

	const insightsWithBooks = useMemo((): InsightWithBook[] => {
		return Array.from(insightsMap.values()).map((insight): InsightWithBook => {
			const book = booksMap.get(insight.bookId); // O(1) lookup!
			if (!book) {
				// Create a placeholder book for orphaned insights
				const placeholderBook: Book = {
					id: insight.bookId,
					title: "Unknown Book",
					author: "Unknown Author",
					createdAt: insight.createdAt,
					updatedAt: insight.updatedAt,
				};
				return { ...insight, book: placeholderBook };
			}
			return { ...insight, book };
		});
	}, [insightsMap, booksMap]);

	// Sort insights by creation date (newest first)
	const sortedInsights = useMemo((): InsightWithBook[] => {
		return [...insightsWithBooks].sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		);
	}, [insightsWithBooks]);

	return {
		insights: sortedInsights,
	};
}
