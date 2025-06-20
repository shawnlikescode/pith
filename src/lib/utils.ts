import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge
 */
export const cn = (...inputs: ClassValue[]): string => {
	return twMerge(clsx(inputs));
};

/**
 * Formats an ISO date string to a relative time format
 * Returns: "Just Now", "2m ago", "3h ago", "2d ago", or "Jan 15"
 */
export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	const now = new Date();
	const diffInMs = now.getTime() - date.getTime();
	const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
	const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
	const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

	// Just Now (within 1 minute)
	if (diffInMinutes < 1) {
		return "Just Now";
	}

	// Minutes ago (1-59 minutes)
	if (diffInMinutes < 60) {
		return `${diffInMinutes}m ago`;
	}

	// Hours ago (1-23 hours)
	if (diffInHours < 24) {
		return `${diffInHours}h ago`;
	}

	// Days ago (1-6 days)
	if (diffInDays < 7) {
		return `${diffInDays}d ago`;
	}

	// For dates older than a week, show "Mon d" format
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const month = monthNames[date.getMonth()];
	const day = date.getDate();

	return `${month} ${day}`;
};

/**
 * Truncates text to a maximum length and adds ellipsis
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength) + "...";
};
