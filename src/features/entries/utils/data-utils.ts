import { EntryWithBook } from "../hooks/use-entries-with-books";

export const filterEntriesByQuery = (
	entries: EntryWithBook[],
	searchQuery: string
): EntryWithBook[] => {
	if (!searchQuery || !searchQuery.trim()) {
		return entries;
	}

	const lowercaseQuery = searchQuery.toLowerCase().trim();

	return entries.filter((entry) => {
		const searchableContent = [
			entry.book?.title || "",
			entry.book?.author || "",
			entry.location,
			entry.passage,
			entry.note,
		]
			.join(" ")
			.toLowerCase();

		return searchableContent.includes(lowercaseQuery);
	});
};

export const limitEntries = (
	entries: EntryWithBook[],
	limit?: number
): EntryWithBook[] => {
	return limit ? entries.slice(0, limit) : entries;
};

export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString();
};

export const truncateText = (text: string, maxLength: number = 100): string => {
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength) + "...";
};
