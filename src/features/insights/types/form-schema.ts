import { z } from "zod";

export const insightTypeSchema = z.enum([
	"thought",
	"quote",
	"idea",
	"question",
]);

// Base form fields that are common to all insight types
const baseFormSchema = z.object({
	source: z.string().min(1, "Source is required"),
	author: z.string().min(1, "Author is required"),
	pageNumber: z.string().min(1, "Page number is required"),
	tags: z.array(z.string().min(1).max(20)).max(5, "Maximum 5 tags allowed"),
});

// Discriminated union schema for different insight types
export const addInsightFormSchema = z.discriminatedUnion("insightType", [
	// Quote insights - the insight text becomes an excerpt
	baseFormSchema.extend({
		insightType: z.literal("quote"),
		insight: z.string().min(1, "Quote text is required"),
	}),
	// User insights (thought, idea, question) - the insight text becomes a note
	baseFormSchema.extend({
		insightType: z.enum(["thought", "idea", "question"]),
		insight: z.string().min(1, "Insight is required"),
	}),
]);

export type AddInsightFormData = z.infer<typeof addInsightFormSchema>;
export type InsightType = z.infer<typeof insightTypeSchema>;

// Schema for the actual Insight data structure (matches our discriminated union)
const baseInsightSchema = z.object({
	id: z.string(),
	bookId: z.string(),
	location: z.string(),
	tags: z.array(z.string()),
	createdAt: z.string(),
});

export const insightDataSchema = z.discriminatedUnion("category", [
	// Quote insights have required excerpt, optional note
	baseInsightSchema.extend({
		category: z.literal("quote"),
		excerpt: z.string().min(1),
		note: z.string().optional(),
	}),
	// User insights have required note, optional excerpt
	baseInsightSchema.extend({
		category: z.enum(["thought", "idea", "question"]),
		note: z.string().min(1),
		excerpt: z.string().optional(),
	}),
]);

export type InsightData = z.infer<typeof insightDataSchema>;
