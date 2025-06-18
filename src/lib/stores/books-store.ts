import "react-native-get-random-values";
import { create } from "zustand";
import { nanoid } from "nanoid";
import { storageAdapter } from "~/lib/storage";
import type { Book } from "~/lib/types/book";

interface BooksState {
	readonly books: Map<string, Book>;
	readonly actions: {
		readonly loadBooks: () => Promise<void>;
		readonly findBookByTitleAndAuthor: (
			title: string,
			author: string
		) => Book | undefined;
		readonly createBook: (title: string, author: string) => Promise<Book>;
		readonly updateBook: (
			id: string,
			updates: Partial<Omit<Book, "id" | "createdAt" | "updatedAt">>
		) => Promise<Book>;
	};
}

// Internal store - not exported
const useBooksStore = create<BooksState>((set, get) => ({
	books: new Map(),
	actions: {
		loadBooks: async () => {
			try {
				const booksArray = await storageAdapter.books.get();
				const books = new Map<string, Book>();

				// Build the main map
				(booksArray || []).forEach((book) => {
					books.set(book.id, book);
				});

				set({ books });
			} catch (error) {
				console.error("Error loading books:", error);
				throw error;
			}
		},

		findBookByTitleAndAuthor: (title: string, author: string) => {
			const { books } = get();
			const normalizeTitle = title.trim().toLowerCase();
			const normalizeAuthor = author.trim().toLowerCase();

			return Array.from(books.values()).find(
				(book) =>
					book.title.toLowerCase() === normalizeTitle &&
					book.author.toLowerCase() === normalizeAuthor
			);
		},

		createBook: async (title: string, author: string): Promise<Book> => {
			const { books } = get();

			const now = new Date().toISOString();
			const newBook = {
				id: nanoid(),
				title: title.trim(),
				author: author.trim(),
				createdAt: now,
				updatedAt: now,
			} as Book;

			// Update books map
			const updatedBooks = new Map(books);
			updatedBooks.set(newBook.id, newBook);

			try {
				// Convert Map to array for storage
				const booksArray = Array.from(updatedBooks.values());
				await storageAdapter.books.set(booksArray);
				set({ books: updatedBooks });
				return newBook;
			} catch (error) {
				console.error("Error creating book:", error);
				throw error;
			}
		},

		updateBook: async (
			id: string,
			updates: Partial<Omit<Book, "id" | "createdAt" | "updatedAt">>
		): Promise<Book> => {
			const { books } = get();
			const bookToUpdate = books.get(id); // O(1) lookup!

			if (!bookToUpdate) {
				throw new Error("Book not found");
			}

			const updatedBook = {
				...bookToUpdate,
				...updates,
				updatedAt: new Date().toISOString(),
			} as Book;

			// Update books map
			const updatedBooks = new Map(books);
			updatedBooks.set(id, updatedBook);

			try {
				// Convert Map to array for storage
				const booksArray = Array.from(updatedBooks.values());
				await storageAdapter.books.set(booksArray);
				set({ books: updatedBooks });
				return updatedBook;
			} catch (error) {
				console.error("Error updating book:", error);
				throw error;
			}
		},
	},
}));

// Auto-load data on store initialization
useBooksStore.getState().actions.loadBooks();

// Exported selectors for O(1) access patterns
export const useBooksMap = () => useBooksStore((state) => state.books);
export const useBookById = (id: string) => {
	const booksMap = useBooksStore((state) => state.books);
	return booksMap.get(id);
};

export const useBooksActions = () => useBooksStore((state) => state.actions);
