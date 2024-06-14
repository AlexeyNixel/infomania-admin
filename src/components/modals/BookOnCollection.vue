<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { findBookByCollection } from '@/api/collections';

interface Props {
  modelValue: boolean;
  collectionId: string;
}

const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue']);

const books = ref<any>();
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

const handleChangeValue = (value: boolean) => {
  emits('update:modelValue', value);
};

const getBooks = async () => {
  books.value = await findBookByCollection(props.collectionId);
};

onMounted(async () => {
  await getBooks();
});

watch(props, async () => {
  await getBooks();
});

addEventListener('click', (e: any) => {
  if (e.target.classList[0] === 'substrate') {
    handleChangeValue(false);
  }
});

addEventListener('keydown', (e: any) => {
  if (e.key === 'Escape') {
    handleChangeValue(false);
  }
});
</script>

<template>
  <Transition>
    <div v-if="modelValue" class="substrate">
      <div class="modal">
        <div class="modal__header">
          <div class="title">Книги в коллекции</div>
          <el-button class="close" link @click="handleChangeValue(false)"
            >x</el-button
          >
        </div>
        <div class="books" v-if="books.length > 0">
          <div class="book" v-for="item in books" :key="item.id">
            <img
              class="book__img"
              :src="staticUrl + item.preview.path"
              alt=""
            />
            <div>{{ item.title }}</div>
          </div>
        </div>
        <div class="empty" v-else>В коллекции нет книг</div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.substrate {
  background: rgba(0, 0, 0, 0.7);
  @apply absolute flex justify-center items-center top-0 left-0 w-full h-full;
}

.modal {
  @apply w-3/4 h-3/4 bg-white dark:bg-neutral-900 rounded-[10px];

  &__header {
    @apply flex justify-between text-xl font-bold  p-4;

    .close {
      @apply text-xl;
    }
  }

  .books {
    @apply grid grid-cols-4 m-auto w-full overflow-y-scroll h-5/6;
    .book {
      @apply flex flex-col text-center items-center justify-center;
      &__img {
        @apply h-[300px];
      }
    }
  }
  .empty {
    @apply flex items-center justify-center h-5/6 text-xl font-bold;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
