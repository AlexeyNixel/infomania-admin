<script setup lang="ts">
import { useBillboardStore } from '@/stores/billboard';
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import router from '@/router';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();

const billboardStore = useBillboardStore();
const billboards = ref();

const page = ref<number>(Number(route.query.page) || 1);

const handleNavigate = () => {
  router.push({ name: 'billboard', query: { page: page.value } });
  fetchData();
};

const handleDeleteBillboard = async (slug: string, status: boolean) => {
  await billboardStore.updateBillboard(slug, { isDeleted: status });
  return ElMessage({
    message: 'Афиша Удалена',
    type: 'success',
  });
};

const fetchData = async () => {
  billboards.value = await billboardStore.getBillboards({
    page: page.value,
    pageSize: 30,
    orderBy: '-eventDate',
  });
};

onMounted(async () => {
  fetchData();
});
</script>

<template>
  <div class="list">
    <div
      v-if="billboards"
      class="grid sticky grid-cols-5 gap-y-2 px-2 max-h-[94%] overflow-y-scroll"
    >
      <div class="text-center col-span-2">Название</div>
      <div class="text-center">Дата</div>
      <div class="text-center">Статус</div>
      <div class="text-center">Ссылка</div>
      <div
        class="grid grid-cols-5 col-span-5 dark:odd:bg-neutral-800 odd:bg-neutral-200 py-1 px-2 rounded-lg"
        v-for="item in billboards.data"
      >
        <router-link
          :to="{ name: 'documentUpdate', params: { slug: item.id } }"
          class="col-span-2 my-auto hover:underline"
        >
          {{ item.title }}
        </router-link>
        <div class="text-center m-auto">
          {{ dayjs(item.eventDate).format('DD.MM.YYYY ') }}
        </div>
        <div class="text-center m-auto">
          <el-checkbox
            @change="handleDeleteBillboard(item.id, item.isDeleted)"
            v-model="item.isDeleted"
            label="Скрыта"
            size="large"
          />
        </div>
        <a
          class="text-center m-auto"
          :href="`http://dev.infomania.ru/document/${item.id}`"
        >
          <img
            style="width: 30px; color: white"
            src="/external-link.svg"
            alt=""
          />
        </a>
      </div>
    </div>
    <el-pagination
      v-if="billboards"
      v-model:current-page="page"
      :page-size="Number(billboards.meta.pageSize)"
      :total="billboards.meta.total"
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
