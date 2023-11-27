<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useMenuStore } from '@/stores/menu';
import draggable from 'vuedraggable';
import type { AnyTypeAnnotation } from '@babel/types';

const menuStore = useMenuStore();
const content = ref<any>();
const route = useRoute();
const router = useRouter();
const drag = ref(false);
const menuItems = ref<Array<AnyTypeAnnotation>>([]);

const menu = reactive<any>({
  title: '',
  isDeleted: '',
  menuType: '',
  menuItems: [],
});

const handleUpdate = async () => {
  // await documentStore.updateDocument(route.params.slug as string, document);
  // ElMessage({
  //   message: 'Документ обновлен',
  //   type: 'success',
  // });

  for (let item of menu.menuItems) {
    menuStore.updateMenuItem(item.id, {
      position: item.position,
      slug: item.slug,
    });
  }

  // await router.push({ name: 'documents' });
};

const handleDragEnd = () => {
  for (let i = 0; i < menuItems.value.length; i++) {
    menu.menuItems[i].position = i;
  }
};

onMounted(async () => {
  const { data } = await menuStore.getMenu(route.params.slug as string, {
    include: 'menuItems',
  });
  data.menuItems?.forEach((item: any) => {
    menuItems.value.push(item);
  });
  content.value = data;

  Object.keys(menu).forEach((key) => {
    menu[key] = content.value[key];
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
        <div class="menu-update__item">
          <span>Тип</span>
          <el-input v-model="menu.menuType" />
        </div>

        <draggable
          v-model="menu.menuItems"
          group="people"
          @end="handleDragEnd()"
          item-key="id"
        >
          <template #item="{ element }">
            <div class="drag__item">
              <div>
                <span style="margin-right: 20px">{{ element.position }}</span>
                <span>{{ element.title }}</span>
              </div>
            </div>
          </template>
        </draggable>
        <div class="menu-update__btn">
          <el-button @click="handleUpdate">Обновить</el-button>
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
