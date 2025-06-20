import React from "react";
import { View, TextInput } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Hash, Plus } from "~/lib/icons/icons";
import { useFieldContext } from "../hooks/form-context";
import { cn } from "~/lib/utils";
import { ICON_SIZES } from "~/lib/constants";
import { TagChip } from "./ui/tag-chip";

interface TagManagerProps {
	textInputRef?: React.RefObject<TextInput>;
}

export function TagManager({ textInputRef }: TagManagerProps) {
	const field = useFieldContext<string[]>();
	const [newTag, setNewTag] = React.useState("");

	function handleAddTag(): void {
		const value = newTag.trim().toLowerCase();

		// Check if we already have 5 tags
		if (field.state.value.length >= 5) {
			return;
		}

		if (field.state.value.includes(value)) {
			setNewTag("");
			return;
		}

		if (value) {
			field.pushValue(value);
			setNewTag("");
		}
	}

	function handleRemoveTag(index: number): void {
		field.removeValue(index);
	}

	const isMaxTagsReached = field.state.value.length >= 5;

	return (
		<View>
			{/* Tag Input */}
			<View className="flex-row items-center mb-4 relative">
				<View className="relative flex-1">
					<Hash
						size={ICON_SIZES.MEDIUM_LARGE}
						className="absolute left-3 text-muted-foreground z-10 top-1/2 -mt-[9px]"
					/>
					<Input
						ref={textInputRef}
						value={newTag}
						onChangeText={setNewTag}
						placeholder={
							isMaxTagsReached ? "Maximum 5 tags reached" : "Add a tag"
						}
						className={cn(
							"text-base pl-10",
							field.state.meta.errors.length > 0 && "border-destructive"
						)}
						returnKeyType="done"
						onSubmitEditing={handleAddTag}
						editable={!isMaxTagsReached}
					/>
				</View>
				<Button
					onPress={handleAddTag}
					className="absolute -right-1 bg-transparent p-2"
					disabled={isMaxTagsReached || !newTag.trim()}
				>
					<Plus
						className={cn(
							isMaxTagsReached || !newTag.trim()
								? "text-muted-foreground"
								: "text-primary"
						)}
						size={ICON_SIZES.MEDIUM_LARGE}
					/>
				</Button>
			</View>

			<View className="min-h-[24px]">
				{field.state.value.length > 0 && (
					<View className="flex-row flex-wrap gap-2">
						{field.state.value.map((tag, index) => (
							<TagChip
								key={`tag-${tag}-${field.state.value.length}`}
								label={tag}
								variant="removable"
								onPress={() => handleRemoveTag(index)}
							/>
						))}
					</View>
				)}
			</View>
		</View>
	);
}
