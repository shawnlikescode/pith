export interface Book {
	id: string;
	title: string;
	author: string;
	createdAt: string;
}

export interface Entry {
	id: string;
	bookId: string;
	location: string; // page number, chapter, etc.
	passage: string; // the actual text passage
	note: string; // user's thoughts/notes
	createdAt: string;
}

export interface BookWithEntries extends Book {
	entries: Entry[];
}
