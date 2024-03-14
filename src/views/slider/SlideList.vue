<script setup lang="ts">
import { useSliderStore } from '@/stores/slider';
import { onMounted, ref } from 'vue';
import { Link } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import { useRouter, useRoute } from 'vue-router';
import type { SlideResponseType } from '@/types/slide-model';

const sliderStore = useSliderStore();
const slides = ref<SlideResponseType>();
const router = useRouter();
const route = useRoute();

const page = ref<number>(Number(route.query.page) || 1);

const hidenSlide = ref<object[]>([]);

const handleDelete = async (slug: string, status: boolean) => {
  await sliderStore.updateSlide(slug, { isDeleted: status });
};

const handleNavigate = async () => {
  router.push({ name: 'slides', query: { page: page.value } });
  await fetchData();
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
  console.log(slides.value);

  handleStoreItem();
};

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <div class="list">
    <div
      v-if="slides"
      class="grid sticky grid-cols-5 gap-y-2 px-2 max-h-[94%] overflow-y-scroll"
    >
      <div class="text-center col-span-2">Название</div>
      <div class="text-center">Дата</div>
      <div class="text-center">Статус</div>
      <div class="text-center">Ссылка</div>
      <template v-if="slides" v-for="item in slides.data">
        <div
          class="grid grid-cols-5 col-span-5 dark:odd:bg-neutral-800 odd:bg-neutral-200 py-1 px-2 rounded-lg"
        >
          <router-link
            :to="{ name: 'slidesUpdate', params: { slug: item.id } }"
            class="col-span-2 my-auto hover:underline"
          >
            {{ item.title }}
          </router-link>
          <div class="text-center m-auto">
            {{ dayjs(item.createdAt).format('DD.MM.YYYY ') }}
          </div>
          <div class="text-center m-auto">
            <el-checkbox
              @change="handleDelete(item.id, item.isDeleted)"
              v-model="item.isDeleted"
              label="Скрыта"
              size="large"
            />
          </div>
          <a
            class="flex justify-center items-center my-[5px] text-center text-3xl text-neutral-700 dark:text-white"
            :href="`http://dev.infomania.ru/entry/${item.entry?.slug}`"
          >
            <el-icon class="m-auto"><Link /></el-icon>
          </a>
        </div>
      </template>
    </div>
    <el-pagination
      v-if="slides"
      v-model:current-page="page"
      v-model:page-size="slides.meta.pageSize"
      v-model:total="slides.meta.total"
      @current-change="handleNavigate"
      class="flex justify-center my-6"
      layout="prev, pager, next"
      background
    />
  </div>
</template>

<style scoped lang="scss">
.list {
  background-color: var(--el-bg-color-overlay);
  border-radius: 10px;
  height: 100%;
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
