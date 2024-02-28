<script setup lang="ts">
import { useEntryStore } from '@/stores/entry';
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import { useRoute, useRouter } from 'vue-router';
import type { EntryResponseType } from '@/types/entry-model';
import { Link } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const entryStore = useEntryStore();
const entries = ref<EntryResponseType>();
const page = ref<number>(Number(route.query.page) || 1);

const handleDelete = async (id: string, status: boolean) => {
  await entryStore.updateEntry(id, { isDeleted: status });
};

const fetchData = async () => {
  entries.value = await entryStore.getEntries({
    include: 'rubrics',
    pageSize: 30,
    isDeleted: 'true',
    page: page.value,
    orderBy: '-publishedAt',
  });
};

const handleNavigate = async () => {
  router.push({ path: '/entries', query: { page: page.value } });
  fetchData();
};

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <div class="list">
    <div
      class="grid sticky grid-cols-5 gap-y-2 px-2 max-h-[94%] overflow-y-scroll"
    >
      <div class="text-center col-span-2">Название</div>
      <div class="text-center">Дата</div>
      <div class="text-center">Статус</div>
      <div class="text-center">Ссылка</div>
      <div
        v-if="entries"
        class="grid grid-cols-5 col-span-5 dark:odd:bg-neutral-800 odd:bg-neutral-200 py-1 px-2 rounded-lg"
        v-for="entry in entries.data"
      >
        <router-link
          :to="{ name: 'entryUpdate', params: { slug: entry.id } }"
          class="col-span-2 my-auto hover:underline"
        >
          {{ entry.title }}
        </router-link>
        <div class="text-center m-auto">
          {{ dayjs(entry.publishedAt).format('DD.MM.YYYY ') }}
        </div>
        <div class="text-center m-auto">
          <el-checkbox
            @change="handleDelete(entry.id, entry.isDeleted)"
            v-model="entry.isDeleted"
            label="Скрыта"
            size="large"
          />
        </div>
        <a
          class="flex justify-center items-center text-center text-3xl text-neutral-700 dark:text-white"
          :href="`http://dev.infomania.ru/entry/${entry.slug}`"
          target="_blank"
        >
          <el-icon><Link /></el-icon>
        </a>
      </div>
    </div>
    <el-pagination
      v-if="entries"
      v-model:current-page="page"
      :v-model:page-size="entries.meta.pageSize"
      :total="entries.meta.total"
      @current-change="handleNavigate"
      class="flex justify-center my-6"
      layout="prev, pager, next"
      background
    />
  </div>
</template>

<style scoped lang="scss">
.header {
  background-color: var(--el-bg-color-overlay);
  border-radius: 10px;
  height: 8%;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

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
      width: 50%;
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
      width: 50%;

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
