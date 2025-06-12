import React from "react";
import {
	View,
	ScrollView,
	KeyboardAvoidingView,
	type TextInput,
} from "react-native";
import { Label } from "~/components/ui/label";
import { Book, User } from "~/lib/icons/icons";
import { useAppForm, defaultFormOptions } from "../hooks/use-insight-form";
import { useFormSubmission } from "../hooks/use-form-submission";
import {
	FORM_LABELS,
	FORM_PLACEHOLDERS,
	FORM_CONFIG,
} from "../constants/form-constants";

export function AddInsightForm() {
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
			<KeyboardAvoidingView
				className="flex-1"
				behavior={FORM_CONFIG.KEYBOARD_BEHAVIOR}
			>
				<View className="flex-1 pr-4 pl-4">
					<ScrollView
						keyboardShouldPersistTaps={
							FORM_CONFIG.SCROLL_PROPS.keyboardShouldPersistTaps
						}
						showsVerticalScrollIndicator={
							FORM_CONFIG.SCROLL_PROPS.showsVerticalScrollIndicator
						}
						contentInsetAdjustmentBehavior={
							FORM_CONFIG.SCROLL_PROPS.contentInsetAdjustmentBehavior
						}
						className="flex-1"
						keyboardDismissMode={FORM_CONFIG.SCROLL_PROPS.keyboardDismissMode}
					>
						{/* Type of Insight */}
						<View className="flex flex-col gap-4">
							<View>
								<Label className="text-lg font-medium text-gray-900 mb-4">
									{FORM_LABELS.TYPE_OF_INSIGHT}
								</Label>
								<form.AppField
									name="insightType"
									children={(field) => <field.InsightTypeSelector />}
								/>
							</View>

							{/* Your Insight */}
							<View>
								<form.Subscribe
									selector={(state) => state.values.insightType}
									children={(insightType) => (
										<form.AppField
											name="insight"
											children={(field) => (
												<field.TextareaField
													label={
														insightType === "quote"
															? FORM_LABELS.QUOTE
															: FORM_LABELS.YOUR_INSIGHT
													}
													placeholder={
														insightType === "quote"
															? FORM_PLACEHOLDERS.QUOTE
															: FORM_PLACEHOLDERS.INSIGHT
													}
												/>
											)}
										/>
									)}
								/>
							</View>

							{/* Source and Page # */}
							<View className="flex-row gap-4">
								<form.AppField
									name="source"
									children={(field) => (
										<View className="flex-1">
											<field.TextField
												label={FORM_LABELS.SOURCE}
												placeholder={FORM_PLACEHOLDERS.SOURCE}
												Icon={Book}
												returnKeyType="next"
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
												label={FORM_LABELS.PAGE_NUMBER}
												placeholder={FORM_PLACEHOLDERS.PAGE_NUMBER}
												keyboardType="numeric"
												returnKeyType="next"
												textInputRef={pageNumberRef}
												onSubmitEditing={() => authorRef.current?.focus()}
											/>
										</View>
									)}
								/>
							</View>

							{/* Author */}
							<View>
								<form.AppField
									name="author"
									children={(field) => (
										<field.TextField
											label={FORM_LABELS.AUTHOR}
											placeholder={FORM_PLACEHOLDERS.AUTHOR}
											Icon={User}
											returnKeyType="next"
											textInputRef={authorRef}
											onSubmitEditing={() => tagRef.current?.focus()}
										/>
									)}
								/>
							</View>

							{/* Tags */}
							<View>
								<Label className="text-lg font-medium text-gray-900 mb-2">
									{FORM_LABELS.TAGS}
								</Label>
								<form.AppField
									name="tags"
									children={(field) => (
										<field.TagManager textInputRef={tagRef} />
									)}
								/>
							</View>
						</View>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
			<View className="p-4">
				<form.AppForm>
					<form.SubmitButton label={FORM_LABELS.SAVE} />
				</form.AppForm>
			</View>
		</>
	);
}
