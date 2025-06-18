import { useCallback } from "react";
import { useBooksActions } from "~/lib/stores/books-store";
import { useInsightsActions } from "~/lib/stores/insights-store";
import type { Insight } from "~/lib/types/insight";

/**
 * Hook that provides orchestrated book-insight operations.
 * Manages coordination between books and insights stores while maintaining separation of concerns.
 *
 * Key improvements:
 * - Accepts bookId as function parameter (flexible design)
 * - Explicit orchestration rather than hidden coupling
 * - Pure functions that are easy to test
 * - Proper error handling with meaningful messages
 */
export function useBookInsightManager() {
	// Get actions from stores (no coupling between stores)
	const { updateBook } = useBooksActions();
	const {
		addInsight: addInsightAction,
		updateInsight: updateInsightAction,
		deleteInsight: deleteInsightAction,
	} = useInsightsActions();

	// Helper: Update book timestamp
	const timestampBook = useCallback(
		async (bookId: string): Promise<void> => {
			if (!bookId) {
				console.warn("Cannot timestamp book: bookId missing");
				return;
			}
			try {
				await updateBook(bookId, {}); // Empty update triggers timestamp
			} catch (error) {
				console.error(`Error timestamping book ${bookId}:`, error);
				throw error;
			}
		},
		[updateBook]
	);

	// Orchestrated add insight
	const addInsight = useCallback(
		async (
			insightData: Omit<Insight, "id" | "createdAt" | "updatedAt">
		): Promise<Insight> => {
			if (!insightData.bookId) {
				throw new Error("Book ID is required for adding insight");
			}
			try {
				// 1. Add insight to insights store
				const newInsight = await addInsightAction(insightData);

				// 2. Update book timestamp in books store
				await timestampBook(insightData.bookId);

				return newInsight;
			} catch (error) {
				console.error(
					`Error adding insight for book ${insightData.bookId}:`,
					error
				);
				throw error;
			}
		},
		[addInsightAction, timestampBook]
	);

	// Orchestrated update insight
	const updateInsight = useCallback(
		async (
			insightId: string,
			updates: Partial<Omit<Insight, "id" | "createdAt" | "updatedAt">>,
			bookId: string
		): Promise<Insight> => {
			if (!bookId) {
				throw new Error("Book ID is required for updating insight");
			}
			try {
				const updatedInsight = await updateInsightAction(insightId, updates);

				// Only timestamp if insight belongs to this book
				if (updatedInsight.bookId === bookId) {
					await timestampBook(bookId);
				}

				return updatedInsight;
			} catch (error) {
				console.error(`Error updating insight ${insightId}:`, error);
				throw error;
			}
		},
		[updateInsightAction, timestampBook]
	);

	// Orchestrated delete insight
	const deleteInsight = useCallback(
		async (insightId: string, bookId: string): Promise<void> => {
			if (!bookId) {
				throw new Error("Book ID is required for deleting insight");
			}
			try {
				await deleteInsightAction(insightId);

				// Always timestamp the book when deleting an insight
				// (we assume the insight belonged to this book)
				await timestampBook(bookId);
			} catch (error) {
				console.error(`Error deleting insight ${insightId}:`, error);
				throw error;
			}
		},
		[deleteInsightAction, timestampBook]
	);

	return {
		addInsight,
		updateInsight,
		deleteInsight,
	};
}
