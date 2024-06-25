<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import TheUpload from '@/components/ui/TheUpload.vue';
import { useBookStore } from '@/stores/book';
import { useRouter, useRoute } from 'vue-router';

const bookStore = useBookStore();
const router = useRouter();
const route = useRoute();

const preview = ref<string>();

const places = [
  'Отдел отраслевой литературы',
  'Отдел литературных программ (детский сектор)',
  'Отдел литературных программ (цоколь)',
  'Центр организации образовательных программ',
];

const book = reactive({
  title: '',
  desc: '',
  content: '',
  fileId: '',
  storagePlace: '',
  category: '',
  dateOfReceipt: '',
  isDeleted: false,
  link: '',
});

const handleUpdate = async () => {
  await bookStore.updateBook(route.params.slug as string, book);
  router.push('/book');
};

onMounted(async () => {
  const { data } = await bookStore.getBook(route.params.slug as string);
  preview.value = data.preview.path;
  Object.keys(book).forEach((key) => {
    book[key] = data[key];
  });
});
</script>

<template>
  <div class="wrapper">
    <h2 class="header">Создание книги</h2>
    <div class="book-create">
      <the-upload
        :current-image="preview"
        v-model="book.fileId"
        class="h-[400px]"
      />
      <div class="fields">
        <el-input
          v-model="book.title"
          class="fields__item"
          placeholder="Название"
        />
        <el-input
          v-model="book.desc"
          class="fields__item"
          rows="3"
          type="textarea"
          placeholder="Краткое описание"
        />
        <el-input
          v-model="book.content"
          class="fields__item"
          rows="3"
          type="textarea"
          placeholder="Полное описание"
        />
        <el-input
          v-model="book.link"
          class="fields__item"
          placeholder="Ссылка на литрес"
        />
        <el-input
          v-model="book.category"
          class="fields__item"
          placeholder="Категории"
        />
        <div class="w-full">
          <el-date-picker
            v-model="book.dateOfReceipt"
            class="fields__item w-full"
            placeholder="Дата поступления"
          />
        </div>
        <el-select
          v-model="book.storagePlace"
          class="fields__item"
          placeholder="Место хранения"
        >
          <el-option v-for="item in places" :value="item" />
        </el-select>
        <div class="footer flex items-center">
          <el-button @click="handleUpdate">Создать</el-button>
          <el-checkbox
            class="ml-2"
            v-model="book.isDeleted"
            label="удален"
            border
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  @apply flex flex-col items-center justify-center h-full w-full;

  .header {
    @apply text-2xl font-bold my-2;
  }
}
.book-create {
  @apply flex w-2/5;
  .fields {
    &__item {
      @apply mb-4;
    }
  }
}

:deep(.el-textarea__inner) {
  border-radius: 10px;
}

:deep(.el-input__wrapper) {
  border-radius: 10px;
  width: 100%;
}

:deep(.el-select__wrapper) {
  border-radius: 10px;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
  width: 100%;
  margin-bottom: 10px;
}
</style>
