<script setup lang="ts">
import { ref } from 'vue';
import BookListCollection from '@/components/ui/BookListCollection.vue';
import { create } from '@/api/collections';
import { useRouter } from 'vue-router';

interface Collection {
  name?: string;
  description?: string;
  isDeleted?: boolean;
  fileId?: string;
  books: string[];
}

const router = useRouter();
const newCollection = ref<Collection>({ books: [] });

const handleCreateCollection = async () => {
  await create(newCollection.value);
  await router.push('/collection');
};
</script>

<template>
  <div class="collection">
    <div class="header collection__header">
      <div class="header__item title">
        <el-input
          v-model="newCollection.name"
          placeholder="Название подборки"
          size="large"
        />
      </div>
      <div class="header__item description">
        <el-input
          v-model="newCollection.description"
          placeholder="Описание подборки"
          size="large"
        />
      </div>
    </div>
    <div class="collection__body">
      <BookListCollection v-model="newCollection.books" />
    </div>
    <div class="collection__footer">
      <el-button @click="handleCreateCollection">Создать</el-button>
      <el-checkbox v-model="newCollection.isDeleted"> Удалить </el-checkbox>
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
