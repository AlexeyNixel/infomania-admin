<template>
  <div class="flex justify-center items-center h-full">
    <div
      class="w-[800px] min-h-[1000px] bg-white dark:bg-neutral-900 rounded-xl p-4"
    >
      <div ref="target">
        <component
          v-for="item in form"
          :is="item.name"
          v-model="item.value"
        ></component>
        <el-button link class="mx-2 py-4" v-if="isPlaceholder">
          Добавить новый интсрумент
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Header from '@/components/form/Header.vue';
import { onClickOutside } from '@vueuse/core';

const isPlaceholder = ref(false);

const target = ref(null);
const form = reactive([
  {
    name: Header,
    value: '',
  },
]);

onClickOutside(target, (event) => {
  isPlaceholder.value = true;
});

const selectField = () => {
  console.log(123);
};
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

:deep(.el-input__wrapper) {
  border: none;
  box-shadow: none;
}
</style>
