import React from "react";
import {
	View,
	Text,
	Alert,
	TouchableWithoutFeedback,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { useForm } from "@tanstack/react-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { useKeyboard } from "~/lib/hooks/keyboard";

interface AddEntryFormData {
	bookTitle: string;
	author: string;
	location: string;
	passage: string;
	note: string;
}

export const AddEntryForm: React.FC = () => {
	const { isKeyboardVisible, keyboardHeight, dismissKeyboard } = useKeyboard();

	console.log({ isKeyboardVisible, keyboardHeight });

	const form = useForm({
		defaultValues: {
			bookTitle: "",
			author: "",
			location: "",
			passage: "",
			note: "",
		} as AddEntryFormData,
		onSubmit: async ({ value }) => {
			try {
				// Dismiss keyboard first
				dismissKeyboard();

				// Validate required fields
				if (
					!value.bookTitle.trim() ||
					!value.author.trim() ||
					!value.location.trim() ||
					!value.passage.trim()
				) {
					Alert.alert(
						"Missing Fields",
						"Please fill in Book Title, Author, Location, and Passage fields."
					);
					return;
				}

				console.log(value);

				// Reset form
				form.reset();
			} catch (error) {
				console.error("Error saving entry:", error);
				Alert.alert("Error", "Failed to save entry. Please try again.");
			}
		},
	});

	return (
		<KeyboardAvoidingView
			className="flex-1"
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<TouchableWithoutFeedback onPress={dismissKeyboard}>
				<View className="flex-1 px-4 h-full">
					<ScrollView
						showsVerticalScrollIndicator={false}
						keyboardShouldPersistTaps="handled"
					>
						<View className="mb-6">
							<Text className="text-2xl font-bold mb-2">Add Thought</Text>
						</View>

						<View className="flex flex-col gap-4">
							<form.Field
								name="bookTitle"
								validators={{
									onChange: ({ value }) => {
										console.log({ value });

										if (value.length < 1) {
											return "Title is required";
										}
									},
								}}
								children={(field) => (
									<View className="flex flex-col gap-4">
										<Label className="text-sm font-medium text-gray-700">
											Title
										</Label>
										<Input
											value={field.state.value}
											onChangeText={field.handleChange}
											onBlur={field.handleBlur}
											placeholder="Title"
											returnKeyType="next"
										/>
										{field.state.meta.errors.length > 0 && (
											<Text className="text-red-500 text-sm">
												{field.state.meta.errors.join(", ")}
											</Text>
										)}
									</View>
								)}
							/>

							<form.Field
								name="author"
								validators={{
									onChange: ({ value }) => {
										if (value.length < 1) {
											return "Author is required";
										}
									},
								}}
								children={(field) => (
									<View className="flex flex-col gap-4">
										<Label className="text-sm font-medium text-gray-700">
											Author
										</Label>
										<Input
											value={field.state.value}
											onChangeText={field.handleChange}
											onBlur={field.handleBlur}
											placeholder="Author"
										/>
										{field.state.meta.errors.length > 0 && (
											<Text className="text-red-500 text-sm">
												{field.state.meta.errors.join(", ")}
											</Text>
										)}
									</View>
								)}
							/>

							<form.Field
								name="location"
								validators={{
									onChange: ({ value }) => {
										if (value.length < 1) {
											return "Location is required";
										}
									},
								}}
								children={(field) => (
									<View className="flex flex-col gap-4">
										<Label className="text-sm font-medium text-gray-700">
											Location
										</Label>
										<Input
											value={field.state.value}
											onChangeText={field.handleChange}
											onBlur={field.handleBlur}
											placeholder="Page 42, Chapter 3"
											returnKeyType="next"
										/>
										{field.state.meta.errors.length > 0 && (
											<Text className="text-red-500 text-sm">
												{field.state.meta.errors.join(", ")}
											</Text>
										)}
									</View>
								)}
							/>

							<form.Field
								name="passage"
								validators={{
									onChange: ({ value }) => {
										if (value.length < 1) {
											return "Passage is required";
										}
									},
								}}
								children={(field) => (
									<View className="flex flex-col gap-4">
										<Label className="text-sm font-medium text-gray-700">
											Passage
										</Label>
										<Textarea
											value={field.state.value}
											onChangeText={field.handleChange}
											onBlur={field.handleBlur}
											placeholder="I urge you to please notice when you are happy..."
											textAlignVertical="top"
										/>
										{field.state.meta.errors.length > 0 && (
											<Text className="text-red-500 text-sm">
												{field.state.meta.errors.join(", ")}
											</Text>
										)}
									</View>
								)}
							/>

							<form.Field
								name="note"
								validators={{
									onChange: ({ value }) => {
										if (value.length < 1) {
											return "Note is required";
										}
									},
								}}
								children={(field) => (
									<View className="flex flex-col gap-4">
										<Label className="text-sm font-medium text-gray-700">
											Your Note
										</Label>
										<Textarea
											value={field.state.value}
											onChangeText={field.handleChange}
											onBlur={field.handleBlur}
											placeholder="What are you thinking?"
											multiline
										/>
										{field.state.meta.errors.length > 0 && (
											<Text className="text-red-500 text-sm">
												{field.state.meta.errors.join(", ")}
											</Text>
										)}
									</View>
								)}
							/>
						</View>
					</ScrollView>

					<form.Subscribe
						selector={(state) => state.isSubmitting}
						children={(isSubmitting) => (
							<Button
								onPress={form.handleSubmit}
								disabled={isSubmitting}
								className={cn(
									"mt-6 mb-8 bg-primary",
									isSubmitting ? "opacity-50" : "opacity-100"
								)}
							>
								<Text className="text-primary-foreground text-center text-base font-semibold">
									{isSubmitting ? "Saving..." : "Save Entry"}
								</Text>
							</Button>
						)}
					/>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};
