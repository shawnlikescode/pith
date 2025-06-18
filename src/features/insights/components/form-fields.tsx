import React from "react";
import { View } from "react-native";
import type { TextInput } from "react-native";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useFieldContext } from "../hooks/form-context";
import { cn } from "~/lib/utils";
import { ICON_SIZES } from "~/lib/constants";
import type { LucideIcon } from "lucide-react-native";

interface BaseFieldProps {
	readonly label: string;
	readonly className?: string;
}

interface TextFieldProps extends BaseFieldProps {
	readonly placeholder: string;
	readonly Icon?: LucideIcon;
	readonly keyboardType?: "default" | "numeric";
	readonly returnKeyType?: "next" | "done";
	readonly autoFocus?: boolean;
	readonly onSubmitEditing?: () => void;
	readonly textInputRef?: React.RefObject<TextInput>;
}

interface TextareaFieldProps extends BaseFieldProps {
	readonly placeholder: string;
}

export function TextField({
	label,
	placeholder,
	Icon,
	keyboardType = "default",
	returnKeyType = "next",
	className,
	autoFocus = false,
	onSubmitEditing,
	textInputRef,
}: TextFieldProps) {
	const field = useFieldContext<string>();

	return (
		<View className={className}>
			<View className="flex flex-row justify-between">
				<Label className="text-sm font-medium text-gray-900 mb-2">
					{label}
				</Label>
			</View>

			<View className="relative">
				{Icon && (
					<Icon
						size={ICON_SIZES.MEDIUM_LARGE}
						className="absolute left-3 text-gray-500 z-10 top-1/2 -mt-[9px]"
					/>
				)}
				<Input
					ref={textInputRef}
					value={field.state.value}
					onChangeText={field.handleChange}
					onBlur={field.handleBlur}
					placeholder={placeholder}
					className={cn(
						"text-base bg-transparent border-blue-200 focus:border-blue-700",
						Icon ? "pl-10" : "",
						field.state.meta.errors.length > 0 && "border-red-500"
					)}
					keyboardType={keyboardType}
					returnKeyType={returnKeyType}
					autoFocus={autoFocus}
					onSubmitEditing={onSubmitEditing}
				/>
			</View>
		</View>
	);
}

export function TextareaField({
	label,
	placeholder,
	className,
}: TextareaFieldProps) {
	const field = useFieldContext<string>();

	return (
		<View className={className}>
			<View className="flex flex-row justify-between">
				<Label className="text-sm font-medium text-gray-900 mb-2">
					{label}
				</Label>
			</View>

			<Textarea
				value={field.state.value}
				onChangeText={field.handleChange}
				onBlur={field.handleBlur}
				placeholder={placeholder}
				textAlignVertical="top"
				className={cn(
					"min-h-[100px] text-base bg-transparent border-blue-200 focus:border-blue-700",
					field.state.meta.errors.length > 0 && "border-red-500"
				)}
			/>
		</View>
	);
}
