<script setup lang='ts'>
import TheSelect from '@/components/ui/TheSelect.vue';
import { reactive, ref } from 'vue';
import { useMenuStore } from '@/stores/menu';

const menuStore = useMenuStore()

const menuItem = reactive({
  title: '',
  slug: '',
  menuId: '',
  menuItemType: 'DOCUMENT',
  link: '',
  isDeleted: false,
});

const handleCreateMenu = async () => {
  return await menuStore.createMenuItem(menuItem)
}
</script>

<template>
  <div class='create-menu'>
    <div class='create-menu__item'>
      <div>Название</div>
      <el-input class='create-menu__field-long' v-model='menuItem.title'></el-input>
    </div>
    <div class='create-menu__item'>
      <div>Слаг</div>
      <el-input class='create-menu__field-long' v-model='menuItem.slug'></el-input>
    </div>
    <div class='create-menu__group'>
      <div class='create-menu__item'>
        <div>Тип контента</div>
        <el-select class='create-menu__field' v-model='menuItem.menuItemType'>
          <el-option value='DOCUMENT' label='Документ' />
          <el-option value='LINK' label='Ссылка' />
        </el-select>
      </div>
      <div class='create-menu__item'>
        <div>Меню</div>
        <the-select class='create-menu__field' entry-order='menu' v-model='menuItem.menuId' />
      </div>
    </div>
    <div class='create-menu__item' v-if='menuItem.menuItemType === "LINK"'>
      <div>Ссылка</div>
      <el-input class='create-menu__field-long' v-model='menuItem.link'></el-input>
    </div>
    <div class='create-menu__group-short'>
      <el-checkbox v-model='menuItem.isDeleted' label='Удалить' size='large' />
      <el-button class='create-menu__btn' @click='handleCreateMenu'>Создать</el-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.create-menu {
  height: 100%;
  display: flex;
  width: max-content;
  flex-direction: column;
  margin: auto;
  justify-content: center;

  &__group {
    display: flex;
    justify-content: space-between;

    &-short {
      width: 240px;
      justify-content: space-between;
      display: flex;
      align-items: center;
      align-self: end;
    }
  }

  &__item {
    margin: 10px 0;
  }

  &__field {
    width: 240px;

    &-long {
      width: 500px;
    }
  }

  &__btn {
    margin: 10px 0;
    border-radius: 10px;
    align-self: end;
  }
}
</style>