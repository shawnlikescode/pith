export interface Book {
	id: string;
	title: string;
	author: string;
	createdAt: string;
}

type Category = "thought" | "question" | "idea" | "quote";

type FlexibleCategory = Category | (string & {});

type Tag =
	| "personal"
	| "work"
	| "family"
	| "health"
	| "finance"
	| "relationship";

type FlexibleTag = Tag | (string & {});

// Base insight interface with common properties
interface BaseInsight {
	id: string;
	bookId: string;
	location: string; // page number, chapter, etc.
	tags: FlexibleTag[];
	createdAt: string;
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

// Discriminated union of insight types
export type Insight = QuoteInsight | UserInsight;

export type InsightWithBook = Insight & {
	book: Book;
};

export interface BookWithInsights extends Book {
	insights: Insight[];
}

export type { FlexibleCategory, FlexibleTag };
