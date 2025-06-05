import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./form-context";
import { TextField, TextareaField } from "../components/form-fields";
import { SubmitButton } from "../components/submit-button";
import { InsightTypeSelector } from "../components/insight-type-selector";
import { TagManager } from "../components/tag-manager";
import {
	addInsightFormSchema,
	type AddInsightFormData,
} from "../types/form-schema";

export const { useAppForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextField,
		TextareaField,
		InsightTypeSelector,
		TagManager,
	},
	formComponents: {
		SubmitButton,
	},
});

// Export default form options with Zod validation
export const defaultFormOptions = {
	validators: {
		onSubmit: addInsightFormSchema,
	},
	defaultValues: {
		insightType: "thought",
		insight: "",
		excerpt: "",
		source: "",
		author: "",
		pageNumber: "",
		tags: [],
	} as AddInsightFormData,
};
