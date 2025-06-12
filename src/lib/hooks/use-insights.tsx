import { nanoid } from "nanoid";
import { storageAdapter } from "~/lib/storage";
import type { Insight } from "~/lib/types/insight";
import "react-native-get-random-values";

export function useInsights(): {
	getInsights: () => Promise<Insight[]>;
	saveInsight: (Insight: Omit<Insight, "id" | "createdAt">) => Promise<Insight>;
	deleteInsight: (id: string) => Promise<void>;
} {
	async function getInsights(): Promise<Insight[]> {
		try {
			const insights = await storageAdapter.insights.get();
			return insights ?? [];
		} catch (error) {
			console.error("Error getting insights:", error);
			return [];
		}
	}

	async function saveInsight(
		Insight: Omit<Insight, "id" | "createdAt">
	): Promise<Insight> {
		try {
			const insights = await getInsights();

			const newInsight: Insight = {
				...Insight,
				id: nanoid(),
				createdAt: new Date().toISOString(),
			} as Insight;

			const updatedInsights = [newInsight, ...insights];
			await storageAdapter.insights.set(updatedInsights);

			return newInsight;
		} catch (error) {
			console.error("Error saving insight:", error);
			throw error;
		}
	}

	async function deleteInsight(id: string): Promise<void> {
		try {
			const insights = await getInsights();
			const updatedInsights = insights.filter((Insight) => Insight.id !== id);
			await storageAdapter.insights.set(updatedInsights);
		} catch (error) {
			console.error("Error deleting insight:", error);
			throw error;
		}
	}

	return {
		getInsights,
		saveInsight,
		deleteInsight,
	};
}
