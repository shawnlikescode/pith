export type InsightType = "thought" | "quote" | "idea" | "question";

export interface AddInsightFormData {
	insightType: InsightType;
	insight: string;
	source: string;
	author: string;
	pageNumber: string;
	tags: string[];
}

export interface FormValidationError {
	field: keyof AddInsightFormData;
	message: string;
}
