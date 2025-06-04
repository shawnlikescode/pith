import { Alert } from "react-native";
import { useBooks } from "./use-books";
import { useInsights } from "./use-insights";
import { useKeyboard } from "~/lib/hooks/keyboard";
import {
	type AddEntryFormData,
	addEntryFormSchema,
} from "../types/form-schema";

export function useFormSubmission() {
	const { dismissKeyboard } = useKeyboard();
	const { findOrCreateBook } = useBooks();
	const { saveEntry } = useInsights();

	const submitForm = async (values: AddEntryFormData) => {
		try {
			// Dismiss keyboard first
			dismissKeyboard();

			// Validate with Zod schema
			const validationResult = addEntryFormSchema.safeParse(values);
			if (!validationResult.success) {
				const errors = validationResult.error.errors
					.map((err) => `${err.path.join(".")}: ${err.message}`)
					.join("\n");
				console.error("Validation errors:", errors);
				return;
			}

			const validatedData = validationResult.data;
			console.log("Saving entry:", validatedData);

			// Find or create the book
			const book = await findOrCreateBook(
				validatedData.source.trim(),
				validatedData.author?.trim() || "Unknown"
			);

			// Save the entry
			const entry = await saveEntry({
				bookId: book.id,
				location: validatedData.pageNumber?.trim() || "Unknown",
				excerpt: "", // Not captured in new design - readd this later
				note: validatedData.insight.trim(),
				category: validatedData.insightType,
				tags: Array.from(
					new Set(validatedData.tags.filter((tag) => tag.trim().length > 0))
				),
			});

			console.log("Entry saved successfully:", entry);

			Alert.alert("Success", "Your insight has been saved successfully!", [
				{ text: "OK" },
			]);

			return entry;
		} catch (error) {
			console.error("Error saving entry:", error);
			Alert.alert("Error", "Failed to save entry. Please try again.");
			throw error;
		}
	};

	return {
		submitForm,
	};
}
