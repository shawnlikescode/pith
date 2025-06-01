import React from "react";
import { View } from "react-native";
import { EntryWithBook } from "../hooks/use-entries-with-books";
import { formatDate, truncateText } from "../utils/data-utils";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";

interface EntryCardProps {
	entry: EntryWithBook;
	passageMaxLength?: number;
	noteMaxLength?: number;
}

export const EntryCard = ({
	entry,
	passageMaxLength = 120,
	noteMaxLength = 150,
}: EntryCardProps) => {
	return (
		<Card className="w-full mb-4">
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
							"{truncateText(entry.passage, passageMaxLength)}"
						</Text>
					</View>
				)}

				<View className="mb-2">
					<Text className="text-sm text-gray-800">
						{truncateText(entry.note, noteMaxLength)}
					</Text>
				</View>

				<Text className="text-xs text-gray-500">
					{formatDate(entry.createdAt)}
				</Text>
			</CardContent>
		</Card>
	);
};
