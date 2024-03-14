<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useSliderStore } from '@/stores/slider';
import { onMounted, reactive, ref } from 'vue';
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
  <div class="slide">
    <div class="upload">
      <the-upload-slide
        class="slider-update__upload"
        :current-image="preview"
        v-model="slide.fileId"
      />
    </div>
    <div class="title">
      <div class="slider-update__item">
        <span>Название</span>
        <el-input v-model="slide.title" />
      </div>
    </div>
    <div class="link">
      <div class="slider-update__item">
        <span>Ссылка</span>
        <el-input v-model="slide.url" />
      </div>
    </div>
    <div class="entry">
      <div class="slider-update__item">
        <div>Новость</div>
        <the-select entry-order="entry" v-model="slide.entryId" />
      </div>
    </div>
    <div class="my-auto delete">
      <div class="slider-update__item">
        <el-checkbox v-model="slide.isDeleted" label="Удален" border />
      </div>
    </div>
    <div class="btn">
      <div class="button slider-update__btn">
        <el-button @click="handleCreateSlide">Создать</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slide {
  margin: 0;
  background-color: var(--el-bg-color-overlay);
  border-radius: 10px;
  height: calc(100%);
  width: 100%;
  padding: 10px 10px;

  display: grid;
  gap: 10px 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.5fr 0.1fr 0.1fr;
  grid-auto-flow: row;
  grid-template-areas:
    'upload upload upload upload'
    'title link entry delete'
    'btn . . .';
}

.upload {
  grid-area: upload;
}

.title {
  grid-area: title;
}

.link {
  grid-area: link;
}

.entry {
  grid-area: entry;
}

.delete {
  grid-area: delete;
}

.btn {
  grid-area: btn;
}
</style>
