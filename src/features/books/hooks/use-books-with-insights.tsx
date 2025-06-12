import { useState, useMemo, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useBooks } from "~/lib/hooks/use-books";
import { useInsights } from "~/lib/hooks/use-insights";
import { handleError } from "~/lib/error-handling";
import type { Book } from "~/lib/types/book";
import type { Insight } from "~/lib/types/insight";
import type { BookWithStats } from "../types";

interface UseBooksWithInsightsResult {
	books: BookWithStats[];
	loading: boolean;
	error: string | null;
	refetch: () => Promise<void>;
}

/**
 * Books feature hook that combines book data with insight statistics
 */
export function useBooksWithInsights(): UseBooksWithInsightsResult {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [booksData, setBooksData] = useState<Book[]>([]);
	const [insightsData, setInsightsData] = useState<Insight[]>([]);

	const { getBooks } = useBooks();
	const { getInsights } = useInsights();

	const getBooksAndInsights = useCallback(
		async (isInitialLoad = false): Promise<void> => {
			try {
				if (
					isInitialLoad ||
					(booksData.length === 0 && insightsData.length === 0)
				) {
					setLoading(true);
				}
				setError(null);

				const [books, insights] = await Promise.all([
					getBooks(),
					getInsights(),
				]);

				setBooksData(books);
				setInsightsData(insights);
			} catch (err) {
				const appError = handleError(err, "Loading books");
				setError(appError.message);
			} finally {
				setLoading(false);
			}
		},
		[booksData.length, insightsData.length]
	);

	useFocusEffect(
		useCallback(() => {
			getBooksAndInsights();
		}, [getBooksAndInsights])
	);

	const booksWithStats = useMemo((): BookWithStats[] => {
		const insightsByBook = new Map<string, Insight[]>();

		// Group insights by book ID
		insightsData.forEach((insight) => {
			if (!insightsByBook.has(insight.bookId)) {
				insightsByBook.set(insight.bookId, []);
			}
			insightsByBook.get(insight.bookId)!.push(insight);
		});

		// Calculate stats for each book
		return booksData.map((book): BookWithStats => {
			const bookInsights = insightsByBook.get(book.id) || [];

			// Get the most recent insight date as "last updated"
			const lastUpdatedDate =
				bookInsights.length > 0
					? bookInsights
							.map((insight) => new Date(insight.createdAt))
							.sort((a, b) => b.getTime() - a.getTime())[0] ||
					  new Date(book.createdAt)
					: new Date(book.createdAt);

			return {
				...book,
				insights: bookInsights,
				lastUpdated: lastUpdatedDate.toLocaleDateString(),
			};
		});
	}, [booksData, insightsData]);

	// Sort books by insight count (most insights first), then by most recent
	const sortedBooks = useMemo((): BookWithStats[] => {
		return [...booksWithStats].sort((a, b) => {
			if (a.insights.length !== b.insights.length) {
				return b.insights.length - a.insights.length;
			}
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		});
	}, [booksWithStats]);

	return {
		books: sortedBooks,
		loading,
		error,
		refetch: () => getBooksAndInsights(true),
	};
}
