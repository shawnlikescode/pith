import React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import type { FlexibleTag } from "~/lib/types";
import { TagChip } from "./ui/tag-chip";

interface TagFilterProps {
	readonly availableTags: FlexibleTag[];
	readonly selectedTags: FlexibleTag[];
	readonly onTagToggle: (tag: FlexibleTag) => void;
}

export function TagFilter({
	availableTags,
	selectedTags,
	onTagToggle,
}: TagFilterProps) {
	return (
		<View>
			{/* Available Tags */}
			{availableTags.length > 0 && (
				<View className="mb-4">
					<Text className="text-sm font-medium text-muted-foreground mb-2">
						Available Tags
					</Text>
					<View className="flex-row flex-wrap gap-2">
						{availableTags
							.filter((tag) => !selectedTags.includes(tag))
							.map((tag) => (
								<TagChip
									key={tag}
									label={tag}
									variant="available"
									onPress={() => onTagToggle(tag)}
								/>
							))}
					</View>
				</View>
			)}

			{/* Selected Tags */}
			{selectedTags.length > 0 && (
				<View>
					<Text className="text-sm font-medium text-muted-foreground mb-2">
						Selected Tags
					</Text>
					<View className="flex-row flex-wrap gap-2">
						{selectedTags.map((tag) => (
							<TagChip
								key={tag}
								label={tag}
								variant="selected"
								onPress={() => onTagToggle(tag)}
							/>
						))}
					</View>
				</View>
			)}

			{/* Empty State */}
			{availableTags.length === 0 && (
				<View className="pt-4 pb-4">
					<Text className="text-muted-foreground text-center">
						No tags available in your insights
					</Text>
				</View>
			)}
		</View>
	);
}
