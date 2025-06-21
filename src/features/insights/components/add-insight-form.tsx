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
import { formContext, fieldContext } from "../hooks/form-context";
import { TextField, TextareaField } from "./form-fields";
import { InsightTypeSelector } from "./insight-type-selector";
import { TagManager } from "./tag-manager";
import { SubmitButton } from "./submit-button";
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
		<formContext.Provider value={form}>
			<KeyboardAvoidingView
				className="flex-1"
				behavior={FORM_CONFIG.KEYBOARD_BEHAVIOR}
			>
				<View className="flex-1 px-4">
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
						<View className="flex flex-col gap-6 py-6">
							{/* Type of Insight */}
							<View>
								<Label className="text-lg font-semibold text-foreground mb-4">
									{FORM_LABELS.CATEGORY_OF_INSIGHT}
								</Label>
								<form.Field
									name="insightCategory"
									validators={{
										onChange: ({ value }) => {
											if (
												!["thought", "quote", "idea", "question"].includes(
													value
												)
											) {
												return "Please select a valid insight type";
											}
											return undefined;
										},
									}}
									children={(field) => (
										<fieldContext.Provider value={field}>
											<InsightTypeSelector />
										</fieldContext.Provider>
									)}
								/>
							</View>

							{/* Your Insight */}
							<View>
								<form.Subscribe
									selector={(state) => state.values.insightCategory}
									children={(insightCategory) => (
										<>
											{(insightCategory as any) === "quote" ? (
												<form.Field
													name="excerpt"
													validators={{
														onChange: ({ value }) => {
															if (!value || value.trim().length === 0) {
																return "Quote text is required";
															}
															return undefined;
														},
													}}
													children={(field) => (
														<fieldContext.Provider value={field}>
															<TextareaField
																label={FORM_LABELS.QUOTE}
																placeholder={FORM_PLACEHOLDERS.QUOTE}
															/>
														</fieldContext.Provider>
													)}
												/>
											) : (
												<form.Field
													name="note"
													validators={{
														onChange: ({ value }) => {
															if (!value || value.trim().length === 0) {
																return "Insight is required";
															}
															return undefined;
														},
													}}
													children={(field) => (
														<fieldContext.Provider value={field}>
															<TextareaField
																label={FORM_LABELS.YOUR_INSIGHT}
																placeholder={FORM_PLACEHOLDERS.INSIGHT}
															/>
														</fieldContext.Provider>
													)}
												/>
											)}
										</>
									)}
								/>
							</View>

							{/* Source and Page # */}
							<View className="flex-row gap-4">
								<form.Field
									name="source"
									validators={{
										onChange: ({ value }) => {
											if (!value || value.trim().length === 0) {
												return "Source is required";
											}
											return undefined;
										},
									}}
									children={(field) => (
										<fieldContext.Provider value={field}>
											<View className="flex-1">
												<TextField
													label={FORM_LABELS.SOURCE}
													placeholder={FORM_PLACEHOLDERS.SOURCE}
													Icon={Book}
													returnKeyType="next"
													textInputRef={sourceRef}
													onSubmitEditing={() => pageNumberRef.current?.focus()}
												/>
											</View>
										</fieldContext.Provider>
									)}
								/>

								<form.Field
									name="location"
									validators={{
										onChange: ({ value }) => {
											if (!value || value.trim().length === 0) {
												return "Page number is required";
											}
											const trimmed = value.trim();
											// Allow numbers, chapters, sections, etc.
											if (trimmed.length > 50) {
												return "Location must be 50 characters or less";
											}
											return undefined;
										},
									}}
									children={(field) => (
										<fieldContext.Provider value={field}>
											<View className="w-24">
												<TextField
													label={FORM_LABELS.LOCATION}
													placeholder={FORM_PLACEHOLDERS.LOCATION}
													keyboardType="default"
													returnKeyType="next"
													textInputRef={pageNumberRef}
													onSubmitEditing={() => authorRef.current?.focus()}
												/>
											</View>
										</fieldContext.Provider>
									)}
								/>
							</View>

							{/* Author */}
							<View>
								<form.Field
									name="author"
									validators={{
										onChange: ({ value }) => {
											if (!value || value.trim().length === 0) {
												return "Author is required";
											}
											return undefined;
										},
									}}
									children={(field) => (
										<fieldContext.Provider value={field}>
											<TextField
												label={FORM_LABELS.AUTHOR}
												placeholder={FORM_PLACEHOLDERS.AUTHOR}
												Icon={User}
												returnKeyType="next"
												textInputRef={authorRef}
												onSubmitEditing={() => tagRef.current?.focus()}
											/>
										</fieldContext.Provider>
									)}
								/>
							</View>

							{/* Tags */}
							<View>
								<Label className="text-lg font-semibold text-foreground mb-4">
									{FORM_LABELS.TAGS}
								</Label>
								<form.Field
									name="tags"
									validators={{
										onChange: ({ value }) => {
											if (value.length > 5) {
												return "Maximum 5 tags allowed";
											}
											for (const tag of value) {
												if (
													typeof tag !== "string" ||
													tag.trim().length === 0
												) {
													return "All tags must be non-empty strings";
												}
												if (tag.length > 20) {
													return "Tags must be 20 characters or less";
												}
											}
											return undefined;
										},
									}}
									children={(field) => (
										<fieldContext.Provider value={field}>
											<TagManager textInputRef={tagRef} />
										</fieldContext.Provider>
									)}
								/>
							</View>
						</View>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
			<View className="p-4 border-t border-border bg-background">
				<SubmitButton label={FORM_LABELS.SAVE} />
			</View>
		</formContext.Provider>
	);
}
