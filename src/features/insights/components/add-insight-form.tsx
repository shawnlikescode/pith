import React from "react";
import {
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	type TextInput,
} from "react-native";
import { Label } from "~/components/ui/label";
import { Book, User } from "~/lib/icons/icons";
import { useAppForm, defaultFormOptions } from "../hooks/use-insight-form";
import { useFormSubmission } from "../hooks/use-form-submission";

export default function AddEntryForm() {
	const { submitForm } = useFormSubmission();

	const sourceRef = React.useRef<TextInput>(null!);
	const pageNumberRef = React.useRef<TextInput>(null!);
	const authorRef = React.useRef<TextInput>(null!);
	const tagRef = React.useRef<TextInput>(null!);

	const form = useAppForm({
		...defaultFormOptions,
		onSubmit: async ({ value }) => {
			const insight = await submitForm(value);
			if (insight) {
				form.reset();
			}
		},
	});

	return (
		<>
			<KeyboardAvoidingView className="flex-auto" behavior={"padding"}>
				<View className="flex-1 pr-4 pl-4">
					<ScrollView
						keyboardShouldPersistTaps="handled"
						showsVerticalScrollIndicator={false}
						contentInsetAdjustmentBehavior="automatic"
						contentContainerStyle={{ flexGrow: 1 }}
						keyboardDismissMode="interactive"
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
											textInputRef={sourceRef}
											onSubmitEditing={() => pageNumberRef.current?.focus()}
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
											textInputRef={pageNumberRef}
											onSubmitEditing={() => authorRef.current?.focus()}
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
									textInputRef={authorRef}
									onSubmitEditing={() => tagRef.current?.focus()}
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
								children={(field) => <field.TagManager textInputRef={tagRef} />}
							/>
						</View>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
			<View className="p-4">
				<form.AppForm>
					<form.SubmitButton label="Save" />
				</form.AppForm>
			</View>
		</>
	);
}
