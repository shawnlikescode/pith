import AsyncStorage from "@react-native-async-storage/async-storage";
import { Book } from "../types";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

export const useBooks = () => {
	const generateId = () => {
		return nanoid();
	};

	const getBooks = async (): Promise<Book[]> => {
		try {
			const booksJson = await AsyncStorage.getItem("books");
			return booksJson ? JSON.parse(booksJson) : [];
		} catch (error) {
			console.error("Error getting books:", error);
			return [];
		}
	};

	const findOrCreateBook = async (
		title: string,
		author: string
	): Promise<Book> => {
		try {
			const books = await getBooks();

			// Look for existing book with same title and author
			const existingBook = books.find(
				(book) =>
					book.title.toLowerCase() === title.toLowerCase() &&
					book.author.toLowerCase() === author.toLowerCase()
			);

			if (existingBook) {
				return existingBook;
			}

			// Create new book
			const newBook: Book = {
				id: generateId(),
				title,
				author,
				createdAt: new Date().toISOString(),
			};

			// Save updated books list
			const updatedBooks = [...books, newBook];
			await AsyncStorage.setItem("books", JSON.stringify(updatedBooks));

			return newBook;
		} catch (error) {
			console.error("Error finding/creating book:", error);
			throw error;
		}
	};

	return {
		getBooks,
		findOrCreateBook,
	};
};
