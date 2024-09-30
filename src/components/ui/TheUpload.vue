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
  console.log(rawFile);
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
  <div class="w-full mr-2">
    <el-upload
      class="upload"
      :action="uploadUrl"
      :http-request="(e) => console.log(e)"
      :data="{ filename: newName }"
      accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :headers="headers"
      :model-value="modelValue"
      :before-upload="beforeAvatarUpload"
      @update:model-value="handleChangeValue"
    >
      <img
        v-if="preview"
        :src="`${staticUrl}${preview}`"
        class="avatar"
        alt=""
      />
      <el-icon v-else class="upload__icon">
        <Picture class="text-5xl" />
        <div class="">загрузить изображение</div>
      </el-icon>
    </el-upload>
  </div>
</template>

<style scoped lang="scss">
.upload {
  @apply flex items-center justify-center ring-1 ring-neutral-300 dark:ring-neutral-600 rounded-[10px] h-full w-full;
  &__icon {
    @apply flex flex-col bg-neutral-800 w-full h-full rounded-[10px];
  }
  .avatar {
    @apply h-full object-cover rounded-[10px];
  }
}

:deep(.el-upload) {
  @apply w-full h-full;
}
</style>
