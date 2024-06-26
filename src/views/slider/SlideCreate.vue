<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useSliderStore } from '@/stores/slider';
import { reactive, ref } from 'vue';
import TheUploadSlide from '@/components/ui/TheUploadSlide.vue';
import TheSelect from '@/components/ui/TheSelect.vue';

const preview = ref<string>();
const route = useRoute();
const router = useRouter();
const sliderStore = useSliderStore();
const slide = reactive<any>({
  title: '',
  url: '',
  desc: '0',
  fileId: '',
  entryId: '',
  isDeleted: false,
});

const handleCreateSlide = async () => {
  Object.keys(slide).forEach((item: string) => {
    if (!slide[item]) {
      delete slide[item];
    }
  });

  await router.push({ name: 'slides' });
  await sliderStore.createSlide(slide);
};
</script>

<template>
  <div class="slide-create">
    <div class="aside">
      <el-input
        class="aside__item"
        placeholder="Название"
        v-model="slide.title"
      />
      <el-input class="aside__item" placeholder="Ссылка" v-model="slide.link" />
      <the-select
        class="aside__item"
        entry-order="entry"
        v-model="slide.entryId"
      />
      <el-checkbox label="Удален" border v-model="slide.isDeleted" />
      <el-button class="aside__item" @click="handleCreateSlide" type="warning">
        Создать
      </el-button>
    </div>
    <div class="body"><the-upload-slide v-model="slide.fileId" /></div>
  </div>
</template>

<style scoped lang="scss">
.slide-create {
  @apply flex bg-white dark:bg-neutral-900 h-full p-2 rounded-xl;
  .aside {
    @apply flex flex-col w-2/12 mr-2;
    &__item {
      @apply mb-2;
    }
  }

  .body {
    @apply w-10/12;
  }
}

:deep(.el-select__wrapper) {
  width: 100% !important;
  margin-bottom: 0.5rem;
}

:deep(.el-button) {
  @apply mt-4;
}
</style>
