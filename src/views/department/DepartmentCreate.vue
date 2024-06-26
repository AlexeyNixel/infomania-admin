<script setup lang="ts">
import { useDepartmentStore } from '@/stores/department';
import { reactive, ref } from 'vue';
import TheUpload from '@/components/ui/TheUpload.vue';
import { ElMessage } from 'element-plus';

const departmentStore = useDepartmentStore();

const preview = ref<string>();
const department = reactive({
  title: '',
  slug: '',
  isDeleted: false,
  fileId: '',
});

const createDepartment = async () => {
  await departmentStore.createDepartment(department);
  return ElMessage({
    message: 'Отдел создан',
    type: 'success',
  });
};
</script>

<template>
  <div class="wrapper">
    <div class="department-update">
      <the-upload
        class="preview"
        v-model="department.fileId"
        :current-image="preview"
      />
      <div class="fields">
        <el-input
          class="fields__item"
          placeholder="Название"
          v-model="department.title"
        />
        <el-input
          class="fields__item"
          placeholder="Слаг"
          v-model="department.slug"
        />
        <el-checkbox
          class="fields__item"
          label="удален"
          v-model="department.isDeleted"
          border
        />
        <el-button class="fields__item" @click="createDepartment">
          Создать
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  @apply h-full flex items-center justify-center;
}

.department-update {
  @apply flex w-[600px];
  .preview {
    @apply h-[300px] w-1/2;
  }
  .fields {
    @apply flex flex-col w-1/2;
    &__item {
      @apply my-2;
    }
  }
}
</style>
