<template>
  <div>
    <el-input :model-value="modelValue" @update:model-value="handleChangeValue" placeholder="Заголовок"></el-input>
  </div>
</template>

<script lang="ts" setup>
import '@/plugins/ckeditor/baloon/ckeditor.js';
import { ref } from 'vue';

defineProps<{ modelValue?: string }>();

const emit = defineEmits(['update:modelValue']);
const handleChangeValue = (value: string) => {
  emit('update:modelValue', value);
};

//@ts-ignore
const editor = BalloonEditor;
const config = {
  placeholder: 'Заголовок',
};
</script>

<style lang="scss" scoped>
.ck.ck-editor__editable.ck-rounded-corners:not(.ck-editor__nested-editable) {
  border-radius: 10px;
  padding: 0 10px !important;
  margin: 0 !important;
}

.ck.ck-editor__editable_inline> :last-child {
  margin: 5px 0;
}

:deep(.el-input__inner) {
  @apply text-2xl font-bold;
}
</style>
