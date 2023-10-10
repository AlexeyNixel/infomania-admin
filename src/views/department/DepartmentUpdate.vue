<script setup lang='ts'>
import { useDepartmentStore } from '@/stores/department';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import TheUpload from '@/components/ui/TheUpload.vue';
import { Delete } from '@element-plus/icons-vue'

const route = useRoute();
const departmentStore = useDepartmentStore();

const preview = ref<string>();
const department = reactive<any>({
  title: '',
  slug: '',
  isDeleted: '',
  fileId: '',
});

const handleUpdate = async () => {
  await departmentStore.updateDepartment(route.params.slug as string, department);
};

onMounted(async () => {
  const { data } = await departmentStore.getDepartment(route.params.slug as string, {
    include: 'preview',
  });
  preview.value = data.preview.path;
  Object.keys(department).forEach((key) => {
    department[key] = data[key];
  });
});
</script>

<template>
  <div class='container'>
    <div class='department-update'>
      <div class='department-update__preview'>
        <the-upload :current-image='preview' v-model='department.fileId'/>
      </div>
      <div class='department-update__text'>
        <div class='department-update__item'>
          <span>Название</span>
          <el-input v-model='department.title' />
        </div>
        <div class='department-update__item'>
          <span>Слаг</span>
          <el-input v-model='department.slug' />
        </div>
        <div class='department-update__item'>
          <el-switch
            v-model='department.isDeleted'
            :active-action-icon="Delete"
            size="large"
          />
        </div>
        <div class='department-update__btn'>
          <el-button @click='handleUpdate'>Обновить</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
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