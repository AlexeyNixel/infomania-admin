<script setup lang="ts">
import { useMenuStore } from '@/stores/menu';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TheSelect from '@/components/ui/TheSelect.vue';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const slug = ref<string>(route.params.id as string);
const menuStore = useMenuStore();

const menuItemType = [
  {
    name: 'Документ',
    value: 'DOCUMENT',
  },
  {
    name: 'Ссылка',
    value: 'LINK',
  },
];

const menuItem: any = reactive({
  title: '',
  link: '',
  slug: '',
  menuItemType: 'DOCUMENT',
  isDeleted: false,
  menuId: '',
});

const handleUpdateMenuItem = async () => {
  menuStore.updateMenuItem(slug.value, menuItem);
  await router.push({ name: 'menu' });
  ElMessage({
    message: 'Предмет меню обновлен',
    type: 'success',
  });
};

onMounted(async () => {
  const { data } = await menuStore.getMenuItem(slug.value);

  Object.keys(menuItem).forEach((key) => {
    menuItem[key] = data[key];
  });
});
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full w-full">
    <div>
      <div class="item">
        <div>Название</div>
        <el-input v-model="menuItem.title" />
      </div>
      <div class="item">
        <div>Слаг</div>
        <el-input v-model="menuItem.slug" />
      </div>
      <div class="flex">
        <div class="flex flex-col">
          <span>Тип документа</span>
          <el-select v-model="menuItem.menuItemType" placeholder="Select">
            <el-option
              v-for="(item, index) in menuItemType"
              :key="index"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="flex flex-col ml-2">
          <div>Меню</div>
          <the-select v-model="menuItem.menuId" entry-order="menu" />
        </div>
      </div>
      <div class="flex justify-end my-3">
        <el-button @click="handleUpdateMenuItem()">Обновить</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  @apply my-2 w-full;
}
</style>
