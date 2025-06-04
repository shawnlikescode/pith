import { z } from "zod";

export const insightTypeSchema = z.enum([
	"thought",
	"quote",
	"idea",
	"question",
]);

export const addEntryFormSchema = z.object({
	insightType: insightTypeSchema,
	insight: z.string().min(1, "Insight is required"),
	source: z.string().min(1, "Source is required"),
	author: z.string().min(1, "Author is required"),
	pageNumber: z.string().min(1, "Page number is required"),
	tags: z.array(z.string().min(1).max(20)).max(5, "Maximum 5 tags allowed"),
});

export type AddEntryFormData = z.infer<typeof addEntryFormSchema>;
export type InsightType = z.infer<typeof insightTypeSchema>;
