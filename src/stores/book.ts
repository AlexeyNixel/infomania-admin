import { postBook, findBooks, findBook, putBook } from './../api/book';
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useBookStore = defineStore('book', () => {
  const book = ref();

  const getBooks = async () => {
    const {data} = await findBooks();
    return data
  };

  const getBook = async (id: string) => {
    return await findBook(id);
  };

  const createBook = async (book: any) => {
    return await postBook(book);
  };

  const updateBook = async (id: string, book: any) => {
    return await putBook(id, book);
  };

  return {
    getBooks,
    getBook,
    createBook,
    updateBook,
  };
});
