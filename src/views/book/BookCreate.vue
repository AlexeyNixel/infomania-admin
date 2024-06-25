<script setup lang="ts">
import { reactive, ref } from 'vue';
import TheUpload from '@/components/ui/TheUpload.vue';
import { useBookStore } from '@/stores/book';
import { useRouter } from 'vue-router';

const bookStore = useBookStore();
const router = useRouter();

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

const preview = ref<string>();

const createBook = async () => {
  console.log(book);
  await bookStore.createBook(book);
  router.push('/book');
};
</script>

<template>
  <div class="wrapper">
    <div class="book-create">
      <the-upload v-model="book.fileId" class="h-[400px]" />
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
        <el-date-picker
          v-model="book.dateOfReceipt"
          class="fields__item"
          placeholder="Дата поступления"
        />
        <el-select
          v-model="book.storagePlace"
          class="fields__item"
          placeholder="Место хранения"
        >
          <el-option v-for="item in places" :value="item" />
        </el-select>
        <el-button @click="createBook">Создать</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  @apply flex items-center justify-center h-full w-full;
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
