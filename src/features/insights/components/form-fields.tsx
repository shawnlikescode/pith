import React from "react";
import { View, Text, TextInput } from "react-native";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { type LucideIcon } from "~/lib/icons/icons";
import { useFieldContext } from "../hooks/form-context";
import { cn } from "~/lib/utils";

interface BaseFieldProps {
	label: string;
	className?: string;
}

interface TextFieldProps extends BaseFieldProps {
	placeholder: string;
	Icon?: LucideIcon;
	keyboardType?: "default" | "numeric";
	returnKeyType?: "next" | "done";
	autoFocus?: boolean;
	onSubmitEditing?: () => void;
	textInputRef?: React.RefObject<TextInput>;
}

interface TextareaFieldProps extends BaseFieldProps {
	placeholder: string;
}

const formatErrors = (errors: any[]): string => {
	return errors
		.map((error) => {
			if (typeof error === "string") {
				return error;
			}
			if (error && typeof error === "object") {
				return error.message || error.toString();
			}
			return String(error);
		})
		.join(", ");
};

export function TextField({
	label,
	placeholder,
	Icon,
	keyboardType = "default",
	returnKeyType = "next",
	className = "mb-6",
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
						size={18}
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
	className = "mb-6",
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
