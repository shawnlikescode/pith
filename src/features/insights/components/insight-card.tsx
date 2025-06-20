import React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent } from "~/components/ui/card";
import { formatDate, truncateText } from "~/lib/utils";
import { TEXT_LIMITS } from "~/lib/constants";
import type { InsightWithBook } from "~/lib/types/insight";

interface InsightCardProps {
	readonly insight: InsightWithBook;
	readonly passageMaxLength?: number;
	readonly noteMaxLength?: number;
}

export function InsightCard({
	insight,
	passageMaxLength = TEXT_LIMITS.PASSAGE_MAX_LENGTH,
	noteMaxLength = TEXT_LIMITS.NOTE_MAX_LENGTH,
}: InsightCardProps) {
	const contentToDisplay =
		insight.category === "quote" ? insight.excerpt : insight.note;

	const maxLength =
		insight.category === "quote" ? passageMaxLength : noteMaxLength;

	const getMetadataText = (): string => {
		const parts: string[] = [];
		if (insight.location) {
			parts.push(`Page ${insight.location}`);
		}
		parts.push(formatDate(insight.createdAt));
		return parts.join(" • ");
	};

	const truncatedContent = truncateText(contentToDisplay, maxLength);

	// Defensive check for book title and author
	const bookTitle = insight?.book?.title;
	const bookAuthor = insight?.book?.author;

	// Ensure we have string values
	const safeBookTitle =
		typeof bookTitle === "string" ? bookTitle : "Untitled Book";
	const safeBookAuthor =
		typeof bookAuthor === "string" ? bookAuthor : "Unknown Author";
	const safeCategory =
		typeof insight.category === "string" ? insight.category : "unknown";
	const safeContent =
		typeof truncatedContent === "string" ? truncatedContent : "";

	// Pre-calculate strings to avoid array children
	const authorText = `by ${safeBookAuthor}`;
	const displayContent =
		insight.category === "quote" ? `"${safeContent}"` : safeContent;

	return (
		<Card className="bg-card border-border rounded-2xl">
			<CardContent className="p-6">
				{/* Book Title - 20px */}
				<Text className="text-xl font-bold text-foreground leading-tight mb-1">
					{safeBookTitle}
				</Text>

				{/* Author - 12px */}
				<Text className="text-xs text-muted-foreground font-normal mb-3">
					{`by ${safeBookAuthor}`}
				</Text>

				{/* Metadata Row - 12px with 70% opacity, category bold, page/date light */}
				<View className="flex flex-row items-center mb-4">
					<Text className="text-xs text-foreground font-bold capitalize opacity-70">
						{safeCategory}
					</Text>
					<Text className="text-xs text-foreground mx-1 opacity-70">•</Text>
					<Text className="text-xs text-foreground font-normal opacity-70">
						{getMetadataText()}
					</Text>
				</View>

				{/* Main Content - 12px */}
				<Text
					className="text-base text-foreground leading-5 mb-4"
					accessibilityLabel={`${safeCategory}: ${safeContent}`}
				>
					{displayContent}
				</Text>

				{/* Tags - 12px at 70% opacity */}
				{Array.isArray(insight.tags) && insight.tags.length > 0 && (
					<View className="flex flex-row flex-wrap gap-2">
						{insight.tags
							.filter((tag): tag is string => typeof tag === "string")
							.map((tag: string, index: number) => {
								const tagText = `#${tag}`;
								return (
									<Text
										key={`${tag}-${index}`}
										className="text-xs text-primary font-medium opacity-70"
										accessibilityLabel={`Tag: ${tag}`}
									>
										{tagText}
									</Text>
								);
							})}
					</View>
				)}
			</CardContent>
		</Card>
	);
}
