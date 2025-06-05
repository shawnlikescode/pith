import React from "react";
import { View } from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import type { InsightWithBook, Insight } from "../types";
import { formatDate, truncateText } from "../utils/data-utils";
import {
	MessageSquare,
	CircleHelp,
	Lightbulb,
	Quote,
	BookOpen,
	Calendar,
	Book,
	User,
	LocateFixed,
	Hash,
} from "~/lib/icons/icons";
import { cn } from "~/lib/utils";

interface InsightCardProps {
	insight: InsightWithBook;
	passageMaxLength?: number;
	noteMaxLength?: number;
}

export default function InsightCard({
	insight,
	passageMaxLength = 120,
	noteMaxLength = 150,
}: InsightCardProps) {
	return (
		<Card className="w-full mb-4 border-blue-300 bg-white">
			<CardContent className="pr-2 pl-2 pt-4 pb-4">
				<View className="flex flex-row justify-between items-center pl-2 pr-2 gap-8">
					<View className="flex flex-row items-center gap-2">
						<CategoryIcon
							insight={insight}
							className="text-blue-500"
							size={10}
						/>
						<Text className="text-xs font-semibold text-blue-500 leading-3">
							{insight.category}
						</Text>
					</View>
					<View className="flex flex-row items-center gap-2">
						<Calendar className="text-blue-500 -mt-0.5" size={10} />
						<Text className="text-xs text-blue-500 leading-3">
							{formatDate(insight.createdAt)}
						</Text>
					</View>
				</View>
				<View className="flex flex-row gap-2 mt-2">
					<Text className="text-sm text-gray-700 leading-4 p-2">
						{insight.category === "quote"
							? truncateText(`"${insight.excerpt}"`, noteMaxLength)
							: truncateText(insight.note ?? "", noteMaxLength)}
					</Text>
				</View>
				<View className="flex flex-row gap-4 mt-1 pl-2">
					<View className="flex flex-row gap-2">
						<Book className="text-gray-700" size={10} />
						<Text className="text-xs text-gray-700 font-medium leading-3">
							{insight.book.title}
						</Text>
					</View>
					<View className="flex flex-row gap-2">
						<User className="text-gray-700" size={10} />
						<Text className="text-xs text-gray-700 font-medium leading-3">
							{insight.book.author}
						</Text>
					</View>
					<View className="flex flex-row gap-2">
						<LocateFixed className="text-gray-700" size={10} />
						<Text className="text-xs text-gray-700 font-medium leading-3">
							p. {insight.location}
						</Text>
					</View>
				</View>
				<View className="flex flex-row gap-2 mt-6 items-center pl-2">
					<Hash className="text-blue-500" size={10} />
					{insight.tags.map((tag, index) => (
						<Text
							key={index}
							className="text-blue-500 font-normal text-xs leading-none"
						>
							{tag}
						</Text>
					))}
				</View>
			</CardContent>
		</Card>
	);
}

function CategoryIcon(props: {
	insight: Insight;
	className: string;
	size: number;
}) {
	const iconProps = {
		className: props.className,
		size: props.size,
	};

	switch (props.insight.category) {
		case "thought":
			return <MessageSquare {...iconProps} />;
		case "question":
			return <CircleHelp {...iconProps} />;
		case "idea":
			return <Lightbulb {...iconProps} />;
		case "quote":
			return <Quote {...iconProps} />;
		default:
			return <BookOpen {...iconProps} />;
	}
}
