import React from "react";
import { View } from "react-native";
import type { TextInput } from "react-native";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Text } from "~/components/ui/text";
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
	const hasErrors = field.state.meta.errors.length > 0;

	return (
		<View className={className}>
			<Label className="text-sm font-medium text-foreground mb-2">
				{label}
			</Label>

			<View className="relative">
				{Icon && (
					<Icon
						size={ICON_SIZES.MEDIUM_LARGE}
						className="absolute left-3 text-muted-foreground z-10 top-1/2 -mt-[9px]"
					/>
				)}
				<Input
					ref={textInputRef}
					value={field.state.value}
					onChangeText={field.handleChange}
					onBlur={field.handleBlur}
					placeholder={placeholder}
					className={cn(
						"text-base",
						Icon ? "pl-10" : "",
						hasErrors && "border-destructive"
					)}
					keyboardType={keyboardType}
					returnKeyType={returnKeyType}
					autoFocus={autoFocus}
					onSubmitEditing={onSubmitEditing}
				/>
			</View>

			{hasErrors && (
				<View className="mt-1">
					{field.state.meta.errors.map((error, index) => (
						<Text key={index} className="text-xs text-destructive">
							{error}
						</Text>
					))}
				</View>
			)}
		</View>
	);
}

export function TextareaField({
	label,
	placeholder,
	className,
}: TextareaFieldProps) {
	const field = useFieldContext<string>();
	const hasErrors = field.state.meta.errors.length > 0;

	return (
		<View className={className}>
			<Label className="text-sm font-medium text-foreground mb-2">
				{label}
			</Label>

			<Textarea
				value={field.state.value}
				onChangeText={field.handleChange}
				onBlur={field.handleBlur}
				placeholder={placeholder}
				textAlignVertical="top"
				className={cn(
					"min-h-[100px] text-base",
					hasErrors && "border-destructive"
				)}
			/>

			{hasErrors && (
				<View className="mt-1">
					{field.state.meta.errors.map((error, index) => (
						<Text key={index} className="text-xs text-destructive">
							{error}
						</Text>
					))}
				</View>
			)}
		</View>
	);
}
