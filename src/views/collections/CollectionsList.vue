<script setup lang="ts">
import { useCollectionStore } from '@/stores/collection';
import { onBeforeMount, ref } from 'vue';
import type { CollectionsType } from '@/types/collections-model';
import dayjs from 'dayjs';
import BookOnCollection from '@/components/modals/BookOnCollection.vue';
import { ElMessage } from 'element-plus';

const asd = dayjs();
const collectionStore = useCollectionStore();
const collections = ref<CollectionsType[]>();

const isOpen = ref(false);
const currentCollection = ref('');

const openModal = (id: string) => {
  isOpen.value = !isOpen.value;
  currentCollection.value = id;
};

const deleteCollection = async (id: string, status: boolean) => {
  await collectionStore.put(id, { isDeleted: status });
  return ElMessage({
    message: status ? 'Запись удалена' : 'Запись восстановлена',
    type: status ? 'error' : 'success',
  });
};

onBeforeMount(async () => {
  collections.value = await collectionStore.getAll({
    include: 'books',
    isDeleted: true,
    orderBy: '-createdAt',
  });
});
</script>

<template>
  <div class="collections-table">
    <div class="header">
      <div class="header__item_long header__item">Название</div>
      <div class="header__item">Книги</div>
      <div class="header__item">Дата создание</div>
      <div class="header__item">Статус</div>
    </div>
    <div class="body">
      <div class="collection" v-for="item in collections" :key="item.id">
        <router-link
          :to="{ name: 'collectionUpdate', params: { id: item.id } }"
          class="collection__item collection__item_long collection__item_link"
        >
          {{ item.name }}
        </router-link>
        <el-button class="collection__item" @click="openModal(item.id)">
          Показать книги ({{ item.books.length }})
        </el-button>
        <div class="collection__item">
          {{ dayjs(item.createdAt).format('DD.MM.YYYY') }}
        </div>
        <div class="collection__item">
          <el-checkbox
            @change="deleteCollection(item.id, item.isDeleted)"
            v-model="item.isDeleted"
          />
        </div>
      </div>
    </div>
    <Teleport to="body">
      <BookOnCollection v-model="isOpen" :collection-id="currentCollection" />
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.collections-table {
  @apply w-full bg-white dark:bg-neutral-900 h-full rounded-[10px] p-2;
  .header {
    @apply flex justify-between;

    &__item {
      @apply text-center w-[16.66%];

      &_long {
        @apply w-[50%];
      }
    }
  }

  .body {
    .collection {
      @apply flex justify-between items-center odd:bg-neutral-200 dark:odd:bg-neutral-800 p-2 rounded-[10px];
      &__item {
        @apply w-[16.66%] text-center;
        &_long {
          @apply w-1/2 text-left;
        }

        &_link {
          @apply hover:underline;
        }
      }
    }
  }
}
</style>
