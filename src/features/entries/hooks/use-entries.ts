import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entry } from "../types";

export const useEntries = () => {
	const generateId = () => {
		return Date.now().toString() + Math.random().toString(36).substr(2, 9);
	};

	const getEntries = async (): Promise<Entry[]> => {
		try {
			const entriesJson = await AsyncStorage.getItem("entries");
			return entriesJson ? JSON.parse(entriesJson) : [];
		} catch (error) {
			console.error("Error getting entries:", error);
			return [];
		}
	};

	const saveEntry = async (
		entryData: Omit<Entry, "id" | "createdAt">
	): Promise<Entry> => {
		try {
			const entries = await getEntries();

			const newEntry: Entry = {
				...entryData,
				id: generateId(),
				createdAt: new Date().toISOString(),
			};

			const updatedEntries = [...entries, newEntry];
			await AsyncStorage.setItem("entries", JSON.stringify(updatedEntries));

			return newEntry;
		} catch (error) {
			console.error("Error saving entry:", error);
			throw error;
		}
	};

	return {
		getEntries,
		saveEntry,
	};
};
