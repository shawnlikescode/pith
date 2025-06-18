import { create } from "zustand";
import { nanoid } from "nanoid";
import { storageAdapter } from "~/lib/storage";
import type { Insight } from "~/lib/types/insight";

interface InsightsState {
	readonly insights: Map<string, Insight>; // O(1) lookups
	readonly byBookId: Map<string, Set<string>>; // O(1) book→insights index
	readonly actions: {
		readonly loadInsights: () => Promise<void>;
		readonly addInsight: (
			insight: Omit<Insight, "id" | "createdAt" | "updatedAt">
		) => Promise<Insight>;
		readonly updateInsight: (
			id: string,
			updates: Partial<
				Omit<Insight, "id" | "createdAt" | "updatedAt" | "bookId">
			>
		) => Promise<Insight>;
		readonly deleteInsight: (id: string) => Promise<void>;
	};
}

// Internal store - not exported
const useInsightsStore = create<InsightsState>((set, get) => ({
	insights: new Map(),
	byBookId: new Map(),
	actions: {
		loadInsights: async () => {
			try {
				const insightsArray = await storageAdapter.insights.get();
				const insights = new Map<string, Insight>();
				const byBookId = new Map<string, Set<string>>();

				// Build both the main map and the index
				(insightsArray || []).forEach((insight) => {
					insights.set(insight.id, insight);

					// Build book→insights index
					if (!byBookId.has(insight.bookId)) {
						byBookId.set(insight.bookId, new Set());
					}
					byBookId.get(insight.bookId)!.add(insight.id);
				});

				set({ insights, byBookId });
			} catch (error) {
				console.error("Error loading insights:", error);
				throw error;
			}
		},

		addInsight: async (
			insightData: Omit<Insight, "id" | "createdAt" | "updatedAt">
		): Promise<Insight> => {
			const { insights, byBookId } = get();

			const now = new Date().toISOString();
			const newInsight = {
				...insightData,
				id: nanoid(),
				createdAt: now,
				updatedAt: now,
			} as Insight;

			// Update insights map
			const updatedInsights = new Map(insights);
			updatedInsights.set(newInsight.id, newInsight);

			// Update book→insights index
			const updatedByBookId = new Map(byBookId);
			if (!updatedByBookId.has(newInsight.bookId)) {
				updatedByBookId.set(newInsight.bookId, new Set());
			}
			updatedByBookId.get(newInsight.bookId)!.add(newInsight.id);

			try {
				// Convert Map to array for storage
				const insightsArray = Array.from(updatedInsights.values());
				await storageAdapter.insights.set(insightsArray);
				set({ insights: updatedInsights, byBookId: updatedByBookId });
				return newInsight;
			} catch (error) {
				console.error("Error adding insight:", error);
				throw error;
			}
		},

		updateInsight: async (
			id: string,
			updates: Partial<
				Omit<Insight, "id" | "createdAt" | "updatedAt" | "bookId">
			>
		): Promise<Insight> => {
			const { insights, byBookId } = get();
			const insightToUpdate = insights.get(id); // O(1) lookup!

			if (!insightToUpdate) {
				throw new Error("Insight not found");
			}

			const updatedInsight = {
				...insightToUpdate,
				...updates,
				updatedAt: new Date().toISOString(),
			} as Insight;

			// Update insights map
			const updatedInsights = new Map(insights);
			updatedInsights.set(id, updatedInsight);

			// byBookId index doesn't change for updates (bookId is immutable)
			// so we can reuse the existing index

			try {
				// Convert Map to array for storage
				const insightsArray = Array.from(updatedInsights.values());
				await storageAdapter.insights.set(insightsArray);
				set({ insights: updatedInsights, byBookId });
				return updatedInsight;
			} catch (error) {
				console.error("Error updating insight:", error);
				throw error;
			}
		},

		deleteInsight: async (id: string): Promise<void> => {
			const { insights, byBookId } = get();
			const insightToDelete = insights.get(id); // O(1) lookup!

			if (!insightToDelete) {
				return; // Insight doesn't exist, nothing to delete
			}

			// Update insights map
			const updatedInsights = new Map(insights);
			updatedInsights.delete(id);

			// Update book→insights index
			const updatedByBookId = new Map(byBookId);
			const bookInsights = updatedByBookId.get(insightToDelete.bookId);
			if (bookInsights) {
				bookInsights.delete(id);
				// Clean up empty sets
				if (bookInsights.size === 0) {
					updatedByBookId.delete(insightToDelete.bookId);
				}
			}

			try {
				// Convert Map to array for storage
				const insightsArray = Array.from(updatedInsights.values());
				await storageAdapter.insights.set(insightsArray);
				set({ insights: updatedInsights, byBookId: updatedByBookId });
			} catch (error) {
				console.error("Error deleting insight:", error);
				throw error;
			}
		},
	},
}));

// Auto-load data on store initialization
useInsightsStore.getState().actions.loadInsights();

export const useInsightsMap = () => useInsightsStore((state) => state.insights);
export const useInsightById = (id: string) => {
	const insightsMap = useInsightsStore((state) => state.insights);
	return insightsMap.get(id);
};

export const useInsightsByBookId = (bookId: string) => {
	const insightsMap = useInsightsStore((state) => state.insights);
	const byBookId = useInsightsStore((state) => state.byBookId);

	const insightIds = byBookId.get(bookId) || new Set();
	return Array.from(insightIds)
		.map((id) => insightsMap.get(id))
		.filter((insight): insight is Insight => insight !== undefined);
};

export const useByBookIdIndex = () =>
	useInsightsStore((state) => state.byBookId);

export const useInsightsActions = () =>
	useInsightsStore((state) => state.actions);
