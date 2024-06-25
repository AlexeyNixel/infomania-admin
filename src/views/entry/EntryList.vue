<script setup lang="ts">
import dayjs from 'dayjs';
import { onBeforeMount, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useEntryStore } from '@/stores/entry';
import { Link } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import type { EntryResponseType } from '@/types/entry-model';

const route = useRoute();
const router = useRouter();
const entryStore = useEntryStore();
const entries = ref<EntryResponseType>();
const page = ref<number>(Number(route.query.page) || 1);
const search = ref<string>('');

const handleDelete = async (id: string, status: boolean) => {
  await entryStore.updateEntry(id, { isDeleted: status });
  return ElMessage({
    message: status ? 'Новость удалена' : 'Новость восстановалена',
    type: status ? 'error' : 'success',
  });
};

const fetchData = async () => {
  entries.value = await entryStore.getEntries({
    search: search.value || undefined,
    include: 'rubrics',
    pageSize: 30,
    isDeleted: 'true',
    page: page.value,
    orderBy: '-createdAt',
  });
};

const handleNavigate = () => {
  fetchData();
  router.push({ path: '/entries', query: { page: page.value } });
};

onBeforeMount(async () => {
  await fetchData();
});
</script>

<template>
  <div class="entries" v-if="entries">
    <div class="header">
      <div class="title">Новости</div>
      <el-button @click="router.push('/entry/create/')" class="btn">
        Создать
      </el-button>
      <el-input
        placeholder="Поиск..."
        @keydown.enter="fetchData"
        v-model="search"
        class="search"
      />
    </div>
    <el-scrollbar height="100%" class="body">
      <div class="entry" v-for="entry in entries.data" :key="entry.id">
        <RouterLink
          :to="'/entry/update/' + entry.slug"
          class="entry__item entry__item_long entry__item_link"
        >
          {{ entry.title }}
        </RouterLink>
        <div class="entry__item">
          {{ dayjs(entry.createdAt).format('DD.MM.YYYY') }}
        </div>
        <div class="entry__item">
          <el-checkbox
            @change="handleDelete(entry.id, entry.isDeleted)"
            v-model="entry.isDeleted"
            label="скрыта"
          />
        </div>
        <a
          :href="`http://dev.infomania.ru/entry/${entry.slug}`"
          class="entry__item_external"
          target="_blank"
        >
          <el-icon>
            <Link />
          </el-icon>
        </a>
      </div>
    </el-scrollbar>
    <el-pagination
      v-if="entries.meta"
      v-model:current-page="page"
      :page-size="+entries.meta.pageSize"
      :total="+entries.meta.total"
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
    .entry {
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
