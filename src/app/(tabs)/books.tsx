import { ScrollView, View, Text } from "react-native";
import { useBooksWithInsights } from "~/features/books/hooks/use-books-with-insights";
import { BookCard } from "~/features/books/components/book-card";
import { cn } from "~/lib/utils";

/**
 * Books screen showing library of books with insight statistics
 */
export default function BooksScreen() {
	const { books, loading, error } = useBooksWithInsights();

	if (loading) {
		return (
			<View className="flex-1 bg-white justify-center items-center">
				<Text className="text-gray-700">Loading books...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View className="flex-1 bg-white justify-center items-center px-4">
				<Text className="text-red-500 text-center">Error: {error}</Text>
			</View>
		);
	}

	if (books.length === 0) {
		return (
			<View className="flex-1 bg-white justify-center items-center px-4">
				<Text className="text-gray-700 text-center text-base leading-6">
					No books yet. Start by adding insights to create your first book.
				</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-white">
			<ScrollView showsVerticalScrollIndicator={false} className="p-4">
				{books.map((book, index) => (
					<View
						key={book.id}
						className={cn(
							"mb-4",
							index < books.length - 1 ? "pb-4 border-b border-blue-200" : ""
						)}
					>
						<BookCard book={book} />
					</View>
				))}
			</ScrollView>
		</View>
	);
}
