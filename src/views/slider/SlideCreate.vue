<script setup lang='ts'>
import { useRoute } from 'vue-router';
import { useSliderStore } from '@/stores/slider';
import { onMounted, reactive, ref } from 'vue';
import TheUploadSlide from '@/components/ui/TheUploadSlide.vue';
import TheSelect from '@/components/ui/TheSelect.vue';

const preview = ref<string>();
const route = useRoute();
const sliderStore = useSliderStore();
const slide = reactive({
  title: '',
  url: '',
  desc: '',
  fileId: '',
  entryId: '',
  isDeleted: false,
});

const handleCreateSlide = async () => {
  await sliderStore.createSlide(slide);
};
</script>

<template>
  <div class='container'>
    <div class='slider-update'>
      <div class='slider-update__string'>
        <div class='slider-update__item'>
          <span>Название</span>
          <el-input v-model='slide.title' />
        </div>
        <div class='slider-update__item'>
          <span>Ссылка</span>
          <el-input v-model='slide.url' />
        </div>
        <div class='slider-update__item'>
          <span>Описание</span>
          <el-input v-model='slide.desc' />
        </div>
        <div class='slider-update__item'>
          <div>Новость</div>
          <the-select  entry-order='entry' v-model='slide.entryId'/>
        </div>
        <div class='slider-update__item' style='width: 10%'>
          <div>Удален</div>
          <el-switch v-model='slide.isDeleted'/>
        </div>
      </div>
      <the-upload-slide
        class='slider-update__upload'
        :current-image='preview'
        v-model='slide.fileId'
      />
    </div>
    <div class='slider-update__btn'>
      <el-button @click='handleCreateSlide'>Создать</el-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.container {
  background-color: var(--el-bg-color-overlay);
  height: calc(100% - 20px);
  border-radius: 10px;
  padding: 10px;
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