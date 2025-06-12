import type { Book } from "./book";

type Category = "thought" | "question" | "idea" | "quote";

export type FlexibleCategory = Category | (string & {});

type Tag =
	| "personal"
	| "work"
	| "family"
	| "health"
	| "finance"
	| "relationship";

export type FlexibleTag = Tag | (string & {});

// Base insight interface with common properties
interface BaseInsight {
	readonly id: string;
	readonly bookId: string;
	readonly createdAt: string;
	location: string; // page number, chapter, etc.
	tags: FlexibleTag[];
}

// Quote insights use excerpts (the actual quoted text)
interface QuoteInsight extends BaseInsight {
	category: "quote";
	excerpt: string; // Required for quotes
	note?: string; // Optional additional thoughts about the quote
}

// User-generated insights use notes
interface UserInsight extends BaseInsight {
	category: "thought" | "question" | "idea";
	note: string; // Required for user thoughts/questions/ideas
	excerpt?: string; // Optional if referencing specific text
}

export type Insight = QuoteInsight | UserInsight;

export type InsightWithBook = Insight & {
	book: Book;
};

export interface BookWithInsights extends Book {
	insights: Insight[];
}
