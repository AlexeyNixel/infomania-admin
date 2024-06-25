<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useMenuStore } from '@/stores/menu';
import type { MenuResponseType } from '@/types/menu-model';

const menuStore = useMenuStore();
const menus = ref<MenuResponseType>();

const route = useRoute();
const router = useRouter();

const menuTypeTranslate: { [key: string]: string } = {
  COLLEAGUES: 'КОЛЛЕГАМ',
  ABOUT: 'О БИБЛИОТЕКЕ',
  DOCUMENTS: 'ДОКУМЕНТЫ',
  COMMON: 'ЧИТАТЕЛЯМ',
};

const page = ref<number>(Number(route.query.page) || 1);

const handleDelete = async (id: string, status: boolean) => {
  await menuStore.updateMenu(id, { isDeleted: status });
};

const fetchData = async () => {
  menus.value = await menuStore.getMenus({
    isDeleted: true,
    page: page.value,
    pageSize: 30,
    orderBy: '-createdAt',
  });
};

const handleNavigate = async () => {
  router.push({ name: 'menu', query: { page: page.value } });
  fetchData();
};

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <div class="entries" v-if="menus">
    <div class="header">
      <div class="title">Меню</div>
      <el-button @click="router.push('/menus/create/')" class="btn">
        Создать
      </el-button>
    </div>
    <el-scrollbar height="100%" class="body">
      <div class="menu" v-for="menu in menus.data" :key="menu.id">
        <RouterLink
          :to="'/menu/update/' + menu.id"
          class="menu__item menu__item_long menu__item_link"
        >
          {{ menu.title }}
        </RouterLink>
        <div class="menu__item">
          {{ menuTypeTranslate[menu.menuType] }}
        </div>
        <div class="menu__item">
          <el-checkbox
            @change="handleDelete(menu.id, menu.isDeleted)"
            v-model="menu.isDeleted"
            label="скрыта"
          />
        </div>
      </div>
    </el-scrollbar>
    <el-pagination
      v-if="menus.meta"
      v-model:current-page="page"
      :page-size="+menus.meta.pageSize"
      :total="+menus.meta.total"
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
    .menu {
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
