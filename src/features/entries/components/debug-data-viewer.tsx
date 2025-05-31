import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBooks } from "../hooks/use-books";
import { useEntries } from "../hooks/use-entries";
import { Book, Entry } from "../types";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";

export const DebugDataViewer: React.FC = () => {
	const [books, setBooks] = useState<Book[]>([]);
	const [entries, setEntries] = useState<Entry[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [lastLoaded, setLastLoaded] = useState<Date | null>(null);
	const { getBooks } = useBooks();
	const { getEntries } = useEntries();

	const loadData = async () => {
		setIsLoading(true);
		try {
			const [booksData, entriesData] = await Promise.all([
				getBooks(),
				getEntries(),
			]);
			setBooks(booksData);
			setEntries(entriesData);
			setLastLoaded(new Date());
		} catch (error) {
			console.error("Error loading data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const logRawAsyncStorageData = async () => {
		try {
			const booksRaw = await AsyncStorage.getItem("books");
			const entriesRaw = await AsyncStorage.getItem("entries");

			console.log("=== RAW ASYNCSTORAGE DATA ===");
			console.log("Books raw:", booksRaw);
			console.log("Entries raw:", entriesRaw);
			console.log("Books parsed:", booksRaw ? JSON.parse(booksRaw) : null);
			console.log(
				"Entries parsed:",
				entriesRaw ? JSON.parse(entriesRaw) : null
			);
			console.log("=== END RAW DATA ===");
		} catch (error) {
			console.error("Error reading raw AsyncStorage:", error);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	return (
		<ScrollView className="flex-1 p-4">
			<View className="mb-4">
				<Text className="text-2xl font-bold mb-2">Debug Data Viewer</Text>
				{lastLoaded && (
					<Text className="text-xs text-muted-foreground mb-2">
						Data loaded: {lastLoaded.toLocaleTimeString()}
					</Text>
				)}
				<View className="mb-4">
					<TouchableOpacity
						onPress={logRawAsyncStorageData}
						className="bg-green-500 p-2 rounded"
					>
						<Text className="text-white text-center">
							Log Raw AsyncStorage Data
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			{isLoading ? (
				<View className="flex-1 justify-center items-center p-8">
					<Text className="text-muted-foreground">Loading data...</Text>
				</View>
			) : (
				<>
					<View className="mb-6">
						<Text className="text-xl font-semibold mb-3">
							Books ({books.length})
						</Text>
						{books.length === 0 ? (
							<Text className="text-muted-foreground italic">
								No books saved yet
							</Text>
						) : (
							books.map((book) => (
								<Card key={book.id} className="mb-3">
									<CardHeader className="pb-2">
										<CardTitle className="text-lg">{book.title}</CardTitle>
										<CardDescription>by {book.author}</CardDescription>
									</CardHeader>
									<CardContent className="pt-0">
										<Text className="text-xs text-muted-foreground">
											ID: {book.id}
										</Text>
										<Text className="text-xs text-muted-foreground">
											Created: {new Date(book.createdAt).toLocaleString()}
										</Text>
									</CardContent>
								</Card>
							))
						)}
					</View>

					<View>
						<Text className="text-xl font-semibold mb-3">
							Entries ({entries.length})
						</Text>
						{entries.length === 0 ? (
							<Text className="text-muted-foreground italic">
								No entries saved yet
							</Text>
						) : (
							entries.map((entry) => {
								const book = books.find((b) => b.id === entry.bookId);
								return (
									<Card key={entry.id} className="mb-3">
										<CardHeader className="pb-2">
											<CardTitle className="text-lg">
												{book ? book.title : "Unknown Book"}
											</CardTitle>
											<CardDescription>
												{book ? `by ${book.author}` : "Unknown Author"} •{" "}
												{entry.location}
											</CardDescription>
										</CardHeader>
										<CardContent className="pt-0">
											<Text className="text-sm mb-2 italic">
												"{entry.passage}"
											</Text>
											<Text className="text-sm text-card-foreground mb-2">
												{entry.note}
											</Text>
											<Text className="text-xs text-muted-foreground">
												ID: {entry.id}
											</Text>
											<Text className="text-xs text-muted-foreground">
												Created: {new Date(entry.createdAt).toLocaleString()}
											</Text>
										</CardContent>
									</Card>
								);
							})
						)}
					</View>
				</>
			)}
		</ScrollView>
	);
};
