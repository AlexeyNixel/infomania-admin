<script setup lang="ts">
import { useCollectionStore } from '@/stores/collection';
import { onBeforeMount, ref } from 'vue';
import type { CollectionsType } from '@/types/collections-model';
import dayjs from 'dayjs';
import BookOnCollection from '@/components/modals/BookOnCollection.vue';
import { ElMessage } from 'element-plus';
import { Link } from '@element-plus/icons-vue';

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
  <div class="entries" v-if="collections">
    <div class="header">
      <div class="title">Подборки книг</div>
      <el-button @click="$router.push('/collection/create/')" class="btn">
        Создать
      </el-button>
    </div>
    <el-scrollbar height="100%" class="body">
      <div
        class="collection"
        v-for="collection in collections"
        :key="collection.id"
      >
        <RouterLink
          :to="'/collection/update/' + collection.id"
          class="collection__item collection__item_long collection__item_link"
        >
          {{ collection.name }}
        </RouterLink>
        <div class="collection__item">
          <el-button @click="openModal(collection.id)">
            Показать книги ({{ collection.books.length }})
          </el-button>
        </div>
        <div class="collection__item">
          {{ dayjs(collection.createdAt).format('DD.MM.YYYY') }}
        </div>
        <div class="collection__item">
          <el-checkbox
            @change="deleteCollection(collection.id, collection.isDeleted)"
            v-model="collection.isDeleted"
            label="скрыта"
          />
        </div>
        <a
          :href="`http://dev.infomania.ru/collection/${collection.id}`"
          class="collection__item_external"
          target="_blank"
        >
          <el-icon>
            <Link />
          </el-icon>
        </a>
      </div>
    </el-scrollbar>
    <Teleport to="body">
      <BookOnCollection v-model="isOpen" :collection-id="currentCollection" />
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.entries {
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
    .collection {
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
