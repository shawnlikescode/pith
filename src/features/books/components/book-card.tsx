import React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent } from "~/components/ui/card";
import type { Book } from "~/lib/types/book";
import { formatDate } from "~/lib/utils";

interface BookCardProps {
	readonly book: Book;
	readonly insightCount: number;
}

export function BookCard({ book, insightCount }: BookCardProps) {
	const formattedUpdatedAt = formatDate(book.updatedAt);

	return (
		<Card className="bg-card border-border">
			<CardContent className="p-4">
				<Text className="text-2xl font-semibold text-foreground mb-1 leading-tight">
					{book.title}
				</Text>
				<Text className="text-sm text-muted-foreground mb-3 font-medium">
					by {book.author}
				</Text>
				<View className="flex-row justify-between items-center">
					<Text className="text-xs text-primary font-medium">
						{insightCount} insights
					</Text>
					<Text className="text-xs text-muted-foreground">
						{formattedUpdatedAt}
					</Text>
				</View>
			</CardContent>
		</Card>
	);
}
