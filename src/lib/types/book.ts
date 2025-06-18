import type { BaseEntity } from ".";

export interface Book extends BaseEntity {
	title: string;
	author: string;
	coverUrl?: string;
	description?: string;
	publishedOn?: string;
	isbn?: string;
	pageCount?: number;
	language?: string;
	publisher?: string;
	genres?: string[];
	rating?: number;
	url?: string;
	notes?: string;
	lastReadOn?: string;
}
