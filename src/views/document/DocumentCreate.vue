<script setup lang="ts">
import TheEditor from '@/components/ui/TheEditor.vue';
import TheSelect from '@/components/ui/TheSelect.vue';
import TheUploadDocument from '@/components/ui/TheUploadDocument.vue';
import { useDocumentStore } from '@/stores/document';
import { reactive, ref } from 'vue';

const documentStore = useDocumentStore();
const content = ref<any>();
const menus = ref<any>();

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
  <div class="document-update">
    <div class="document-update__item">
      <p>Название</p>
      <el-input v-model="document.title" />
    </div>
    <div class="document-update__item">
      <the-editor v-model="document.content" />
    </div>
    <div class="flex">
      <div class="document-update__item">
        <div>Меню</div>
        <the-select entry-order="menu-item" v-model="document.menuItemId" />
      </div>
      <div class="document-update__item">
        <div class="document">
          <the-upload-document />
        </div>
      </div>
    </div>
    <div class="document-update__item">
      <el-button @click="handleCreate">Создать</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.document-update {
  background-color: var(--el-bg-color-overlay);
  height: 100%;
  border-radius: 10px;

  &__item {
    padding: 20px;
  }
}

:deep(.el-button) {
  border-radius: 10px;
}
</style>
