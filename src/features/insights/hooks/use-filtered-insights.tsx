import React from "react";
import { useLocalSearchParams } from "expo-router";
import type { InsightWithBook } from "~/lib/types/insight";
import type { FlexibleCategory, FlexibleTag } from "~/lib/types";

interface UseFilteredInsightsResult {
	readonly filteredInsights: InsightWithBook[];
	readonly searchQuery: string;
	readonly selectedCategories: FlexibleCategory[];
	readonly selectedTags: FlexibleTag[];
	readonly hasActiveFilters: boolean;
}

export function useFilteredInsights(
	insights: InsightWithBook[]
): UseFilteredInsightsResult {
	const params = useLocalSearchParams();

	// Extract and validate search query
	const searchQuery = React.useMemo(() => {
		const q = params.q;
		// Handle the case where q might be an array
		if (Array.isArray(q)) {
			return typeof q[0] === "string" ? q[0] : "";
		}
		return typeof q === "string" ? q : "";
	}, [params.q]);

	// Parse categories from URL params
	const selectedCategories: FlexibleCategory[] = React.useMemo(() => {
		try {
			const categories = params.categories;
			// Handle array case
			if (Array.isArray(categories)) {
				return [];
			}
			const result =
				typeof categories === "string" && categories
					? JSON.parse(categories)
					: [];
			console.log("🏷️ FILTER: Selected categories:", result);
			return result;
		} catch (error) {
			console.log("❌ FILTER: Error parsing categories:", error);
			return [];
		}
	}, [params.categories]);

	// Parse tags from URL params
	const selectedTags: FlexibleTag[] = React.useMemo(() => {
		try {
			const tags = params.tags;
			// Handle array case
			if (Array.isArray(tags)) {
				return [];
			}
			const result = typeof tags === "string" && tags ? JSON.parse(tags) : [];
			console.log("🏷️ FILTER: Selected tags:", result);
			return result;
		} catch (error) {
			console.log("❌ FILTER: Error parsing tags:", error);
			return [];
		}
	}, [params.tags]);

	// Check if there are any active filters
	const hasActiveFilters = React.useMemo(() => {
		const result =
			searchQuery.trim().length > 0 ||
			selectedCategories.length > 0 ||
			selectedTags.length > 0;
		return result;
	}, [searchQuery, selectedCategories, selectedTags]);

	// Apply all filters
	const filteredInsights = React.useMemo(() => {
		if (!Array.isArray(insights)) {
			return [];
		}

		if (selectedCategories.length > 0 || selectedTags.length > 0) {
			console.log("🏷️ FILTER: Applying filters:", {
				totalInsights: insights.length,
				selectedCategories,
				selectedTags,
			});
		}

		const filtered = insights.filter((insight) => {
			if (!insight || typeof insight !== "object") {
				return false;
			}

			// Search query filter
			if (searchQuery.trim()) {
				const query = searchQuery.toLowerCase().trim();
				const searchText = [
					insight.excerpt,
					insight.note,
					insight.book?.title,
					insight.book?.author,
					...(insight.tags || []), // Include tags in search
				]
					.filter((text) => typeof text === "string")
					.join(" ")
					.toLowerCase();

				if (!searchText.includes(query)) {
					return false;
				}
			}

			// Category filter
			if (selectedCategories.length > 0) {
				const matches = selectedCategories.includes(insight.category);
				if (!matches) {
					console.log("🏷️ FILTER: Category mismatch for insight:", {
						insightCategory: insight.category,
						selectedCategories,
					});
					return false;
				}
			}

			// Tags filter
			if (selectedTags.length > 0) {
				const insightTags = insight.tags || [];
				const hasMatchingTag = selectedTags.some((tag) =>
					insightTags.includes(tag)
				);
				if (!hasMatchingTag) {
					console.log("🏷️ FILTER: Tag mismatch for insight:", {
						insightTags,
						selectedTags,
					});
					return false;
				}
			}

			return true;
		});

		if (selectedCategories.length > 0 || selectedTags.length > 0) {
			console.log("🏷️ FILTER: Results after filtering:", {
				originalCount: insights.length,
				filteredCount: filtered.length,
			});
		}

		return filtered;
	}, [insights, searchQuery, selectedCategories, selectedTags]);

	return {
		filteredInsights,
		searchQuery,
		selectedCategories,
		selectedTags,
		hasActiveFilters,
	};
}
