import { nanoid } from "nanoid";
import { storageAdapter } from "~/lib/storage";
import type { Book } from "../types";
import "react-native-get-random-values";

export function useBooks() {
	async function getBooks(): Promise<Book[]> {
		try {
			const books = await storageAdapter.books.get();
			return books ?? [];
		} catch (error) {
			console.error("Error getting books:", error);
			return [];
		}
	}

	async function findOrCreateBook(
		title: string,
		author: string
	): Promise<Book> {
		try {
			const books = await getBooks();

			const existingBook = books.find(
				(book) =>
					book.title.toLowerCase() === title.toLowerCase() &&
					book.author.toLowerCase() === author.toLowerCase()
			);

			if (existingBook) {
				return existingBook;
			}

			const newBook: Book = {
				id: nanoid(),
				title,
				author,
				createdAt: new Date().toISOString(),
			};

			const updatedBooks = [...books, newBook];
			await storageAdapter.books.set(updatedBooks);

			return newBook;
		} catch (error) {
			console.error("Error finding/creating book:", error);
			throw error;
		}
	}

	return {
		getBooks,
		findOrCreateBook,
	};
}
