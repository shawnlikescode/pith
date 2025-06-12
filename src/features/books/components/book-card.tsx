import { View, Text } from "react-native";
import type { BookWithStats } from "../types";

interface BookCardProps {
	readonly book: BookWithStats;
}

/**
 * Minimal typography-first book card component for list-like view
 */
export function BookCard({ book }: BookCardProps) {
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
				<Text className="text-xs text-gray-700">{book.lastUpdated}</Text>
			</View>
		</View>
	);
}
