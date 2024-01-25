<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import TheUpload from '@/components/ui/TheUpload.vue';
import { useBookStore } from '@/stores/book';
import { useRouter, useRoute } from 'vue-router';

const bookStore = useBookStore();
const router = useRouter();
const route = useRoute();

const preview = ref<string>();

const book = reactive<any>({
  title: '',
  desc: '',
  content: '',
  fileId: '',
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
  <div class="container">
    <div class="department-update">
      <div class="department-update__preview">
        <the-upload v-model="book.fileId" :current-image="preview" />
      </div>
      <div class="department-update__text">
        <div class="department-update__item">
          <span>Название</span>
          <el-input v-model="book.title" />
        </div>
        <div class="department-update__item">
          <span>Короткое описание</span>
          <el-input type="textarea" v-model="book.desc" />
        </div>
        <div class="department-update__item">
          <span>Полное описание</span>
          <el-input type="textarea" v-model="book.content" />
        </div>

        <div class="department-update__btn">
          <el-button @click="handleUpdate">Обновить</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.department-update {
  display: flex;

  &__item {
    margin: 20px 0;
  }
}
</style>
