import { Alert } from "react-native";

export interface AppError {
	message: string;
	code?: string;
	context?: string;
}

/**
 * Logs an error in development and shows user-friendly message
 */
export function handleError(error: unknown, context?: string): AppError {
	const errorMessage = error instanceof Error ? error.message : "Unknown error";
	const appError: AppError = {
		message: errorMessage,
		context,
	};

	// Log in development
	if (__DEV__) {
		console.error(`[Error${context ? ` - ${context}` : ""}]:`, error);
	}

	return appError;
}

/**
 * Shows user-friendly error alert
 */
export function showErrorAlert(
	title: string = "Error",
	message: string = "Something went wrong. Please try again."
): void {
	Alert.alert(title, message, [{ text: "OK" }]);
}

/**
 * Shows success alert
 */
export function showSuccessAlert(
	title: string = "Success",
	message: string = "Operation completed successfully!"
): void {
	Alert.alert(title, message, [{ text: "OK" }]);
}

/**
 * Combines error handling and user notification
 */
export function handleErrorWithAlert(
	error: unknown,
	context?: string,
	userMessage?: string
): void {
	handleError(error, context);
	showErrorAlert(
		"Error",
		userMessage || "Something went wrong. Please try again."
	);
}
