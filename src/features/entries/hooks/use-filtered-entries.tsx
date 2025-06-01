import { useMemo } from "react";
import { useEntriesWithBooks, EntryWithBook } from "./use-entries-with-books";
import { filterEntriesByQuery, limitEntries } from "../utils/data-utils";

interface UseFilteredEntriesProps {
	searchQuery?: string;
	limit?: number;
}

interface UseFilteredEntriesResult {
	entries: EntryWithBook[];
	filteredEntries: EntryWithBook[];
	displayedEntries: EntryWithBook[];
	loading: boolean;
	error: string | null;
	refetch: () => Promise<void>;
}

export const useFilteredEntries = ({
	searchQuery = "",
	limit,
}: UseFilteredEntriesProps = {}): UseFilteredEntriesResult => {
	const { entries, loading, error, refetch } = useEntriesWithBooks();

	const filteredEntries = useMemo(() => {
		return filterEntriesByQuery(entries, searchQuery);
	}, [entries, searchQuery]);

	const displayedEntries = useMemo(() => {
		return limitEntries(filteredEntries, limit);
	}, [filteredEntries, limit]);

	return {
		entries,
		filteredEntries,
		displayedEntries,
		loading,
		error,
		refetch,
	};
};
