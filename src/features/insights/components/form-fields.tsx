import React from "react";
import { View, Text } from "react-native";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { type LucideIcon } from "~/lib/icons/icons";
import { useFieldContext } from "../hooks/form-context";

interface BaseFieldProps {
	label: string;
	className?: string;
}

interface TextFieldProps extends BaseFieldProps {
	placeholder: string;
	Icon?: LucideIcon;
	keyboardType?: "default" | "numeric";
	returnKeyType?: "next" | "done";
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
}: TextFieldProps) {
	const field = useFieldContext<string>();

	return (
		<View className={className}>
			<Label className="text-lg font-medium text-gray-900 mb-2">{label}</Label>

			<View className="relative">
				{Icon && (
					<Icon
						size={18}
						className="absolute left-3 text-gray-500 z-10"
						style={{ top: "50%", marginTop: -9 }}
					/>
				)}
				<Input
					value={field.state.value}
					onChangeText={field.handleChange}
					onBlur={field.handleBlur}
					placeholder={placeholder}
					className={`text-base bg-transparent focus:border-blue-700 ${
						Icon ? "pl-10" : ""
					}`}
					keyboardType={keyboardType}
					returnKeyType={returnKeyType}
				/>
			</View>

			{field.state.meta.errors.length > 0 && (
				<Text className="text-red-500 text-sm mt-1">
					{formatErrors(field.state.meta.errors)}
				</Text>
			)}
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
			<Label className="text-lg font-medium text-gray-900 mb-2">{label}</Label>

			<Textarea
				value={field.state.value}
				onChangeText={field.handleChange}
				onBlur={field.handleBlur}
				placeholder={placeholder}
				textAlignVertical="top"
				className="min-h-[100px] text-base bg-transparent focus:border-blue-700"
			/>

			{field.state.meta.errors.length > 0 && (
				<Text className="text-red-500 text-sm mt-1">
					{formatErrors(field.state.meta.errors)}
				</Text>
			)}
		</View>
	);
}
