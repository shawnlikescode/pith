import React from "react";
import { View, FlatList } from "react-native";
import { Text } from "~/components/ui/text";
import { BookCard } from "~/features/books/components/book-card";
import { useBooksWithInsights } from "~/lib/hooks/use-books-with-insights";

/**
 * Books screen showing library of books with insight statistics
 * Updated to use new Zustand store architecture
 */
export default function BooksScreen() {
	const { books } = useBooksWithInsights();

	if (books.length === 0) {
		return (
			<View className="flex-1 bg-background justify-center items-center pl-4 pr-4">
				<Text className="text-muted-foreground text-center text-base leading-6">
					No books with insights yet.{"\n"}Start adding insights to see your
					books here!
				</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-background">
			<FlatList
				data={books}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View className="mb-4">
						<BookCard book={item} insightCount={item.insights.length} />
					</View>
				)}
				contentContainerStyle={{ padding: 16 }}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}
