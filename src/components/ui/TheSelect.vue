<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { useAdminStore } from '@/stores/admin';

type PropsType = { entryOrder?: 'department' | 'rubric' | 'menu-item' | 'entry' }

const props = defineProps<PropsType>();
const adminStore = useAdminStore();
const content = ref<any>();

onMounted(async () => {
  if (props?.entryOrder === 'rubric') {
    const { data } = await adminStore.getAllModel(`api/${props.entryOrder}/`, {
      pageSize: 50,
      isDeleted: true,
    });
    content.value = data;
  } else if (props?.entryOrder === 'menu-item') {
    const { data } = await adminStore.getAllModel(`api/${props.entryOrder}/`, {
      pageSize: 100,
    });
    content.value = data;
  } else if (props?.entryOrder === 'entry') {
    const { data } = await adminStore.getAllModel(`api/${props.entryOrder}/`, {
      pageSize: 50,
      orderBy: '-createdAt',
    });
    content.value = data;
  } else {
    const { data } = await adminStore.getAllModel(`api/${props.entryOrder}/`, {});
    content.value = data;
  }
});
</script>

<template>
  <el-select v-if='props?.entryOrder === "rubric"' multiple>
    <el-option
      v-for='item in content'
      :key='item.id'
      :label='item.title'
      :value='item.id'
    />
  </el-select>
  <el-select v-else>
    <el-option
      v-for='item in content'
      :key='item.id'
      :label='item.title'
      :value='item.id'
    />
  </el-select>
</template>

<style scoped lang='scss'>

</style>