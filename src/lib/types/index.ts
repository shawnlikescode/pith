export interface BaseEntity {
	id: string;
	createdAt: string;
	updatedAt: string;
}

export type Category = "thought" | "question" | "idea" | "quote";
export type FlexibleCategory = Category | (string & {});

export type Tag =
	| "personal"
	| "work"
	| "family"
	| "health"
	| "finance"
	| "relationship";

export type FlexibleTag = Tag | (string & {});
