import type { InsightWithBook, FlexibleCategory, FlexibleTag } from "../types";

export interface FilterOptions {
	searchQuery?: string;
	categories?: FlexibleCategory[];
	tags?: FlexibleTag[];
}

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

export const filterInsights = (
	insights: InsightWithBook[],
	options: FilterOptions = {}
): InsightWithBook[] => {
	let filtered = insights;

	// Apply search query filter
	if (options.searchQuery?.trim()) {
		filtered = filterInsightsByQuery(filtered, options.searchQuery);
	}

	// Apply category filter
	if (options.categories && options.categories.length > 0) {
		filtered = filtered.filter((insight) =>
			options.categories!.includes(insight.category)
		);
	}

	// Apply tag filter
	if (options.tags && options.tags.length > 0) {
		filtered = filtered.filter((insight) =>
			options.tags!.some((tag) => insight.tags.includes(tag))
		);
	}

	return filtered;
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

export const getUniqueCategories = (
	insights: InsightWithBook[]
): FlexibleCategory[] => {
	const categories = insights.map((insight) => insight.category);
	return [...new Set(categories)];
};

export const getUniqueTags = (insights: InsightWithBook[]): FlexibleTag[] => {
	const allTags = insights.flatMap((insight) => insight.tags);
	return [...new Set(allTags)].sort();
};
