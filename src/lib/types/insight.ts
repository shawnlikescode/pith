import type { BaseEntity, FlexibleCategory, FlexibleTag } from ".";
import type { Book } from "./book";

export interface BaseInsight extends BaseEntity {
	readonly bookId: string;
	readonly location: string;
	readonly tags: FlexibleTag[];
	readonly category: FlexibleCategory;
}

export interface QuoteInsight extends BaseInsight {
	readonly category: "quote";
	readonly excerpt: string; // The direct quote from the source
	readonly note?: string; // Optional user thoughts about the quote
}

export interface ReflectionInsight extends BaseInsight {
	readonly category: "thought" | "idea" | "question";
	readonly note: string; // User's reflection/thoughts
	readonly excerpt?: string; // Optional related text from source
}

export type Insight = QuoteInsight | ReflectionInsight;

// Helper type for insights with book data attached
export type InsightWithBook = Insight & {
	readonly book: Book;
};
