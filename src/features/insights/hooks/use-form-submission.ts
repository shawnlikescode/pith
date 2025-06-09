import { useBooks } from "./use-books";
import { useInsights } from "./use-insights";
import { useKeyboard } from "~/lib/hooks/use-keyboard";
import {
	handleError,
	showSuccessAlert,
	showErrorAlert,
} from "~/lib/error-handling";
import {
	type AddInsightFormData,
	addInsightFormSchema,
} from "../types/form-schema";

export function useFormSubmission() {
	const { dismissKeyboard } = useKeyboard();
	const { findOrCreateBook } = useBooks();
	const { saveEntry } = useInsights();

	async function submitForm(values: AddInsightFormData) {
		try {
			// Dismiss keyboard first
			dismissKeyboard();

			// Validate with Zod schema
			const validationResult = addInsightFormSchema.safeParse(values);
			if (!validationResult.success) {
				const errors = validationResult.error.errors
					.map((err) => `${err.path.join(".")}: ${err.message}`)
					.join("\n");
				handleError(new Error(errors), "Form validation");
				showErrorAlert(
					"Validation Error",
					"Please check your input and try again."
				);
				return;
			}

			const validatedData = validationResult.data;

			// Find or create the book
			const book = await findOrCreateBook(
				validatedData.source.trim(),
				validatedData.author?.trim() || "Unknown"
			);

			// Save the insight
			const insight = await saveEntry({
				bookId: book.id,
				location: validatedData.pageNumber?.trim() || "Unknown",
				...(validatedData.insightType === "quote"
					? {
							excerpt: validatedData.insight.trim(),
					  }
					: {
							note: validatedData.insight.trim(),
					  }),
				category: validatedData.insightType,
				tags: Array.from(
					new Set(validatedData.tags.filter((tag) => tag.trim().length > 0))
				),
			});

			showSuccessAlert("Success", "Your insight has been saved successfully!");
			return insight;
		} catch (error) {
			handleError(error, "Saving insight");
			showErrorAlert("Error", "Failed to save insight. Please try again.");
			throw error;
		}
	}

	return {
		submitForm,
	};
}
