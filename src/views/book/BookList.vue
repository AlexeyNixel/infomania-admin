<script setup lang="ts">
import dayjs from 'dayjs';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import type { DepartmentType } from '@/types/models';
import { useBookStore } from '@/stores/book';

const bookStore = useBookStore();
const route = useRoute();
const router = useRouter();

const page = ref<number>(Number(route.query.page) || 1);
const book = ref<any>();

const handleNavigate = async () => {
  router.push({ name: 'book', query: { page: page.value } });
  fetchData();
};

const handleDelete = async (id: string, status: boolean) => {
  await bookStore.updateBook(id, { isDeleted: status });
};

const fetchData = async () => {
  book.value = await bookStore.getBooks({
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
  <div class="list">
    <div
      v-if="book"
      class="grid sticky grid-cols-5 gap-y-2 px-2 max-h-[94%] overflow-y-scroll"
    >
      <div class="text-center col-span-2">Название</div>
      <div class="text-center">Дата</div>
      <div class="text-center">Статус</div>
      <div class="text-center">Ссылка</div>
      <div
        class="grid grid-cols-5 col-span-5 dark:odd:bg-neutral-800 odd:bg-neutral-200 py-1 px-2 rounded-lg"
        v-for="item in book.data"
      >
        <router-link
          :to="{ name: 'bookUpdate', params: { slug: item.id } }"
          class="col-span-2 my-auto hover:underline"
        >
          {{ item.title }}
        </router-link>
        <div class="text-center m-auto">
          {{ dayjs(item.createdAt).format('DD.MM.YYYY ') }}
        </div>
        <div class="text-center m-auto">
          <el-checkbox
            @change="handleDelete(item.id, item.isDeleted)"
            v-model="item.isDeleted"
            label="Скрыта"
            size="large"
          />
        </div>
        <a
          class="text-center m-auto"
          :href="`http://dev.infomania.ru/document/${item.id}`"
        >
          <img
            style="width: 30px; color: white"
            src="/external-link.svg"
            alt=""
          />
        </a>
      </div>
    </div>
    <el-pagination
      v-if="book"
      v-model:current-page="page"
      :page-size="Number(book.meta.pageSize)"
      :total="book.meta.total"
      @current-change="handleNavigate"
      class="flex justify-center my-6"
      layout="prev, pager, next"
      background
    />
  </div>
</template>

<style scoped lang="scss">
.list {
  background-color: var(--el-bg-color-overlay);
  border-radius: 10px;
  height: 100%;

  &__header {
    display: flex;
    padding: 15px;
  }

  &__field {
    width: 16.66%;
    border-right: 1px solid white;
    text-align: center;

    &-long {
      width: 78%;
      text-align: center;
      border-right: 1px solid white;
    }
  }
}

.list-item {
  display: flex;
  padding: 1vh 15px;
  margin: 1vh 0;

  &__field {
    width: 16.66%;
    text-align: center;

    &-long {
      width: 78%;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}

:deep(.el-scrollbar) {
  height: calc(90% - 5px);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-button) {
  border-radius: 10px;
}
</style>
