<script setup lang="ts">
import dayjs from 'dayjs';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useBookStore } from '@/stores/book';
import { ElMessage } from 'element-plus';

const bookStore = useBookStore();
const route = useRoute();
const router = useRouter();

const page = ref<number>(Number(route.query.page) || 1);
const books = ref<any>();

const handleNavigate = () => {
  router.push({ name: 'book', query: { page: page.value } });
  fetchData();
};

const handleDelete = async (id: string, status: boolean) => {
  await bookStore.updateBook(id, { isDeleted: status });
  return ElMessage({
    message: status ? 'Книга удалена' : 'Книга восстановалена',
    type: status ? 'error' : 'success',
  });
};

const fetchData = async () => {
  books.value = await bookStore.getBooks({
    page: page.value,
    pageSize: 30,
    isDeleted: true,
  });
};

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <div class="entries" v-if="books">
    <div class="header">
      <div class="title">Книги</div>
      <el-button @click="router.push('/book/create/')" class="btn">
        Создать
      </el-button>
    </div>
    <el-scrollbar height="100%" class="body">
      <div class="book" v-for="book in books.data" :key="book.id">
        <RouterLink
          :to="'/book/update/' + book.id"
          class="book__item book__item_long book__item_link"
        >
          {{ book.title }}
        </RouterLink>
        <div class="book__item">
          {{ dayjs(book.createdAt).format('DD.MM.YYYY') }}
        </div>
        <div v-if="book.storagePlace" class="book__item">
          {{ book.storagePlace }}
        </div>
        <div v-else class="book__item">Место хранения не указано</div>
        <div class="book__item">
          <el-checkbox
            @change="handleDelete(book.id, book.isDeleted)"
            v-model="book.isDeleted"
            label="скрыта"
          />
        </div>
      </div>
    </el-scrollbar>
    <el-pagination
      v-if="books.meta"
      v-model:current-page="page"
      :page-size="+books.meta.pageSize"
      :total="+books.meta.total"
      @current-change="handleNavigate"
      class="flex justify-center my-6"
      layout="prev, pager, next"
      background
    />
  </div>
</template>

<style scoped lang="scss">
.entries {
  @apply h-full w-full bg-white dark:bg-neutral-900 rounded-xl p-4;

  .header {
    @apply flex items-center;

    .title {
      @apply text-2xl font-bold mr-3;
    }
    .btn {
      @apply rounded-xl;
    }
    :deep(.el-input__wrapper) {
      @apply rounded-xl ml-2;
    }
  }
  .body {
    @apply mt-2 h-[90%];
    .book {
      @apply flex items-center rounded-xl w-full p-2 odd:bg-neutral-200 dark:odd:bg-neutral-800;
      &__item {
        @apply w-1/6;
        &_long {
          @apply w-1/2;
        }
        &_link {
          @apply hover:underline;
        }
        &_external {
          @apply text-black dark:text-white text-3xl flex items-center hover:cursor-pointer hover:text-neutral-600 hover:dark:text-neutral-600;
        }
      }
    }
  }
}
</style>
