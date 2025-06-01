import { useState, useMemo, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useEntries } from "./use-entries";
import { useBooks } from "./use-books";
import { Entry, Book } from "../types";

export type EntryWithBook = Entry & {
	book?: Book;
};

interface UseEntriesWithBooksResult {
	entries: EntryWithBook[];
	loading: boolean;
	error: string | null;
	refetch: () => Promise<void>;
}

export const useEntriesWithBooks = (): UseEntriesWithBooksResult => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [entriesData, setEntriesData] = useState<Entry[]>([]);
	const [booksData, setBooksData] = useState<Book[]>([]);

	const { getEntries } = useEntries();
	const { getBooks } = useBooks();

	const getEntriesAndBooks = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const [entries, books] = await Promise.all([getEntries(), getBooks()]);

			setEntriesData(entries);
			setBooksData(books);
		} catch (err) {
			console.error("Error loading entries with books:", err);
			setError(err instanceof Error ? err.message : "Failed to load data");
		} finally {
			setLoading(false);
		}
	}, []);

	useFocusEffect(
		useCallback(() => {
			getEntriesAndBooks();
		}, [getEntriesAndBooks])
	);

	const entriesWithBooks = useMemo(() => {
		if (booksData.length === 0) {
			return entriesData.map((entry) => ({ ...entry, book: undefined }));
		}

		const booksMap = new Map(booksData.map((book) => [book.id, book]));

		return entriesData.map((entry) => ({
			...entry,
			book: booksMap.get(entry.bookId),
		}));
	}, [entriesData, booksData]);

	// Sort entries by creation date (newest first)
	const sortedEntries = useMemo(() => {
		return [...entriesWithBooks].sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		);
	}, [entriesWithBooks]);

	return {
		entries: sortedEntries,
		loading,
		error,
		refetch: getEntriesAndBooks,
	};
};
