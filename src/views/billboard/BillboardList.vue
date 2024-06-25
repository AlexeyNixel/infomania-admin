<script setup lang="ts">
import { useBillboardStore } from '@/stores/billboard';
import dayjs from 'dayjs';
import { onBeforeMount, ref } from 'vue';
import { ElMessage } from 'element-plus';
import router from '@/router';
import { useRoute } from 'vue-router';
import { Link } from '@element-plus/icons-vue';

const route = useRoute();

const billboardStore = useBillboardStore();
const billboards = ref();

const page = ref<number>(Number(route.query.page) || 1);

const handleNavigate = () => {
  router.push({ name: 'billboard', query: { page: page.value } });
  fetchData();
};

const handleDelete = async (slug: string, status: boolean) => {
  await billboardStore.updateBillboard(slug, { isDeleted: status });
  return ElMessage({
    message: status ? 'Событие удалено' : 'Событие восстановалено',
    type: status ? 'error' : 'success',
  });
};

const fetchData = async () => {
  billboards.value = await billboardStore.getBillboards({
    page: page.value,
    pageSize: 30,
    orderBy: '-eventDate',
    isDeleted: true,
  });
};

onBeforeMount(() => {
  fetchData();
});
</script>

<template>
  <div class="entries" v-if="billboards">
    <div class="header">
      <div class="title">События</div>
      <el-button @click="router.push('/billboard/create/')" class="btn">
        Создать
      </el-button>
    </div>
    <el-scrollbar height="100%" class="body">
      <div
        class="billboard"
        v-for="billboard in billboards.data"
        :key="billboard.id"
      >
        <RouterLink
          :to="'/billboard/update/' + billboard.slug"
          class="billboard__item billboard__item_long billboard__item_link"
        >
          {{ billboard.title }}
        </RouterLink>
        <div class="billboard__item">
          {{ dayjs(billboard.eventDate).format('DD.MM.YYYY') }}
        </div>
        <div class="billboard__item">
          <el-checkbox
            @change="handleDelete(billboard.id, billboard.isDeleted)"
            v-model="billboard.isDeleted"
            label="скрыта"
          />
        </div>
        <a
          :href="`http://dev.infomania.ru/billboard/${billboard.slug}`"
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
      v-if="billboards.meta"
      v-model:current-page="page"
      :page-size="+billboards.meta.pageSize"
      :total="+billboards.meta.total"
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
