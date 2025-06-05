import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "nanoid";
import type { Insight } from "../types";

export function useInsights() {
	const getInsights = async (): Promise<Insight[]> => {
		try {
			const insightsJson = await AsyncStorage.getItem("insights");
			return insightsJson ? JSON.parse(insightsJson) : [];
		} catch (error) {
			console.error("Error getting insights:", error);
			return [];
		}
	};

	const saveEntry = async (
		insightData: Omit<Insight, "id" | "createdAt">
	): Promise<Insight> => {
		try {
			const insights = await getInsights();

			const newInsight: Insight = {
				...insightData,
				id: nanoid(),
				createdAt: new Date().toISOString(),
			} as Insight; // Type assertion needed for discriminated union

			const updatedInsights = [...insights, newInsight];
			await AsyncStorage.setItem("insights", JSON.stringify(updatedInsights));

			return newInsight;
		} catch (error) {
			console.error("Error saving entry:", error);
			throw error;
		}
	};

	return {
		getInsights,
		saveEntry,
	};
}
