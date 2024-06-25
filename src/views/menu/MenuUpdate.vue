<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useMenuStore } from '@/stores/menu';
import draggable from 'vuedraggable';

const menuStore = useMenuStore();
const route = useRoute();
const router = useRouter();
const menuItems = ref<Array<any>>([]);

const menu = reactive<any>({
  title: '',
  isDeleted: '',
  menuType: '',
});

const handleUpdate = async () => {
  await menuStore.updateMenu(route.params.slug as string, menu);

  for (let item of menuItems.value) {
    menuStore.updateMenuItem(item.id, {
      position: item.position,
      slug: item.slug,
    });
  }
  ElMessage({
    message: 'Меню обновлен',
    type: 'success',
  });
  await router.push({ name: 'menu' });
};

const handleDragEnd = () => {
  for (let i = 0; i < menuItems.value.length; i++) {
    menuItems.value[i].position = i;
  }
};

onMounted(async () => {
  const { data } = await menuStore.getMenu(route.params.slug as string, {
    include: 'menuItems',
  });

  data.menuItems?.forEach((item: any) => {
    menuItems.value.push(item);
  });

  Object.keys(menu).forEach((key) => {
    menu[key] = data[key];
  });
});
</script>

<template>
  <div class="container">
    <div class="menu-update">
      <div class="menu-update__text">
        <div class="menu-update__item">
          <span>Название</span>
          <el-input v-model="menu.title" />
        </div>
        <draggable
          v-model="menuItems"
          group="people"
          @end="handleDragEnd()"
          item-key="id"
        >
          <template #item="{ element }">
            <div
              class="flex justify-between text-sm rounded-[10px] py-1 px-2 my-2 ring-1 ring-gray-200 dark:ring-neutral-700 bg-white dark:bg-transparent text-gray-500 dark:text-white cursor-pointer"
            >
              <div class="mr-2">{{ element.position }}</div>
              <div>{{ element.title }}</div>
              <router-link
                :to="{ name: 'menuItemUpdate', params: { id: element.id } }"
              >
                <svg
                  class="text-black dark:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z"
                  />
                </svg>
              </router-link>
            </div>
          </template>
        </draggable>
        <div>
          <el-button class="rounded-[10px]" @click="handleUpdate()"
            >Обновить</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.drag {
  &__item {
    background: #1d1e1f;
    padding: 10px;
    border-radius: 10px;
    margin: 10px 0;
    cursor: pointer;
  }
}

.menu-update {
  display: flex;

  &__item {
    margin: 20px 0;
  }
}
</style>
