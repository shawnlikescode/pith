import { useState, useMemo, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useInsights } from "./use-insights";
import { useBooks } from "./use-books";
import { handleError } from "~/lib/error-handling";
import type { Insight, Book, InsightWithBook } from "../types";

interface UseInsightsWithBooksResult {
	insights: InsightWithBook[];
	loading: boolean;
	error: string | null;
	refetch: () => Promise<void>;
}

export function useInsightsWithBooks(): UseInsightsWithBooksResult {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [insightsData, setInsightsData] = useState<Insight[]>([]);
	const [booksData, setBooksData] = useState<Book[]>([]);

	const { getInsights } = useInsights();
	const { getBooks } = useBooks();

	const getInsightsAndBooks = useCallback(
		async (isInitialLoad = false) => {
			try {
				// Only show loading state on initial load or when we have no data
				if (
					isInitialLoad ||
					(insightsData.length === 0 && booksData.length === 0)
				) {
					setLoading(true);
				}
				setError(null);

				const [insights, books] = await Promise.all([
					getInsights(),
					getBooks(),
				]);

				setInsightsData(insights);
				setBooksData(books);
			} catch (err) {
				const appError = handleError(err, "Loading insights with books");
				setError(appError.message);
			} finally {
				setLoading(false);
			}
		},
		[insightsData.length, booksData.length]
	);

	useFocusEffect(
		useCallback(() => {
			getInsightsAndBooks();
		}, [getInsightsAndBooks])
	);

	const insightsWithBooks = useMemo(() => {
		const booksMap = new Map(booksData.map((book) => [book.id, book]));

		return insightsData.map((entry) => {
			const book = booksMap.get(entry.bookId);
			if (!book) {
				// Create a placeholder book for orphaned insights
				const placeholderBook: Book = {
					id: entry.bookId,
					title: "Unknown Book",
					author: "Unknown Author",
					createdAt: entry.createdAt,
				};
				return { ...entry, book: placeholderBook };
			}
			return { ...entry, book };
		});
	}, [insightsData, booksData]);

	// Sort insights by creation date (newest first)
	const sortedInsights = useMemo(() => {
		return [...insightsWithBooks].sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		);
	}, [insightsWithBooks]);

	return {
		insights: sortedInsights,
		loading,
		error,
		refetch: () => getInsightsAndBooks(true),
	};
}
