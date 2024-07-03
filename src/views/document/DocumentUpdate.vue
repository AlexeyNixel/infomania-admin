<script setup lang="ts">
import TheEditor from '@/components/ui/TheEditor.vue';
import TheSelect from '@/components/ui/TheSelect.vue';
import { useDocumentStore } from '@/stores/document';
import { onBeforeMount, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import TheUploadDocument from '@/components/ui/TheUploadDocument.vue';

const documentStore = useDocumentStore();
const route = useRoute();
const router = useRouter();

const document = reactive<any>({
  title: '',
  content: '',
  menuItemId: '',
});

const handleUpdate = async () => {
  await documentStore.updateDocument(route.params.slug as string, document);
  ElMessage({
    message: 'Документ обновлен',
    type: 'success',
  });
  await router.push({ name: 'documents' });
};

onBeforeMount(async () => {
  const { data } = await documentStore.getDocument(route.params.slug as string);

  Object.keys(document).forEach((key) => {
    document[key] = data[key];
  });
});
</script>

<template>
  <div class="document-update">
    <div class="aside">
      <el-input
        v-model="document.title"
        class="aside__item"
        placeholder="Заголовок"
      />
      <the-select
        v-model="document.menuItemId"
        entry-order="menu-item"
        placeholder="Меню"
      />
      <the-upload-document class="aside__item" />
      <el-button class="aside__item" @click="handleUpdate" type="warning">
        Создать
      </el-button>
    </div>
    <div class="main">
      <the-editor v-model="document.content" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.document-update {
  @apply flex h-full bg-white dark:bg-neutral-900 p-2 rounded-xl;
  .aside {
    @apply w-2/12 mr-2;
    &__item {
      @apply mb-2 w-full rounded-xl;
    }
  }

  .main {
    @apply w-10/12;
  }
}

:deep(.el-select__wrapper) {
  @apply rounded-xl w-full mb-2;
}

:deep(.el-input__wrapper) {
  @apply rounded-xl w-full;
}

:deep(.el-button) {
  @apply rounded-xl;
}
</style>
