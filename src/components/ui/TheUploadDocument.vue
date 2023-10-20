<script setup lang='ts'>
import { ref } from 'vue';

const uploadUrl = ref(import.meta.env['VITE_BASE_UPLOAD_URL'])

const uploadFile = ref()
const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
}

const afterUpload = (val: any) => {
  console.log(val);
  uploadFile.value = val
}
</script>

<template>
  <div>Документ</div>
  <el-upload
    class="upload-demo"
    :action="uploadUrl"
    :on-success='afterUpload'
    :limit='3'
    multiple
    :headers='headers'
  >
    <el-button type="primary">
      Загрузить документ
    </el-button>
  </el-upload>
  <el-input v-if='uploadFile' v-model='uploadFile.path'/>
</template>

<style scoped lang='scss'>

</style>