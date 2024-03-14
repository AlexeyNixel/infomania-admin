<script setup lang="ts">
import { Picture } from '@element-plus/icons-vue';
import { ref, watch } from 'vue';
import type { UploadProps } from 'element-plus';
import slugify from 'slugify';

type PropsType = {
  modelValue: string;
  currentImage?: string;
};

const newName = ref<string>('');

const props = defineProps<PropsType>();
const newImage = ref<string>();
const preview = ref<string>(props.currentImage!);
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
const uploadUrl = ref(import.meta.env['VITE_BASE_UPLOAD_URL']);

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  newImage.value = response.path;
  preview.value = response.path;
  handleChangeValue(response.id);
};

const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

const emit = defineEmits(['update:modelValue']);
const handleChangeValue = (value: string) => {
  emit('update:modelValue', value);
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  newName.value = slugify(rawFile.name, {
    replacement: '-',
    remove: /\.,?!\+=\*:;/g,
    lower: true,
    strict: false,
    locale: 'ru',
    trim: true,
  });
};

watch(props, () => {
  preview.value = newImage.value || (props.currentImage as string);
});
</script>

<template>
  <el-upload
    class="entry-create__top-preview ring-1 ring-neutral-300 dark:ring-neutral-600 rounded-[10px] w-max h-max flex items-center justify-center mr-2"
    :action="uploadUrl"
    :data="{ filename: newName }"
    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :headers="headers"
    :model-value="modelValue"
    :before-upload="beforeAvatarUpload"
    @update:model-value="handleChangeValue"
  >
    <img v-if="preview" :src="`${staticUrl}${preview}`" class="avatar" alt="" />
    <el-icon v-else class="flex flex-col avatar-uploader-icon">
      <Picture />
      <div class="text-base">загрузить изображение</div>
    </el-icon>
  </el-upload>
</template>

<style scoped lang="scss">
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
  // margin-right: 20px;
  text-align: center;
  background-color: var(--el-bg-color-overlay);
  &:hover {
    @apply bg-neutral-300 dark:bg-neutral-600 transition-all;
  }
}
</style>
