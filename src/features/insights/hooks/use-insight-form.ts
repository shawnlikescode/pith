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
import type { AddInsightFormData } from "../types/form-schema";

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

// Export default form options without Zod submit validation
export const defaultFormOptions = {
	defaultValues: {
		insightType: "thought" as const,
		insight: "",
		source: "",
		author: "",
		pageNumber: "",
		tags: [],
	} satisfies AddInsightFormData,
};
