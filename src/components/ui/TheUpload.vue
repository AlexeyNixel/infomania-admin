<script setup lang='ts'>
import { Plus } from '@element-plus/icons-vue';
import { onMounted, ref, watch } from 'vue';
import type { UploadProps } from 'element-plus';

type PropsType = {
  modelValue: string
  currentImage?: string
}

const props = defineProps<PropsType>()
const staticUrl = ref(import.meta.env["VITE_STATIC_URL"]);
const uploadUrl = ref(import.meta.env["VITE_BASE_UPLOAD_URL"]);
const preview = ref<string>(props.currentImage!)
const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  console.log(response);
  preview.value = response.path;
  handleChangeValue(response.id)
};
const headers = {
  "Authorization": `Bearer ${localStorage.getItem("token")}`
};

const emit = defineEmits(["update:modelValue"]);
const handleChangeValue = (value: string) => {
  emit("update:modelValue", value);
};

watch(props, () => {
  preview.value = props.currentImage as string
})

</script>

<template>
  <el-upload
    class="entry-create__top-preview"
    :action="uploadUrl"
    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :headers="headers"
    :model-value="modelValue"
    @update:model-value="handleChangeValue"
  >
    <img v-if="preview"  :src="`${staticUrl}${preview}`" class="avatar" alt=""  />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<style scoped lang='scss'>
.avatar {
  width: 290px;
  border-radius: 10px;
  margin-right: 10px;
  max-height: 300px;
  object-fit: cover;

}

.avatar-uploader .el-upload {
  border: 1px dashed black;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: black;
}

.el-icon.avatar-uploader-icon {
  font-size: 3rem;
  color: #8c939d;
  width: 290px;
  height: 300px;
  border-radius: 10px;
  margin-right: 20px;
  text-align: center;
  background-color: var(--el-bg-color-overlay);
}
</style>