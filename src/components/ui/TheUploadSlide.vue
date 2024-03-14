<script setup lang="ts">
import { Picture } from '@element-plus/icons-vue';
import { ref, watch } from 'vue';
import type { UploadProps } from 'element-plus';

type PropsType = {
  modelValue: string;
  currentImage?: string;
};

const props = defineProps<PropsType>();
const newImage = ref<string>();
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
const uploadUrl = ref(import.meta.env['VITE_BASE_UPLOAD_URL']);
const preview = ref<string>(props.currentImage!);
const emit = defineEmits(['update:modelValue']);

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  newImage.value = response.path;
  preview.value = response.path;
  handleChangeValue(response.id);
};

const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

const handleChangeValue = (value: string) => {
  emit('update:modelValue', value);
};

watch(props, () => {
  preview.value = newImage.value || (props.currentImage as string);
});
</script>

<template>
  <el-upload
    class="entry-create__top-preview ring-1 ring-neutral-300 dark:ring-neutral-600 rounded-[10px] flex items-center justify-center mr-2"
    :action="uploadUrl"
    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :headers="headers"
    :model-value="modelValue"
    @update:model-value="handleChangeValue"
  >
    <img
      v-if="preview"
      :src="`${staticUrl}${preview}`"
      class="avatar rounded-[10px]"
      alt=""
    />
    <el-icon v-else class="avatar-uploader-icon flex flex-col">
      <Picture />
      <div class="text-base">загрузить изображение</div>
    </el-icon>
  </el-upload>
</template>

<style scoped lang="scss">
:deep(.el-upload) {
  width: 100%;
  height: 22vw;
}
.avatar {
  width: 100%;
  height: 22vw;
  background: var(--document-bg-color);
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: var(--document-bg-color);
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
  background: var(--document-bg-color);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  background: var(--document-bg-color);
  width: 100%;
  height: 100%;
  text-align: center;
  border-radius: 10px;
  &:hover {
    @apply bg-neutral-300 dark:bg-neutral-600 transition-all;
  }
}
:deep(.el-upload el-upload--text img) {
  width: 100%;
  height: 100%;
  background: var(--document-bg-color);
}
</style>
