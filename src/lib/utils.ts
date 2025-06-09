import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge
 */
export const cn = (...inputs: ClassValue[]): string => {
	return twMerge(clsx(inputs));
};

/**
 * Formats an ISO date string to a localized date string
 */
export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString();
};

/**
 * Truncates text to a maximum length and adds ellipsis
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength) + "...";
};
