<script lang="ts" setup>
interface Props {
  modelValue: string;
}

const emit = defineEmits(['update:modelValue']);

const handleChangeValue = (value: string) => {
  emit('update:modelValue', value);
};

defineProps<Props>();
</script>

<template>
  <div class="w-full">
    <el-input
      style="width: 100%"
      :rows="22"
      :model-value="modelValue"
      type="textarea"
      placeholder=""
      @update:modelValue="handleChangeValue"
    />
  </div>
</template>
