import type { Book } from "~/lib/types/book";
import type { Insight } from "~/lib/types/insight";

// Define BookWithInsights inline since it's only used here
type BookWithInsights = Book & {
	readonly insights: Insight[];
};
import { View, Text } from "react-native";

interface BookCardProps {
	readonly book: BookWithInsights;
}

/**
 * Minimal typography-first book card component for list-like view
 */
export function BookCard({ book }: BookCardProps) {
	const formattedUpdatedAt = new Date(book.updatedAt).toLocaleDateString();

	return (
		<View className="">
			<Text className="text-2xl font-semibold text-gray-900 mb-1 leading-tight">
				{book.title}
			</Text>
			<Text className="text-sm text-gray-700 mb-3 font-medium">
				{book.author}
			</Text>
			<View className="flex-row justify-between items-center">
				<Text className="text-xs text-blue-500 font-medium">
					{book.insights.length}{" "}
					{book.insights.length === 1 ? "insight" : "insights"}
				</Text>
				<Text className="text-xs text-gray-700">{formattedUpdatedAt}</Text>
			</View>
		</View>
	);
}
