import { createFormHook } from "@tanstack/react-form";
import {
	fieldContext,
	formContext,
} from "~/features/insights/hooks/form-context";
import {
	TextField,
	TextareaField,
} from "~/features/insights/components/form-fields";
import { SubmitButton } from "~/features/insights/components/submit-button";
import { InsightTypeSelector } from "~/features/insights/components/insight-type-selector";
import { TagManager } from "~/features/insights/components/tag-manager";
import {
	addInsightFormSchema,
	type AddInsightFormData,
} from "~/features/insights/types/form-schema";

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
