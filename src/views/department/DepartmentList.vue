<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useDepartmentStore } from '@/stores/department';
import type { DepartmentResponseType } from '@/types/department-model';
import { Link } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

const departmentStore = useDepartmentStore();
const departments = ref<DepartmentResponseType>();

const router = useRouter();

const handleDelete = async (id: string, status: boolean) => {
  await departmentStore.updateDepartment(id, { isDeleted: status });
  return ElMessage({
    message: status ? 'Отдел удален' : 'Отдел восстановален',
    type: status ? 'error' : 'success',
  });
};

onMounted(async () => {
  departments.value = await departmentStore.getDepartments({ isDeleted: true });
  departments.value?.data.sort((a: any): any => {
    if (!a.isDeleted) return -1;
  });
});
</script>

<template>
  <div class="entries" v-if="departments">
    <div class="header">
      <div class="title">Отделы</div>
      <el-button @click="router.push('/department/create/')" class="btn">
        Создать
      </el-button>
    </div>
    <el-scrollbar height="100%" class="body">
      <div
        class="department"
        v-for="department in departments.data"
        :key="department.id"
      >
        <RouterLink
          :to="'/department/update/' + department.slug"
          class="department__item department__item_long department__item_link"
        >
          {{ department.title }}
        </RouterLink>
        <div class="department__item">
          <el-checkbox
            @change="handleDelete(department.id, department.isDeleted)"
            v-model="department.isDeleted"
            label="скрыта"
          />
        </div>
        <a
          :href="`http://dev.infomania.ru/department/${department.slug}`"
          class="department__item_external"
          target="_blank"
        >
          <el-icon>
            <Link />
          </el-icon>
        </a>
      </div>
    </el-scrollbar>
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
    .department {
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
