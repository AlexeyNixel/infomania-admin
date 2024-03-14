<script setup lang="ts">
import { useDepartmentStore } from '@/stores/department';
import { reactive, ref } from 'vue';
import TheUpload from '@/components/ui/TheUpload.vue';
import { Delete } from '@element-plus/icons-vue';

const departmentStore = useDepartmentStore();

const preview = ref<string>();
const department = reactive({
  title: '',
  slug: '',
  isDeleted: false,
  fileId: '',
});

const handleUpdate = async () => {
  await departmentStore.createDepartment(department);
};
</script>

<template>
  <div class="container">
    <div class="department-update">
      <div class="department-update__preview">
        <the-upload v-model="department.fileId" :current-image="preview" />
      </div>
      <div class="department-update__text">
        <div class="department-update__item">
          <span>Название</span>
          <el-input v-model="department.title" />
        </div>
        <div class="department-update__item">
          <span>Слаг</span>
          <el-input v-model="department.slug" />
        </div>
        <div class="department-update__item">
          <el-checkbox label="Удален" v-model="department.isDeleted" border />
        </div>
        <div class="department-update__btn">
          <el-button @click="handleUpdate">Создать</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.department-update {
  display: flex;

  &__item {
    margin: 20px 0;
  }
}
</style>
