import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useEntries } from "../hooks/use-entries";
import { useBooks } from "../hooks/use-books";
import { Entry, Book } from "../types";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";

type EntryWithBook = Entry & {
	book?: Book;
};

interface EntriesListProps {
	limit?: number;
	showHeader?: boolean;
}

export const EntriesList = ({ limit, showHeader = true }: EntriesListProps) => {
	const [entries, setEntries] = useState<EntryWithBook[]>([]);
	const [loading, setLoading] = useState(true);
	const { getEntries } = useEntries();
	const { getBooks } = useBooks();

	const loadEntries = async () => {
		try {
			const [entriesData, booksData] = await Promise.all([
				getEntries(),
				getBooks(),
			]);

			// Combine entries with their book information
			const entriesWithBooks = entriesData.map((entry) => {
				const book = booksData.find((b) => b.id === entry.bookId);
				return { ...entry, book };
			});

			// Sort by creation date (newest first)
			entriesWithBooks.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			);

			// Apply limit if specified
			const limitedEntries = limit
				? entriesWithBooks.slice(0, limit)
				: entriesWithBooks;

			setEntries(limitedEntries);
		} catch (error) {
			console.error("Error loading entries:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadEntries();
	}, [limit]);

	const truncateText = (text: string, maxLength: number = 100) => {
		if (text.length <= maxLength) return text;
		return text.substring(0, maxLength) + "...";
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString();
	};

	if (loading) {
		return (
			<View className="justify-center items-center p-4">
				<Text className="text-gray-600">Loading entries...</Text>
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

	return (
		<View className="pl-4 pr-4 pb-6">
			{showHeader && (
				<View className="mb-4">
					<Text className="text-2xl font-bold text-gray-800 mb-1">
						Your Entries
					</Text>
					<Text className="text-gray-600">
						{entries.length} {entries.length === 1 ? "entry" : "entries"}
						{limit && " (recent)"}
					</Text>
				</View>
			)}

			<View>
				{entries.map((entry) => (
					<Card key={entry.id} className="w-full mb-4">
						<CardContent className="p-4">
							<View className="mb-2">
								<Text className="text-lg font-semibold text-gray-800">
									{entry.book?.title || "Unknown Book"}
								</Text>
								<Text className="text-sm text-gray-600">
									by {entry.book?.author || "Unknown Author"} • Location:{" "}
									{entry.location}
								</Text>
							</View>

							{entry.passage && (
								<View className="mb-2 p-2 bg-gray-50 rounded border-l-2 border-gray-300">
									<Text className="text-sm text-gray-700 italic">
										"{truncateText(entry.passage, 120)}"
									</Text>
								</View>
							)}

							<View className="mb-2">
								<Text className="text-sm text-gray-800">
									{truncateText(entry.note, 150)}
								</Text>
							</View>

							<Text className="text-xs text-gray-500">
								{formatDate(entry.createdAt)}
							</Text>
						</CardContent>
					</Card>
				))}
			</View>
		</View>
	);
};
