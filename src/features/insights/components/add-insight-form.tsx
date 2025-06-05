import React from "react";
import {
	View,
	TouchableWithoutFeedback,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Label } from "~/components/ui/label";
import { useKeyboard } from "~/lib/hooks/keyboard";
import { Book, User } from "~/lib/icons/icons";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { useAppForm, defaultFormOptions } from "../hooks/use-insight-form";
import { useFormSubmission } from "../hooks/use-form-submission";
import { cn } from "~/lib/utils";

export default function AddEntryForm() {
	const router = useRouter();
	const { isKeyboardVisible, keyboardHeight, dismissKeyboard } = useKeyboard();
	const { submitForm } = useFormSubmission();

	console.log({ isKeyboardVisible, keyboardHeight });

	const form = useAppForm({
		...defaultFormOptions,
		onSubmit: async ({ value }) => {
			const entry = await submitForm(value);
			if (entry) {
				form.reset();
			}
		},
	});

	const handleCancel = () => {
		router.back();
	};

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
						{/* Type of Insight */}
						<View className="pt-4 pb-4">
							<Label className="text-lg font-medium text-gray-900 mb-4">
								Type of Insight
							</Label>
							<form.AppField
								name="insightType"
								children={(field) => <field.InsightTypeSelector />}
							/>
						</View>

						{/* Your Insight */}
						<form.Subscribe
							selector={(state) => state.values.insightType}
							children={(insightType) => (
								<form.AppField
									name="insight"
									children={(field) => (
										<field.TextareaField
											label={insightType === "quote" ? "Quote" : "Your Insight"}
											placeholder={
												insightType === "quote"
													? "What excerpt from the source do you want to capture?"
													: "What insight or thought do you want to capture?"
											}
										/>
									)}
								/>
							)}
						/>

						{/* Source and Page # */}
						<View className="flex-row gap-4 mb-6">
							<form.AppField
								name="source"
								children={(field) => (
									<View className="flex-1">
										<field.TextField
											label="Source"
											placeholder="Book title, article, etc."
											Icon={Book}
											returnKeyType="next"
											className="mb-0"
										/>
									</View>
								)}
							/>

							<form.AppField
								name="pageNumber"
								children={(field) => (
									<View className="w-24">
										<field.TextField
											label="Page #"
											placeholder="123"
											keyboardType="numeric"
											returnKeyType="next"
											className="mb-0"
										/>
									</View>
								)}
							/>
						</View>

						{/* Author */}
						<form.AppField
							name="author"
							children={(field) => (
								<field.TextField
									label="Author"
									placeholder="Author name"
									Icon={User}
									returnKeyType="next"
								/>
							)}
						/>

						{/* Tags */}
						<View className="mb-6">
							<Label className="text-lg font-medium text-gray-900 mb-2">
								Tags
							</Label>
							<form.AppField
								name="tags"
								children={(field) => <field.TagManager />}
							/>
						</View>
					</ScrollView>

					{/* Cancel & Save Button */}
					<View className="flex-1 flex-row items-center justify-between gap-4">
						<View className="flex-1">
							<Button
								variant="outline"
								className="mt-6 mb-8 pt-4 pb-4 rounded-md bg-transparent border-blue-700"
								onPress={handleCancel}
							>
								<Text>Cancel</Text>
							</Button>
						</View>
						<View className="flex-1">
							<form.AppForm>
								<form.SubmitButton label="Save" />
							</form.AppForm>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
