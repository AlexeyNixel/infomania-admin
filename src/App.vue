<script setup lang='ts'>
import { useEntryStore } from '@/stores/entry';
import { onBeforeMount } from 'vue';

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
];

const entryStore = useEntryStore()

onBeforeMount(async () => {
  await entryStore.createEntry({})
})
</script>

<template>
  <div class='admin'>
    <div class='aside'>
      <a href='http://dev.infomania.ru'  class='aside__title'>INFOMANIA</a>
      <div class='aside__item' v-for='(item, index) in buttons' :key='index'>
        <div class='aside__menu'>{{ item.title }}</div>
        <div class='aside__link'>
          <router-link :to='{name: item.list}' class='aside__path'>Список</router-link>
          <div class='aside__path'>/</div>
          <router-link :to='{name: item.create}' class='aside__path'>Создать</router-link>
        </div>
      </div>
    </div>
    <div class='main'>
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang='scss'>
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

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: bold;
    font-size: 2vw;
    height: 8%;
    color: white;
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
    margin-left: .6vw;
  }

  &__path {
    font-size: 1.1rem;
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
