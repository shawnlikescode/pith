import AsyncStorage from "@react-native-async-storage/async-storage";
import { Book } from "../types";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

export const useBooks = () => {
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
