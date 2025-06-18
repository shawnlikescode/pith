import { router } from "expo-router";
import { useBooksActions } from "~/lib/stores/books-store";
import { useBookInsightManager } from "~/lib/hooks/use-book-insight-manager";
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
import type { Insight } from "~/lib/types/insight";

export function useFormSubmission(): {
	submitForm: (values: AddInsightFormData) => Promise<Insight | null>;
} {
	const { dismissKeyboard } = useKeyboard();
	const { findBookByTitleAndAuthor, createBook } = useBooksActions();
	const { addInsight } = useBookInsightManager(); // New coordinated hook

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
				return null;
			}

			const validatedData = validationResult.data;

			// 1. Find or create book using atomic actions
			const title = validatedData.source.trim();
			const author = validatedData.author?.trim() || "Unknown";

			let book = findBookByTitleAndAuthor(title, author);
			if (!book) {
				book = await createBook(title, author);
			}

			// 2. Add insight with coordination
			const insight = await addInsight({
				bookId: book.id,
				location: validatedData.pageNumber?.trim() || "Unknown",
				category: validatedData.insightType,
				tags: Array.from(
					new Set(validatedData.tags.filter((tag) => tag.trim().length > 0))
				),
				...(validatedData.insightType === "quote"
					? { excerpt: validatedData.insight.trim() }
					: { note: validatedData.insight.trim() }),
			});

			// Show success message
			showSuccessAlert("Success", "Insight saved successfully");

			// Navigate back
			router.back();

			return insight;
		} catch (error) {
			const appError = handleError(error, "Saving insight");
			showErrorAlert("Error", appError.message);
			return null;
		}
	}

	return { submitForm };
}
