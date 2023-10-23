<script setup lang="ts">
import type { EntryType, MenuItemType } from '@/types/models';
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import { useRoute, useRouter } from 'vue-router';
import { useMenuStore } from '@/stores/menu';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const menuStore = useMenuStore();
const entries = ref<EntryType[]>();
const menuItem = ref<MenuItemType[]>();

const totalPage = ref<number>(1);
const page = ref<number>(Number(route.query.page) || 1);

const handleDelete = async (id: string, status: boolean) => {
  ElMessage({
    message: status ? 'Предмет удален' : 'Предмет восстановлен',
    type: 'success',
  });
  return await menuStore.updateMenuItem(id, { isDeleted: status });
};

const fetchData = async (val?: number) => {
  if (val) {
    page.value = val;
  }
  const { data, meta } = await menuStore.getMenusItem({
    pageSize: 30,
    orderBy: '-createdAt',
    page: page.value || 1,
    isDeleted: true,
  });

  router.push({ name: 'menu', query: { page: page.value } });
  menuItem.value = data;
  totalPage.value = meta.pages;
};

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <div class="list">
    <div class="list__header">
      <div class="list__field-long">Название</div>
      <div class="list__field">Дата</div>
      <div class="list__field">Статус</div>
      <div class="list__field">Ссылка</div>
    </div>
    <el-scrollbar>
      <div class="list-item" v-for="menu in menuItem" :key="menu.id">
        <router-link
          :to="{ name: 'menuUpdate', params: { slug: menu.id } }"
          class="list-item__field-long"
          >{{ menu.title }}</router-link
        >
        <div class="list-item__field">
          {{ dayjs(menu.publishedAt).format('DD.MM.YYYY') }}
        </div>
        <div class="list-item__field">
          <el-checkbox
            @change="handleDelete(menu.id, menu.isDeleted)"
            v-model="menu.isDeleted"
            label="Удален"
            size="large" />
        </div>
        <div class="list-item__field">
          <a :href="`http://dev.infomania.ru/entry/${menu.slug}`">
            <img
              style="width: 30px; color: white"
              src="/external-link.svg"
              alt="" />
          </a>
        </div>
      </div>
    </el-scrollbar>
    <el-pagination
      @current-change="fetchData"
      :current-page="page"
      class="pagination"
      background
      layout="prev, pager, next"
      :page-size="30"
      :page-count="totalPage" />
  </div>
</template>

<style scoped lang="scss">
.header {
  background-color: var(--el-bg-color-overlay);
  border-radius: 10px;
  height: 8%;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

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
      width: 50%;
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
      width: 50%;

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
