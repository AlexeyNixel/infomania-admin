<script setup lang="ts">
import { ref } from 'vue';

const uploadUrl = ref(import.meta.env['VITE_BASE_UPLOAD_URL']);

const uploadFile = ref();
const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

const afterUpload = (val: any) => {
  uploadFile.value = val;
};
</script>

<template>
  <div class="w-full">
    <el-upload
      class="flex mb-2 w-full p-0 upload-demo"
      :action="uploadUrl"
      :on-success="afterUpload"
      :limit="3"
      multiple
      :headers="headers"
    >
      <el-button type="primary"> Загрузить документ </el-button>
    </el-upload>
    <el-input v-if="uploadFile" v-model="uploadFile.path" />
  </div>
</template>

<style scoped lang="scss">
:deep(.el-upload) {
  @apply w-full;
}

:deep(.el-button) {
  @apply w-full;
}

:deep(.el-upload-list) {
  @apply hidden;
}
</style>
