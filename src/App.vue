<script setup lang="ts">
import { useEntryStore } from '@/stores/entry';
import { onBeforeMount } from 'vue';
import { useAdminStore } from '@/stores/admin';
import AsideComponent from '@/components/ui/AsideComponent.vue';

const entryStore = useEntryStore();
const adminStore = useAdminStore();

onBeforeMount(async () => {
  adminStore.token = localStorage.getItem('token') || '';
  adminStore.username = localStorage.getItem('username') || '';
  await entryStore.updateEntry('123', {});
});
</script>

<template>
  <div class="wrapper">
    <aside-component />
    <div class="body">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  @apply flex h-[100vh] p-1;
  .body {
    @apply w-full ml-1;
  }
}
</style>
