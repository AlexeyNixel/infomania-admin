<script setup lang="ts">
import { Link } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { useDocumentStore } from '@/stores/document';
import { onBeforeMount, ref } from 'vue';
import { ElMessage } from 'element-plus';

const documentStore = useDocumentStore();
const documents = ref<any>();

const route = useRoute();
const router = useRouter();
const page = ref<number>(Number(route.query.page) || 1);

const handleDelete = async (id: string, status: boolean) => {
  await documentStore.updateDocument(id, { isDeleted: status });
  return ElMessage({
    message: status ? 'Документ удален' : 'Документ восстановален',
    type: status ? 'error' : 'success',
  });
};

const handleNavigate = () => {
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
};

onBeforeMount(async () => {
  await fetchData();
});
</script>

<template>
  <div class="documents" v-if="documents">
    <div class="header">
      <div class="title">Документы</div>
      <el-button @click="router.push('/document/create/')" class="btn">
        Создать
      </el-button>
    </div>
    <el-scrollbar height="100%" class="body">
      <div
        class="document"
        v-for="document in documents.data"
        :key="document.id"
      >
        <RouterLink
          :to="'/document/update/' + document.id"
          class="document__item document__item_long document__item_link"
        >
          {{ document.title }}
        </RouterLink>
        <div class="document__item">
          <el-checkbox
            @change="handleDelete(document.id, document.isDeleted)"
            v-model="document.isDeleted"
            label="скрыта"
          />
        </div>
        <a
          :href="`http://dev.infomania.ru/document/${document.menuItemId}`"
          class="document__item_external"
          target="_blank"
        >
          <el-icon>
            <Link />
          </el-icon>
        </a>
      </div>
    </el-scrollbar>
    <el-pagination
      v-if="documents.meta"
      v-model:current-page="page"
      :page-size="documents.meta.pageSize"
      :total="documents.meta.total"
      @current-change="handleNavigate"
      class="flex justify-center my-6"
      layout="prev, pager, next"
      background
    />
  </div>
</template>

<style scoped lang="scss">
.documents {
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
    .document {
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
