<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue';
import BookListCollection from '@/components/ui/BookListCollection.vue';
import { findOne, update } from '@/api/collections';
import { useRoute } from 'vue-router';

interface Collection {
  name?: string;
  description?: string;
  isDeleted?: boolean;
  fileId?: string;
  books: [{ bookId: string }];
}

const route = useRoute();
const id = ref(route.params.id as string);
const collection = reactive<any>({
  name: '',
  description: '',
  isDeleted: false,
  fileId: '',
  books: [],
});

const handleUpdateCollection = async () => {
  await update(id.value, collection);
};

onBeforeMount(async () => {
  const data = await findOne(id.value);
  data.books.forEach((item: any) => {
    collection.books.push(item.bookId);
  });
  delete data.books;

  Object.keys(collection).forEach((key: any) => {
    collection[key] = data[key];
  });
});
</script>

<template>
  <div class="collection">
    <div class="header collection__header">
      <div class="header__item title">
        <el-input
          v-model="collection.name"
          placeholder="Название подборки"
          size="large"
        />
      </div>
      <div class="header__item description">
        <el-input
          v-model="collection.description"
          placeholder="Описание подборки"
          size="large"
        />
      </div>
    </div>
    <div class="collection__body">
      <BookListCollection v-model="collection.books" />
    </div>
    <div class="collection__footer">
      <el-button @click="handleUpdateCollection">Создать</el-button>
      <el-checkbox v-model="collection.isDeleted"> Удалить </el-checkbox>
    </div>
  </div>
</template>

<style scoped lang="scss">
.collection {
  @apply p-2;
  .header {
    &__item {
      @apply mb-2;
    }
    .title {
      @apply text-xl font-bold ring-0 focus:ring-0;
    }

    :deep(.el-input__wrapper) {
      border: 0;
      box-shadow: none;
      font-size: 24px;
      background: transparent;
      color: black;
    }
  }
}
</style>
