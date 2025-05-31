import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBooks } from "../hooks/use-books";
import { useEntries } from "../hooks/use-entries";
import { Book, Entry } from "../types";

export const DebugDataViewer: React.FC = () => {
	const [books, setBooks] = useState<Book[]>([]);
	const [entries, setEntries] = useState<Entry[]>([]);
	const [refreshKey, setRefreshKey] = useState(0);
	const { getBooks } = useBooks();
	const { getEntries } = useEntries();

	const loadData = async () => {
		try {
			const [booksData, entriesData] = await Promise.all([
				getBooks(),
				getEntries(),
			]);
			setBooks(booksData);
			setEntries(entriesData);
		} catch (error) {
			console.error("Error loading data:", error);
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
	}, [refreshKey]);

	const refresh = () => {
		setRefreshKey((prev) => prev + 1);
	};

	return (
		<ScrollView className="flex-1 p-4">
			<View className="mb-4">
				<Text className="text-2xl font-bold mb-2">Debug Data Viewer</Text>
				<View className="flex-row gap-2 mb-4">
					<TouchableOpacity
						onPress={refresh}
						className="bg-blue-500 p-2 rounded flex-1"
					>
						<Text className="text-white text-center">Refresh Data</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={logRawAsyncStorageData}
						className="bg-green-500 p-2 rounded flex-1"
					>
						<Text className="text-white text-center">Log Raw Data</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View className="mb-6">
				<Text className="text-xl font-semibold mb-2">
					Books ({books.length})
				</Text>
				{books.length === 0 ? (
					<Text className="text-gray-500 italic">No books saved yet</Text>
				) : (
					books.map((book) => (
						<View key={book.id} className="bg-gray-100 p-3 rounded mb-2">
							<Text className="font-medium">{book.title}</Text>
							<Text className="text-gray-600">by {book.author}</Text>
							<Text className="text-xs text-gray-500">
								ID: {book.id} | Created:{" "}
								{new Date(book.createdAt).toLocaleString()}
							</Text>
						</View>
					))
				)}
			</View>

			<View>
				<Text className="text-xl font-semibold mb-2">
					Entries ({entries.length})
				</Text>
				{entries.length === 0 ? (
					<Text className="text-gray-500 italic">No entries saved yet</Text>
				) : (
					entries.map((entry) => {
						const book = books.find((b) => b.id === entry.bookId);
						return (
							<View key={entry.id} className="bg-gray-100 p-3 rounded mb-2">
								<Text className="font-medium mb-1">
									{book ? `${book.title} by ${book.author}` : "Unknown Book"}
								</Text>
								<Text className="text-sm text-gray-600 mb-1">
									Location: {entry.location}
								</Text>
								<Text className="text-sm mb-2">Passage: "{entry.passage}"</Text>
								<Text className="text-sm text-gray-700 mb-1">
									Note: {entry.note}
								</Text>
								<Text className="text-xs text-gray-500">
									ID: {entry.id} | Created:{" "}
									{new Date(entry.createdAt).toLocaleString()}
								</Text>
							</View>
						);
					})
				)}
			</View>
		</ScrollView>
	);
};
