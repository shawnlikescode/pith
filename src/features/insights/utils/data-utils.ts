import type { InsightWithBook } from "~/lib/types/insight";
import type { FlexibleCategory, FlexibleTag } from "~/lib/types";

export const getUniqueCategories = (
	insights: InsightWithBook[]
): FlexibleCategory[] => {
	const categories = insights.map((insight) => insight.category);
	return [...new Set(categories)];
};

export const getUniqueTags = (insights: InsightWithBook[]): FlexibleTag[] => {
	const allTags = insights.flatMap((insight) => insight.tags);
	return [...new Set(allTags)];
};

export const filterInsightsBySearch = (
	insights: InsightWithBook[],
	searchQuery: string
): InsightWithBook[] => {
	if (!searchQuery.trim()) return insights;

	const query = searchQuery.toLowerCase().trim();
	return insights.filter((insight) => {
		const searchText = [
			insight.excerpt,
			insight.note,
			insight.book?.title,
			insight.book?.author,
		]
			.filter((text) => typeof text === "string")
			.join(" ")
			.toLowerCase();

		return searchText.includes(query);
	});
};

export const filterInsightsByCategories = (
	insights: InsightWithBook[],
	categories: FlexibleCategory[]
): InsightWithBook[] => {
	if (categories.length === 0) return insights;
	return insights.filter((insight) => categories.includes(insight.category));
};

export const filterInsightsByTags = (
	insights: InsightWithBook[],
	tags: FlexibleTag[]
): InsightWithBook[] => {
	if (tags.length === 0) return insights;
	return insights.filter((insight) => {
		const insightTags = insight.tags || [];
		return tags.some((tag) => insightTags.includes(tag));
	});
};
