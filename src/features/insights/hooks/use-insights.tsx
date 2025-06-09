import { nanoid } from "nanoid";
import { storageAdapter } from "~/lib/storage";
import type { Insight } from "../types";

export function useInsights() {
	async function getInsights(): Promise<Insight[]> {
		try {
			const insights = await storageAdapter.insights.get();
			return insights ?? [];
		} catch (error) {
			console.error("Error getting insights:", error);
			return [];
		}
	}

	async function saveEntry(
		insightData: Omit<Insight, "id" | "createdAt">
	): Promise<Insight> {
		try {
			const insights = await getInsights();

			const newInsight: Insight = {
				...insightData,
				id: nanoid(),
				createdAt: new Date().toISOString(),
			} as Insight; // Type assertion needed for discriminated union

			const updatedInsights = [...insights, newInsight];
			await storageAdapter.insights.set(updatedInsights);

			return newInsight;
		} catch (error) {
			console.error("Error saving entry:", error);
			throw error;
		}
	}

	return {
		getInsights,
		saveEntry,
	};
}
