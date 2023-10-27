<script setup lang="ts">
import { useEntryStore } from '@/stores/entry';
import { onBeforeMount } from 'vue';
import { useAdminStore } from '@/stores/admin';
import { storeToRefs } from 'pinia';
import { useDark, useToggle } from '@vueuse/core';

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
    create: 'menuCreate',
  },
  {
    title: 'Афиша',
    list: 'billboard',
    create: 'billboardCreate',
  },
];

const entryStore = useEntryStore();
const adminStore = useAdminStore();
const { username } = storeToRefs(adminStore);

onBeforeMount(async () => {
  adminStore.token = localStorage.getItem('token') || '';
  adminStore.username = localStorage.getItem('username') || '';
  await entryStore.createEntry({});
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
      <el-button @click="toggleDark()">Темная тема</el-button>
    </div>

    <div class="main">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin {
  display: flex;
  width: calc(100vw - 10px);
  height: calc(100vh - 10px);
  padding: 5px;
}

.aside {
  height: 100%;
  width: 15%;
  background-color: var(--el-bg-color-overlay);
  border-radius: 10px;
  display: flex;
  flex-direction: column;

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
}

:deep(.el-input__wrapper) {
  border-radius: 10px;
}
</style>
