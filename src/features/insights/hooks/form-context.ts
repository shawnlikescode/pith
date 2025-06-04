import { createFormHookContexts } from "@tanstack/react-form";

// Export contexts for use in custom components
export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();
