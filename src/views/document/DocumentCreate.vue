<script setup lang="ts">
import TheEditor from '@/components/ui/TheEditor.vue';
import TheSelect from '@/components/ui/TheSelect.vue';
import TheUploadDocument from '@/components/ui/TheUploadDocument.vue';
import { useDocumentStore } from '@/stores/document';
import { reactive } from 'vue';

const documentStore = useDocumentStore();

const document = reactive({
  title: '',
  content: '',
  menuItemId: '',
  isDeleted: false,
});

const handleCreate = async () => {
  await documentStore.createDocument(document);
};
</script>

<template>
  <div class="document-create">
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
      <el-button class="aside__item" @click="handleCreate" type="warning">
        Создать
      </el-button>
    </div>
    <div class="main">
      <the-editor v-model="document.content" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.document-create {
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
