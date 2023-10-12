<script setup lang='ts'>
import { useSliderStore } from '@/stores/slider';
import { onMounted, ref } from 'vue';
import type { SliderType } from '@/types/models';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';

const sliderStore = useSliderStore();
const slides = ref<SliderType[]>();
const router = useRouter();

onMounted(async () => {
  const { data } = await sliderStore.getSlides({
    isDeleted: true,
    pageSize: 30,
  });
  slides.value = data;
});
</script>

<template>
  <div class='list'>
    <div class='list__header'>
      <div class='list__field-long'>Название</div>
      <div class='list__field'>Дата</div>
      <div class='list__field'>Статус</div>
    </div>
    <el-scrollbar>
      <div class='list-item' v-for='item in slides' :key='item.id'>
        <router-link :to='{name:"slidesUpdate", params:{slug:item.id}}' class='list-item__field-long'>{{ item.title }}</router-link>
        <div class='list-item__field'>
          {{ dayjs(item.publishedAt).format('DD.MM.YYYY') }}
        </div>
        <div class='list-item__field'>
          <el-checkbox v-model='item.isDeleted' label='Удален' size='large' />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped lang='scss'>
.list {
  background-color: var(--el-bg-color-overlay);
  border-radius: 10px;
  height: 100%;

  &__header {
    display: flex;
    padding: 15px;
  }

  &__field {
    width: 16.66%;
    border-right: 1px solid white;
    text-align: center;

    &-long {
      width: 78%;
      text-align: center;
      border-right: 1px solid white;

    }
  }
}

.list-item {
  display: flex;
  padding: 1vh 15px;
  margin: 1vh 0;

  &__field {
    width: 16.66%;
    text-align: center;

    &-long {
      width: 78%;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}

:deep(.el-scrollbar) {
  height: calc(90% - 5px);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-button) {
  border-radius: 10px;
}
</style>