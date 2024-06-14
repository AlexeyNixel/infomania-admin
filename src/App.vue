<script setup lang="ts">
import { useEntryStore } from '@/stores/entry';
import { onBeforeMount, ref } from 'vue';
import { useAdminStore } from '@/stores/admin';
import { storeToRefs } from 'pinia';
import { useDark, useToggle } from '@vueuse/core';
import type { UploadProps, UploadUserFile } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const buttons = [
  {
    title: 'Новости',
    list: 'entries',
    create: 'entryCreate',
  },
  {
    title: 'Документы',
    list: 'documents',
    create: 'documentCreate',
  },
  {
    title: 'Отделы',
    list: 'department',
    create: 'departmentCreate',
  },
  {
    title: 'Слайды',
    list: 'slides',
    create: 'slidesCreate',
  },
  {
    title: 'Меню',
    list: 'menu',
    create: 'menuItemCreate',
  },
  {
    title: 'Книги',
    list: 'book',
    create: 'bookCreate',
  },
  {
    title: 'Подборки книг',
    list: 'collections',
    create: 'collectionCreate',
  },
  {
    title: 'Афиша',
    list: 'billboard',
    create: 'billboardCreate',
  },
  {
    title: 'Уведомления',
    list: 'notification',
    create: 'notificationCreate',
  },
];

const entryStore = useEntryStore();
const adminStore = useAdminStore();
const { username } = storeToRefs(adminStore);
const uploadUrl = ref(import.meta.env['VITE_EXHIBITION_UPLOAD_URL']);
const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  );
};

onBeforeMount(async () => {
  adminStore.token = localStorage.getItem('token') || '';
  adminStore.username = localStorage.getItem('username') || '';
  await entryStore.updateEntry('123', {});
});
</script>

<template>
  <div class="admin">
    <div class="aside">
      <a href="http://dev.infomania.ru" class="aside__title">INFOMANIA</a>
      <div class="aside__username">{{ username }}</div>
      <div class="aside__item" v-for="(item, index) in buttons" :key="index">
        <div class="aside__menu">{{ item.title }}</div>
        <div class="aside__link">
          <router-link :to="{ name: item.list }" class="aside__path">
            Список
          </router-link>
          <div class="aside__path">/</div>
          <router-link :to="{ name: item.create }" class="aside__path">
            Создать
          </router-link>
        </div>
      </div>
      <el-button class="mx-2" @click="toggleDark()">Темная тема</el-button>
      <el-upload
        class="block w-full text-center text-neutral-800 dark:text-neutral-200"
        multiple
        :limit="3"
        :action="uploadUrl"
        :headers="headers"
        :on-exceed="handleExceed"
      >
        <div
          class="ring-1 my-1 mx-2 text-sm w-full ring-neutral-300 dark:ring-neutral-600 px-2 py-[5px] rounded-lg"
        >
          Загрузить выставку
        </div>
      </el-upload>
    </div>

    <div class="main">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin {
  display: flex;
  width: calc(100vw);
  height: calc(100vh);
  padding: 5px;
}

.aside {
  height: 100%;
  width: 15%;
  overflow-y: scroll;
  background-color: var(--el-bg-color-overlay);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  transition: var(--transition-time) all !important;

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: bold;
    font-size: 2vw;
    color: var(--el-text-color);
    margin: 10px 0;
  }

  &__username {
    text-align: center;
    font-size: 1vw;
  }

  &__item {
    margin: 10px 20px;
    padding: 5px;
    border-radius: 10px;
    font-size: 1.2rem;
  }

  &__link {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-left: 0.6vw;
  }

  &__path {
    font-size: 1.1rem;

    &:hover {
      text-decoration: underline;
    }
  }
}

.main {
  height: 100%;
  width: calc(85% - 5px);
  border-radius: 10px;
  margin-left: 5px;
  transition: var(--transition-time) all !important;
}

:deep(.el-input__wrapper) {
  border-radius: 10px;
}

:deep(.el-button) {
  border-radius: 8px;
}

:deep(.el-upload) {
  width: 100%;
}
</style>
