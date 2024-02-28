<script setup lang="ts">
import { Link } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import { useRoute, useRouter } from 'vue-router';
import { useDocumentStore } from '@/stores/document';
import { onMounted, ref } from 'vue';

const documentStore = useDocumentStore();
const documents = ref<any>();

const route = useRoute();
const router = useRouter();
const page = ref<number>(Number(route.query.page) || 1);

const handleDelete = async (id: string, status: boolean) => {
  await documentStore.updateDocument(id, { isDeleted: status });
};

const handleNavigate = async () => {
  router.push({ name: 'documents', query: { page: page.value } });
  fetchData();
};

const fetchData = async () => {
  documents.value = await documentStore.getDocuments({
    pageSize: 30,
    isDeleted: true,
    page: page.value,
    orderBy: '-createdAt',
    include: 'menuItem',
  });
  console.log(documents.value);
};

onMounted(() => {
  fetchData();
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
        v-if="documents"
        class="grid grid-cols-5 col-span-5 dark:odd:bg-neutral-800 odd:bg-neutral-200 py-1 px-2 rounded-lg"
        v-for="item in documents.data"
      >
        <router-link
          :to="{ name: 'documentUpdate', params: { slug: item.id } }"
          class="col-span-2 my-auto hover:underline"
        >
          {{ item.title }}
        </router-link>
        <div class="text-center m-auto">
          {{ dayjs(item.publishedAt).format('DD.MM.YYYY ') }}
        </div>
        <div class="text-center m-auto">
          <el-checkbox
            @change="handleDelete(item.id, item.isDeleted)"
            v-model="item.isDeleted"
            label="Скрыта"
            size="large"
          />
        </div>
        <div v-if="item.menuItem">
          <a
            class="flex justify-center items-center my-[5px] text-center text-3xl text-neutral-700 dark:text-white"
            :href="
              item.menuItem?.link
                ? item.menuItem?.link
                : `http://dev.infomania.ru/document/${item.menuItem?.slug}`
            "
          >
            <el-icon class="m-auto"><Link /></el-icon>
          </a>
        </div>
      </div>
    </div>
    <el-pagination
      v-if="documents"
      v-model:current-page="page"
      v-model:page-size="documents.meta.pageSize"
      v-model:total="documents.meta.total"
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
