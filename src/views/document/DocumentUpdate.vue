<script setup lang="ts">
import TheEditor from '@/components/ui/TheEditor.vue';
import TheSelect from '@/components/ui/TheSelect.vue';
import { useDocumentStore } from '@/stores/document';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import TheUploadDocument from '@/components/ui/TheUploadDocument.vue';
const documentStore = useDocumentStore();
const content = ref<any>();
const route = useRoute();
const router = useRouter();
const menus = ref<any>();

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

onMounted(async () => {
  const { data } = await documentStore.getDocument(route.params.slug as string);
  content.value = data;
  Object.keys(document).forEach((key) => {
    document[key] = content.value[key];
  });
});
</script>

<template>
  <div class="document-update" v-if="content">
    <div class="document-update__item">
      <p>Название</p>
      <el-input v-model="document.title" />
    </div>
    <div class="document-update__item">
      <the-editor v-model="document.content" />
    </div>
    <div class="document-update__item">
      <the-select entry-order="menu-item" v-model="document.menuItemId" />
    </div>
    <div class="document-update__item">
      <div class="document">
        <the-upload-document />
      </div>
    </div>
    <div class="document-update__item">
      <el-button @click="handleUpdate">Обновить</el-button>
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
</style>
