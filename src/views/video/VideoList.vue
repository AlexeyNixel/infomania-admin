<script setup lang="ts">
import dayjs from 'dayjs';
import { onBeforeMount, ref } from 'vue';
import { ElMessage } from 'element-plus';
import router from '@/router';
import { useRoute } from 'vue-router';
import { Link } from '@element-plus/icons-vue';
import { axiosApi } from '@/api/axios';
import axios from 'axios';

const route = useRoute();

const apiKey = ref(import.meta.env['VITE_API_KEY_YOUTUBE']);
const page = ref<number>(Number(route.query.page) || 1);
const videos = ref();
const link = ref('');

const handleNavigate = () => {
  router.push({ name: 'billboard', query: { page: page.value } });
  fetchData();
};

const uploadVideo = async () => {
  const id = link.value.slice(32);
  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet`,
    {
      params: {
        id: id,
        key: apiKey.value,
      },
    }
  );
  const videoData = data.items[0].snippet.localized;
  videoData['preview'] = data.items[0].snippet.thumbnails.standard.url;
  videoData['url'] = link.value;
  await axiosApi.post('/api/video', { ...videoData });
  await fetchData();
};

// const handleDelete = async (slug: string, status: boolean) => {
//   await videostore.updateBillboard(slug, { isDeleted: status });
//   return ElMessage({
//     message: status ? 'Событие удалено' : 'Событие восстановалено',
//     type: status ? 'error' : 'success',
//   });
// };

const fetchData = async () => {
  videos.value = await axiosApi.get('/api/video');
  console.log(videos.value);
};

onBeforeMount(() => {
  fetchData();
});
</script>

<template>
  <div class="entries" v-if="videos">
    <div class="header">
      <div class="title">Видео</div>
      <el-input v-model="link" placeholder="Ссылка на видео" />
      <el-button @click="uploadVideo" class="btn"> Создать </el-button>
    </div>
    <el-scrollbar height="100%" class="body">
      <div
        class="billboard"
        v-for="billboard in videos.data"
        :key="billboard.id"
      >
        <RouterLink
          :to="'/billboard/update/' + billboard.slug"
          class="billboard__item billboard__item_long billboard__item_link"
        >
          {{ billboard.title }}
        </RouterLink>
        <div class="billboard__item">
          {{ dayjs(billboard.createdAt).format('DD.MM.YYYY') }}
        </div>
        <!--        <div class="billboard__item">-->
        <!--          <el-checkbox-->
        <!--            @change="handleDelete(billboard.id, billboard.isDeleted)"-->
        <!--            v-model="billboard.isDeleted"-->
        <!--            label="скрыта"-->
        <!--          />-->
        <!--        </div>-->
        <a
          :href="billboard.url"
          class="billboard__item_external"
          target="_blank"
        >
          <el-icon>
            <Link />
          </el-icon>
        </a>
      </div>
    </el-scrollbar>
    <el-pagination
      v-if="videos.meta"
      v-model:current-page="page"
      :page-size="+videos.meta.pageSize"
      :total="+videos.meta.total"
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
      @apply rounded-xl ml-2;
    }
    :deep(.el-input__wrapper) {
      @apply rounded-xl ml-2;
    }
  }
  .body {
    @apply mt-2 h-[90%];
    .billboard {
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
