import { createFormHook } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { fieldContext, formContext } from "./form-context";
import { TextField, TextareaField } from "../components/form-fields";
import { SubmitButton } from "../components/submit-button";
import { InsightTypeSelector } from "../components/insight-type-selector";
import { TagManager } from "../components/tag-manager";
import {
	addEntryFormSchema,
	type AddEntryFormData,
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
	validatorAdapter: zodValidator(),
	validators: {
		onSubmit: addEntryFormSchema,
	},
	defaultValues: {
		insightType: "thought",
		insight: "",
		source: "",
		author: "",
		pageNumber: "",
		tags: [],
	} as AddEntryFormData,
};
