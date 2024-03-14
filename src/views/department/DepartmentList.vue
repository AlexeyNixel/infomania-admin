<script setup lang="ts">
import dayjs from 'dayjs';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useDepartmentStore } from '@/stores/department';
import type { DepartmentResponseType } from '@/types/department-model';
import { Link } from '@element-plus/icons-vue';

const departmentStore = useDepartmentStore();
const department = ref<DepartmentResponseType>();

const route = useRoute();
const router = useRouter();

const handleDelete = async (id: string, status: boolean) => {
  await departmentStore.updateDepartment(id, { isDeleted: status });
};

onMounted(async () => {
  department.value = await departmentStore.getDepartments({ isDeleted: true });
});
</script>

<template>
  <div class="list">
    <div
      class="grid sticky grid-cols-5 gap-y-2 px-2 max-h-[94%] overflow-y-scroll"
    >
      <div class="text-center col-span-2">Название</div>
      <div class="text-center">Дата</div>
      <div class="text-center">Статус</div>
      <div class="text-center">Ссылка</div>
      <div
        v-if="department"
        class="grid grid-cols-5 col-span-5 dark:odd:bg-neutral-800 odd:bg-neutral-200 py-1 px-2 rounded-lg"
        v-for="item in department.data"
      >
        <router-link
          :to="{ name: 'departmentUpdate', params: { slug: item.id } }"
          class="col-span-2 my-auto hover:underline"
        >
          {{ item.title }}
        </router-link>
        <div class="text-center m-auto">
          {{ dayjs(new Date()).format('DD.MM.YYYY ') }}
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
          :href="`http://dev.infomania.ru/search?department=${item.slug}`"
        >
          <el-icon class="m-auto"><Link /></el-icon>
        </a>
      </div>
    </div>
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
