<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue';
import BookListCollection from '@/components/ui/BookListCollection.vue';
import { findOne, update } from '@/api/collections';
import { useRoute, useRouter } from 'vue-router';
import TheUpload from '@/components/ui/TheUpload.vue';
import { ElMessage } from 'element-plus';

interface Collection {
  name?: string;
  description?: string;
  isDeleted?: boolean;
  fileId?: string;
  books: [{ bookId: string }];
}

const route = useRoute();
const router = useRouter();

const id = ref(route.params.id as string);

const preview = ref<any>();

const collection = reactive<any>({
  name: '',
  description: '',
  isDeleted: false,
  fileId: '',
  books: [],
});

const handleUpdateCollection = async () => {
  await update(id.value, collection);
  await router.push('/collections');
  return ElMessage({
    message: 'Подборка обнавлена',
    type: 'success',
  });
};

onBeforeMount(async () => {
  const data = await findOne(id.value, {
    include: 'preview,books',
  });

  console.log(data);
  data.books.forEach((item: any) => {
    collection.books.push(item.bookId);
  });

  preview.value = data.preview.path;

  delete data.books;

  Object.keys(collection).forEach((key: any) => {
    collection[key] = data[key];
  });
});
</script>

<template>
  <div class="collections">
    <div class="aside">
      <the-upload
        class="aside__item aside__item_preview"
        v-model="collection.fileId"
        :current-image="preview"
      />
      <el-input
        placeholder="Название"
        class="aside__item"
        v-model="collection.name"
      />
      <el-input
        placeholder="Описание"
        class="aside__item"
        v-model="collection.description"
      />
      <el-checkbox
        border
        label="Скрыт"
        class="aside__item"
        v-model="collection.isDeleted"
      />
      <el-button
        class="aside__item"
        type="warning"
        @click="handleUpdateCollection"
      >
        Сохранить
      </el-button>
    </div>
    <div class="main">
      <BookListCollection v-model="collection.books" />
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
