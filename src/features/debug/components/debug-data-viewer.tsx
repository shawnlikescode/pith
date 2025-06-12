import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { storageAdapter } from "~/lib/storage";
import { Text } from "~/components/ui/text";
import { useBooks } from "~/lib/hooks/use-books";
import { useInsights } from "~/lib/hooks/use-insights";
import type { Book } from "~/lib/types/book";
import type { Insight } from "~/lib/types/insight";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

export function DebugDataViewer() {
	const [books, setBooks] = useState<Book[]>([]);
	const [insights, setInsights] = useState<Insight[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [lastLoaded, setLastLoaded] = useState<Date | null>(null);
	const { getBooks } = useBooks();
	const { getInsights } = useInsights();

	async function loadData(): Promise<void> {
		setIsLoading(true);
		try {
			const [booksData, insightsData] = await Promise.all([
				getBooks(),
				getInsights(),
			]);
			setBooks(booksData);
			setInsights(insightsData);
			setLastLoaded(new Date());
		} catch (error) {
			console.error("Error loading data:", error);
		} finally {
			setIsLoading(false);
		}
	}

	async function logRawStorageData(): Promise<void> {
		try {
			const booksData = await storageAdapter.books.get();
			const insightsData = await storageAdapter.insights.get();

			console.log("=== RAW STORAGE DATA ===");
			console.log("Books:", booksData);
			console.log("Insights:", insightsData);
			console.log("=== END RAW DATA ===");
		} catch (error) {
			console.error("Error reading raw storage:", error);
		}
	}

	async function clearStorage(): Promise<void> {
		await storageAdapter.books.remove();
		await storageAdapter.insights.remove();
		loadData();
	}

	useEffect(() => {
		loadData();
	}, []);

	if (isLoading) {
		return (
			<ScrollView className="flex-1 p-4">
				<Text>Loading data...</Text>
			</ScrollView>
		);
	}

	return (
		<ScrollView className="flex-1 p-4 gap-6">
			{lastLoaded && (
				<Text className="text-sm text-muted-foreground">
					Last loaded: {lastLoaded.toLocaleString()}
				</Text>
			)}

			<View className="flex flex-row gap-3">
				<Button onPress={loadData} className="flex-1">
					<Text>Refresh Data</Text>
				</Button>
				<Button
					onPress={logRawStorageData}
					variant="outline"
					className="flex-1"
				>
					<Text>Log Raw Data</Text>
				</Button>
				<Button onPress={clearStorage} variant="destructive" className="flex-1">
					<Text>Clear All</Text>
				</Button>
			</View>

			{/* Books Section */}
			<View>
				<Text className="text-xl font-semibold mb-3">
					Books ({books.length})
				</Text>
				{books.length === 0 ? (
					<Text className="text-muted-foreground italic">
						No books saved yet
					</Text>
				) : (
					<View className="gap-3">
						{books.map((book) => (
							<Card key={book.id}>
								<CardHeader>
									<CardTitle>{book.title}</CardTitle>
									<CardDescription>by {book.author}</CardDescription>
								</CardHeader>
								<CardContent>
									<Text className="text-xs text-muted-foreground">
										ID: {book.id}
									</Text>
									<Text className="text-xs text-muted-foreground">
										Created: {new Date(book.createdAt).toLocaleString()}
									</Text>
								</CardContent>
							</Card>
						))}
					</View>
				)}
			</View>

			{/* Insights Section */}
			<View>
				<Text className="text-xl font-semibold mb-3">
					Insights ({insights.length})
				</Text>
				{insights.length === 0 ? (
					<Text className="text-muted-foreground italic">
						No insights saved yet
					</Text>
				) : (
					<View className="gap-3">
						{insights.map((entry) => {
							const book = books.find((b) => b.id === entry.bookId);
							return (
								<Card key={entry.id}>
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
										{entry.category === "quote" &&
											"excerpt" in entry &&
											entry.excerpt && (
												<Text className="text-sm mb-2 italic">
													"{entry.excerpt}"
												</Text>
											)}
										{"note" in entry && entry.note && (
											<Text className="text-sm text-card-foreground mb-2">
												{entry.note}
											</Text>
										)}
										<Text className="text-xs text-muted-foreground">
											ID: {entry.id}
										</Text>
										<Text className="text-xs text-muted-foreground">
											Created: {new Date(entry.createdAt).toLocaleString()}
										</Text>
									</CardContent>
								</Card>
							);
						})}
					</View>
				)}
			</View>
		</ScrollView>
	);
}
