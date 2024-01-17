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
  desc: '',
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
    <div class="desc">
      <div class="slider-update__item">
        <span>Описание</span>
        <el-input v-model="slide.desc" />
      </div>
    </div>
    <div class="entry">
      <div class="slider-update__item">
        <div>Новость</div>
        <the-select entry-order="entry" v-model="slide.entryId" />
      </div>
    </div>
    <div class="delete">
      <div class="slider-update__item" style="width: 10%">
        <div>Удален</div>
        <el-switch v-model="slide.isDeleted" />
      </div>
    </div>
    <div class="preview">
      <the-upload-slide
        class="slider-update__upload"
        :current-image="preview"
        v-model="slide.fileId"
      />
    </div>
    <div class="slider-update__btn">
      <el-button @click="handleCreateSlide">Создать</el-button>
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

  gap: 5px 5px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.1fr 1.9fr;
  grid-auto-flow: row;
  grid-template-areas:
    'title link desc entry delete'
    'preview preview preview preview preview';
}

.title {
  grid-area: title;
}

.link {
  grid-area: link;
}

.desc {
  grid-area: desc;
}

.entry {
  grid-area: entry;
}

.delete {
  grid-area: delete;
}

.preview {
  grid-area: preview;
}

.slider-update {
  &__string {
    display: flex;
    justify-content: space-between;
  }

  &__item {
    width: 100%;
    margin: 0 5px;
  }

  &__upload {
    margin: 10px 0;
  }
}
</style>
