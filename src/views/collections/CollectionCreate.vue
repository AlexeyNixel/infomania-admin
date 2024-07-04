<script setup lang="ts">
import { ref } from 'vue';
import BookListCollection from '@/components/ui/BookListCollection.vue';
import { create } from '@/api/collections';
import { useRouter } from 'vue-router';
import TheUpload from '@/components/ui/TheUpload.vue';
import { ElMessage } from 'element-plus';

interface Collection {
  name: string;
  description: string;
  isDeleted: boolean;
  fileId: string;
  books: string[];
}

const router = useRouter();
const newCollection = ref<any>({ books: [] });

const handleCreateCollection = async () => {
  await create(newCollection.value);
  await router.push('/collections');
  return ElMessage({
    message: 'Подборка обнавлена',
    type: 'success',
  });
};
</script>

<template>
  <div class="collections">
    <div class="aside">
      <the-upload
        class="aside__item aside__item_preview"
        v-model="newCollection.fileId"
      />
      <el-input
        placeholder="Название"
        class="aside__item"
        v-model="newCollection.name"
      />
      <el-input
        placeholder="Описание"
        class="aside__item"
        v-model="newCollection.description"
      />
      <el-checkbox
        border
        label="Скрыт"
        class="aside__item"
        v-model="newCollection.isDeleted"
      />
      <el-button
        class="aside__item"
        type="warning"
        @click="handleCreateCollection"
      >
        Сохранить
      </el-button>
    </div>
    <div class="main">
      <BookListCollection v-model="newCollection.books" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.collections {
  @apply flex bg-white dark:bg-neutral-900 h-full rounded-xl p-2;

  .aside {
    @apply w-2/12;
    &__item {
      @apply mb-2 w-full rounded-xl;
      &_preview {
        @apply h-[200px];
      }
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
