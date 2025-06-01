import React from "react";
import { View, FlatList } from "react-native";
import { useFilteredEntries } from "../hooks/use-filtered-entries";
import { EntryCard } from "./entry-card";
import { EntryWithBook } from "../hooks/use-entries-with-books";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";

interface EntriesListProps {
	limit?: number;
	showHeader?: boolean;
	searchQuery?: string;
}

export const EntriesList = ({
	limit,
	showHeader = true,
	searchQuery = "",
}: EntriesListProps) => {
	const { entries, filteredEntries, displayedEntries, loading, error } =
		useFilteredEntries({
			searchQuery,
			limit,
		});

	const renderEntry = ({ item }: { item: EntryWithBook }) => (
		<EntryCard entry={item} />
	);

	const renderEmptyState = () => {
		if (loading) {
			return (
				<View className="justify-center items-center p-4">
					<Text className="text-gray-600">Loading entries...</Text>
				</View>
			);
		}

		if (error) {
			return (
				<View className="justify-center items-center p-4">
					<Text className="text-red-600">Error loading entries: {error}</Text>
				</View>
			);
		}

		if (entries.length === 0) {
			return (
				<View className="justify-center items-center p-4">
					<Text className="text-xl font-semibold text-gray-800 mb-2">
						No entries yet
					</Text>
					<Text className="text-gray-600 text-center">
						Start adding your first book note to see it here!
					</Text>
				</View>
			);
		}

		if (filteredEntries.length === 0 && searchQuery.trim()) {
			return (
				<View className="justify-center items-center p-4">
					<Text className="text-xl font-semibold text-gray-800 mb-2">
						No results found
					</Text>
					<Text className="text-gray-600 text-center">
						No entries match "{searchQuery}". Try a different search term.
					</Text>
				</View>
			);
		}

		return null;
	};

	// Handle empty states
	if (
		loading ||
		error ||
		entries.length === 0 ||
		(filteredEntries.length === 0 && searchQuery.trim())
	) {
		return renderEmptyState();
	}

	return (
		<View className={cn(showHeader && "flex-1")}>
			{showHeader && (
				<View className="mb-4 px-4">
					<Text className="text-2xl font-bold text-gray-800 mb-1">
						Your Entries
					</Text>
					<Text className="text-gray-600">
						{searchQuery?.trim()
							? `${displayedEntries.length} of ${entries.length} ${
									entries.length === 1 ? "entry" : "entries"
							  }`
							: `${displayedEntries.length} ${
									displayedEntries.length === 1 ? "entry" : "entries"
							  }`}
						{limit && " (recent)"}
					</Text>
				</View>
			)}

			{/* Scrollable list */}
			<FlatList
				data={displayedEntries}
				renderItem={renderEntry}
				keyExtractor={(item) => item.id}
				contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
				showsVerticalScrollIndicator={false}
				removeClippedSubviews={true}
				maxToRenderPerBatch={10}
				windowSize={10}
				scrollEnabled={!limit} // Disable scrolling for recent entries (limited lists)
			/>
		</View>
	);
};
