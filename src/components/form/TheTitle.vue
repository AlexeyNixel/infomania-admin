<template>
  <div>
    <el-input
      :model-value="modelValue"
      @update:model-value="handleChangeValue"
    />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue?: string;
}

defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const handleChangeValue = (value: string) => {
  emit('update:modelValue', value);
};
</script>
