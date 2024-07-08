<script setup lang="ts">
import { useAdminStore } from '@/stores/admin';
import { onBeforeMount, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useDark, useToggle } from '@vueuse/core';
import axios from 'axios';
import { axiosApi } from '@/api/axios';

const links = [
  {
    title: 'Новости',
    value: '/entries',
  },
  {
    title: 'Документы',
    value: '/documents',
  },
  {
    title: 'Отделы',
    value: '/department',
  },
  {
    title: 'Слайды',
    value: '/slides',
  },
  {
    title: 'Меню',
    value: '/menu',
  },
  {
    title: 'Книги',
    value: '/book',
  },
  {
    title: 'Подборки книг',
    value: '/collections',
  },
  {
    title: 'Афиша',
    value: '/billboard',
  },
];
const generalStore = useAdminStore();
const { username } = storeToRefs(generalStore);
const isVideoUpload = ref(false);
const link = ref<string>('');

const uploadUrl = ref(import.meta.env['VITE_EXHIBITION_UPLOAD_URL']);
const apiKey = ref(import.meta.env['VITE_API_KEY_YOUTUBE']);

const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
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
  console.log(videoData);
  await axiosApi.post('/api/video', { ...videoData });
};

const isDark = useDark();
const toggleDark = useToggle(isDark);

onBeforeMount(async () => {});
</script>

<template>
  <div class="aside">
    <div class="header">
      <div class="logo">INFOMANIA</div>
      <div class="user">{{ username }}</div>
    </div>
    <RouterLink
      :to="link.value"
      v-for="link in links"
      :key="link.value"
      class="link"
    >
      {{ link.title }}
    </RouterLink>
    <div class="link" link @click="isVideoUpload = !isVideoUpload">Видео</div>
    <div v-if="isVideoUpload" class="video-upload">
      <el-input
        @keydown.enter="uploadVideo"
        v-model="link"
        placeholder="Ссылка на видео"
        autofocus
      />
    </div>

    <el-upload multiple :limit="3" :action="uploadUrl" :headers="headers">
      <div class="link">Загрузить выставку</div>
    </el-upload>
    <el-button @click="toggleDark()">Темная тема</el-button>
  </div>
</template>

<style scoped lang="scss">
.aside {
  @apply h-full w-[300px] bg-white dark:bg-neutral-900 rounded-xl p-4;

  .header {
    @apply text-center;

    .logo {
      @apply text-4xl font-bold;
    }
  }

  .link {
    @apply block my-2 text-xl hover:underline transition cursor-pointer;
  }
}

:deep(.el-button) {
  @apply m-0 p-0;
}
</style>
