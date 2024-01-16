<template>
  <div>
    <TheTitle v-model="text" />
  </div>
</template>

<script lang="ts" setup>
import TheTitle from '@/components/form/TheTitle.vue';
import { ref } from 'vue';
const text = ref<string>();
</script>

<style></style>
