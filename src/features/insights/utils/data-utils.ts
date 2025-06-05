import type { InsightWithBook } from "../types";

export const filterInsightsByQuery = (
	insights: InsightWithBook[],
	searchQuery: string
): InsightWithBook[] => {
	if (!searchQuery || !searchQuery.trim()) {
		return insights;
	}

	const lowercaseQuery = searchQuery.toLowerCase().trim();

	return insights.filter((entry) => {
		const searchableContent = [
			entry.book?.title || "",
			entry.book?.author || "",
			entry.location,
			entry.excerpt,
			entry.note,
			...entry.tags,
			entry.category,
		]
			.join(" ")
			.toLowerCase();

		return searchableContent.includes(lowercaseQuery);
	});
};

export const limitInsights = (
	insights: InsightWithBook[],
	limit?: number
): InsightWithBook[] => {
	return limit ? insights.slice(0, limit) : insights;
};

export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString();
};

export const truncateText = (text: string, maxLength: number = 100): string => {
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength) + "...";
};
