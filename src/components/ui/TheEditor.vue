<template>
  <div class="editor">
    <ckeditor
      class="editor"
      :editor="editor"
      :model-value="modelValue"
      :config="editorConfig"
      @update:model-value="handleChangeValue"
    />
  </div>
</template>

<script lang="ts" setup>
// import '@/plugins/ckeditor/ckeditor.js';
import '@/plugins/ckeditor/ckeditor.js';
import { uploadAdapter } from '@/utils/uploadAdapter';
import { ref } from 'vue';
type PropsType = {
  modelValue?: string;
  field?: string;
  type?: string;
};

const editorConfig = ref({
  extraPlugins: [uploadAdapter],
  allowedContent: true,
  // startupMode: 'source',
  mediaEmbed: {
    previewsInData: true,
  },
  link: {
    addTargetToExternalLinks: true,
  },
  image: {
    resizeOptions: [
      {
        name: 'resizeImage:original',
        value: null,
        label: 'Original',
      },
      {
        name: 'resizeImage:20',
        value: '20',
        label: '20%',
      },
      {
        name: 'resizeImage:33',
        value: '33',
        label: '33%',
      },
      {
        name: 'resizeImage:40',
        value: '40',
        label: '40%',
      },
      {
        name: 'resizeImage:60',
        value: '60',
        label: '60%',
      },
      {
        name: 'resizeImage:80',
        value: '80',
        label: '80%',
      },
    ],
    toolbar: ['resizeImage'],
  },
});
//@ts-ignore
const editor = ClassicEditor;
defineProps<PropsType>();

const emit = defineEmits(['update:modelValue']);

const handleChangeValue = (value: string) => {
  emit('update:modelValue', value);
};
</script>

<style lang="scss" scoped>
:deep(.ck.ck-editor__main > .ck-editor__editable) {
  background-color: var(--ck-editor-header-bg);
  border: 1px solid #4c4d4f;
  height: 50vh;
  border-radius: 0 0 10px 10px;
}

:deep(
    .ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-toolbar,
    .ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners
  ) {
  border-radius: 10px 10px 0 0;
}

:deep(.ck.ck-toolbar) {
  background-color: var(--ck-editor-header-bg);
  border: 1px solid #4c4d4f;
  border-radius: 10px;
}

:deep(.ck.ck-editor__main > .ck-editor__editable) {
  background-color: var(--ck-editor-header-bg);
  border: 1px solid var(--ck-editor-border-color);
}

:deep(.ck.ck-toolbar) {
  background-color: var(--ck-editor-header-bg);
  border: 1px solid var(--ck-editor-border-color);
}

:deep(.ck.ck-button, a.ck.ck-button) {
  color: var(--text-color);
}
</style>
