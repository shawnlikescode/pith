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

export interface Insight {
	id: string;
	bookId: string;
	location: string; // page number, chapter, etc.
	excerpt?: string; // the actual text passage
	note?: string; // user's thoughts/notes
	category: FlexibleCategory;
	tags: FlexibleTag[];
	createdAt: string;
}

export interface InsightWithBook extends Insight {
	book: Book;
}

export interface BookWithInsights extends Book {
	insights: Insight[];
}

// Export aliases for backward compatibility
export type Entry = Insight;
export type EntryWithBook = InsightWithBook;
export type { FlexibleCategory, FlexibleTag };
