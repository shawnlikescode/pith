import React from "react";
import { View, TextInput } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
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
	const hasErrors = field.state.meta.errors.length > 0;

	function handleAddTag(): void {
		const value = newTag.trim().toLowerCase();

		// Check if we already have 5 tags
		if (field.state.value.length >= 5) {
			return;
		}

		// Check for empty tag
		if (!value) {
			return;
		}

		// Check for tag length
		if (value.length > 20) {
			return;
		}

		// Check for duplicate
		if (field.state.value.includes(value)) {
			setNewTag("");
			return;
		}

		field.pushValue(value);
		setNewTag("");
	}

	function handleRemoveTag(index: number): void {
		field.removeValue(index);
	}

	const isMaxTagsReached = field.state.value.length >= 5;
	const isDuplicate =
		newTag.trim().toLowerCase() &&
		field.state.value.includes(newTag.trim().toLowerCase());
	const isTooLong = newTag.trim().length > 20;

	const getPlaceholderText = (): string => {
		if (isMaxTagsReached) return "Maximum 5 tags reached";
		if (isDuplicate) return "Tag already exists";
		if (isTooLong) return "Tag too long (max 20 chars)";
		return "Add a tag";
	};

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
						placeholder={getPlaceholderText()}
						className={cn(
							"text-base pl-10",
							(hasErrors || isDuplicate || isTooLong) && "border-destructive"
						)}
						returnKeyType="done"
						onSubmitEditing={handleAddTag}
						editable={!isMaxTagsReached}
					/>
				</View>
				<Button
					onPress={handleAddTag}
					className="absolute -right-1 bg-transparent p-2"
					disabled={
						isMaxTagsReached || !newTag.trim() || isDuplicate || isTooLong
					}
				>
					<Plus
						className={cn(
							isMaxTagsReached || !newTag.trim() || isDuplicate || isTooLong
								? "text-muted-foreground"
								: "text-primary"
						)}
						size={ICON_SIZES.MEDIUM_LARGE}
					/>
				</Button>
			</View>

			{/* Validation Messages */}
			{(hasErrors || isDuplicate || isTooLong) && (
				<View className="mb-2">
					{isDuplicate && (
						<Text className="text-xs text-destructive">
							This tag already exists
						</Text>
					)}
					{isTooLong && (
						<Text className="text-xs text-destructive">
							Tag must be 20 characters or less
						</Text>
					)}
					{hasErrors &&
						field.state.meta.errors.map((error, index) => (
							<Text key={index} className="text-xs text-destructive">
								{error}
							</Text>
						))}
				</View>
			)}

			{/* Tag Display */}
			<View className="min-h-[24px]">
				{field.state.value.length > 0 && (
					<View className="flex-row flex-wrap gap-2">
						{field.state.value.map((tag, index) => (
							<TagChip
								key={`tag-${tag}-${index}`}
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
