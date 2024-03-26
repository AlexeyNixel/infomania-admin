<script setup lang="ts">
interface Props {
  modelValue?: boolean;
}

defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const handleChangeValue = (value: boolean) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <Teleport v-if="modelValue" to="body">
    <div class="absolute top-1/2 left-1/2 h-[300px] w-[600px] bg-neutral-800">
      <div class="">asd</div>
      <button @click="handleChangeValue(false)">X</button>
    </div>
  </Teleport>
</template>

<style scoped lang="scss"></style>
