<script setup lang="ts">
import { useSliderStore } from '@/stores/slider';
import { onMounted, ref } from 'vue';
import { Link } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import { useRouter, useRoute } from 'vue-router';
import type { SlideResponseType } from '@/types/slide-model';
import { ElMessage } from 'element-plus';

const sliderStore = useSliderStore();
const slides = ref<SlideResponseType>();
const router = useRouter();
const route = useRoute();

const page = ref<number>(Number(route.query.page) || 1);

const handleDelete = async (slug: string, status: boolean) => {
  await sliderStore.updateSlide(slug, { isDeleted: status });
  return ElMessage({
    message: status ? 'Слайд удален' : 'Слайд восстановален',
    type: status ? 'error' : 'success',
  });
};

const handleNavigate = () => {
  fetchData();
  router.push({ name: 'slides', query: { page: page.value } });
};

const handleStoreItem = () => {
  slides.value?.data.sort((a, b) => {
    return a.isDeleted === b.isDeleted ? 0 : a.isDeleted ? 1 : -1;
  });
};

const fetchData = async () => {
  slides.value = await sliderStore.getSlides({
    isDeleted: true,
    pageSize: 30,
    orderBy: '-createdAt',
    page: page.value,
    include: 'entry',
  });
  handleStoreItem();
};

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <div class="entries" v-if="slides">
    <div class="header">
      <div class="title">Слайды</div>
      <el-button @click="router.push('/slides/create/')" class="btn">
        Создать
      </el-button>
    </div>
    <el-scrollbar height="100%" class="body">
      <div class="slide" v-for="slide in slides.data" :key="slide.id">
        <RouterLink
          :to="'/slides/update/' + slide.id"
          class="slide__item slide__item_long slide__item_link"
        >
          {{ slide.title }}
        </RouterLink>
        <div class="slide__item">
          {{ dayjs(slide.createdAt).format('DD.MM.YYYY') }}
        </div>
        <div class="slide__item">
          <el-checkbox
            @change="handleDelete(slide.id, slide.isDeleted)"
            v-model="slide.isDeleted"
            label="скрыта"
          />
        </div>
        <a
          :href="`http://dev.infomania.ru/slide/${slide.id}`"
          class="slide__item_external"
          target="_blank"
        >
          <el-icon>
            <Link />
          </el-icon>
        </a>
      </div>
    </el-scrollbar>
    <el-pagination
      v-if="slides.meta"
      v-model:current-page="page"
      :page-size="+slides.meta.pageSize"
      :total="+slides.meta.total"
      @current-change="handleNavigate"
      class="flex justify-center my-6"
      layout="prev, pager, next"
      background
    />
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
    .slide {
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
