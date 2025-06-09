import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Insight, Book } from "~/features/insights/types";

// Simple storage helpers
export const storageAdapter = {
	insights: {
		get: async (): Promise<Insight[] | null> => {
			try {
				const data = await AsyncStorage.getItem("insights");
				return data ? JSON.parse(data) : null;
			} catch (error) {
				console.error("Error getting insights:", error);
				return null;
			}
		},
		set: async (value: Insight[]) => {
			try {
				await AsyncStorage.setItem("insights", JSON.stringify(value));
			} catch (error) {
				console.error("Error setting insights:", error);
				throw error;
			}
		},
		remove: async () => {
			try {
				await AsyncStorage.removeItem("insights");
			} catch (error) {
				console.error("Error removing insights:", error);
				throw error;
			}
		},
	},
	books: {
		get: async (): Promise<Book[] | null> => {
			try {
				const data = await AsyncStorage.getItem("books");
				return data ? JSON.parse(data) : null;
			} catch (error) {
				console.error("Error getting books:", error);
				return null;
			}
		},
		set: async (value: Book[]) => {
			try {
				await AsyncStorage.setItem("books", JSON.stringify(value));
			} catch (error) {
				console.error("Error setting books:", error);
				throw error;
			}
		},
		remove: async () => {
			try {
				await AsyncStorage.removeItem("books");
			} catch (error) {
				console.error("Error removing books:", error);
				throw error;
			}
		},
	},
} as const;
