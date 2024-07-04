<script setup lang="ts">
import { useBookStore } from '@/stores/book';
import { onBeforeMount, ref } from 'vue';
import type { BookResponse } from '@/types/book-model';

interface Props {
  modelValue: string[];
}

const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue']);

const bookStore = useBookStore();

const bookInCollection = ref<string[]>([]);
const books = ref<BookResponse>();
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
const page = ref(1);

const isChecked = (bookId: string) => {
  return bookInCollection.value.includes(bookId);
};

const addBookToCollection = (book: string) => {
  if (!bookInCollection.value.includes(book)) {
    bookInCollection.value.push(book);
  } else {
    delete bookInCollection.value[bookInCollection.value.indexOf(book)];
  }

  emits('update:modelValue', bookInCollection.value);
};

const handleNavigate = async () => {
  books.value = await bookStore.getBooks({
    include: 'preview',
    pageSize: 10,
    page: page.value,
  });
};

onBeforeMount(async () => {
  if (props.modelValue) {
    bookInCollection.value = props.modelValue;
  }
  books.value = await bookStore.getBooks({
    include: 'preview',
    pageSize: 10,
  });
});
</script>

<template>
  <div class="books" v-if="books">
    <div
      class="book-card"
      v-for="book in books.data"
      :key="book.id"
      @click="addBookToCollection(book.id)"
    >
      <img
        class="book-card__img"
        v-if="book.preview"
        :src="staticUrl + book.preview.path"
        alt=""
      />
      <div class="book-card__title">{{ book.title }}</div>
      <img
        v-if="isChecked(book.id)"
        class="book-card__check"
        src="/check-mark.svg"
        alt=""
      />
    </div>
  </div>
  <div>
    <el-pagination
      v-if="books"
      v-model:current-page="page"
      :page-size="Number(books.meta.pageSize)"
      :total="books.meta.total"
      @current-change="handleNavigate"
      class="flex justify-center my-6"
      layout="prev, pager, next"
      background
    />
  </div>
</template>

<style scoped lang="scss">
.books {
  @apply grid grid-cols-5 gap-6 mx-2;

  .book-card {
    @apply flex flex-col relative justify-center items-center;
    &__img {
      @apply h-full;
    }
    &__check {
      @apply absolute left-0 top-0  h-[30px];
    }
  }
}
</style>
