<script setup lang="ts">
import { useDepartmentStore } from '@/stores/department';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TheUpload from '@/components/ui/TheUpload.vue';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const departmentStore = useDepartmentStore();

const preview = ref<string>();
const department = reactive<any>({
  title: '',
  slug: '',
  isDeleted: '',
  fileId: '',
});

const handleUpdate = async () => {
  await departmentStore.updateDepartment(
    route.params.slug as string,
    department
  );
  ElMessage({
    message: 'Отдел обновлен',
    type: 'success',
  });
  await router.push({ name: 'department' });
};

onMounted(async () => {
  const { data } = await departmentStore.getDepartment(
    route.params.slug as string,
    {
      include: 'preview',
      isDeleted: true,
    }
  );
  preview.value = data.preview?.path;
  Object.keys(department).forEach((key) => {
    department[key] = data[key];
  });
});
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
        <el-button class="fields__item" @click="handleUpdate">
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
