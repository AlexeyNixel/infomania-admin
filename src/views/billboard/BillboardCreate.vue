<script setup lang='ts'>
import { useBillboardStore } from '@/stores/billboard';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import TheEditor from '@/components/ui/TheEditor.vue';
import { AffichePlaces } from '@/types/models';
import { ElMessage } from 'element-plus';

const router = useRouter();
const billboardStore = useBillboardStore();

const places = AffichePlaces;
const billboard = reactive<any>({
  title: '',
  phone: '',
  slug: '',
  desc: '',
  eventDate: '',
  eventTime: '',
  eventPlace: '',
  isDeleted: false,
});

const handleUpdateDate = async () => {
  ElMessage({
    message: 'Афиша создана',
    type: 'success',
  });
  await router.push({name: "billboard"})
  return await billboardStore.createBillboard(billboard);
};
</script>

<template>
  <div class='billboard'>
    <div class='billboard__string'>
      <div class='billboard__item'>
        <div>Название</div>
        <el-input v-model='billboard.title' />
      </div>
      <div class='billboard__item'>
        <div>Телефон</div>
        <el-input v-model='billboard.phone' />
      </div>
      <div class='billboard__item'>
        <div>Слаг</div>
        <el-input v-model='billboard.slug' />
      </div>
    </div>
    <div class='billboard__editor'>
      <TheEditor v-model='billboard.desc' />
    </div>
    <div class='billboard__select'>
      <div class='billboard__select-item'>
        <div>Время</div>
        <el-time-picker
          format='HH:mm:ss'
          value-format='YYYY-MM-DDTHH:mm:ss.000+00:00'
          v-model='billboard.eventTime'
          placeholder='Время'
        />
      </div>
      <div class='billboard__select-item'>
        <div>Дата</div>
        <el-date-picker
          class='billboard__select-item'
          value-format='YYYY-MM-DDTHH:mm:ss.000+00:00'
          v-model='billboard.eventDate'
          type='datetime'
          placeholder='Дата'
        />
      </div>
      <div class='billboard__select-item'>
        <div>Место</div>
        <el-select class='billboard__select-item' v-model='billboard.eventPlace' placeholder='Select'>
          <el-option
            v-for='(item, index) in places'
            :key='index'
            :label='item'
            :value='index'
          />
        </el-select>
      </div>
    </div>
    <el-button @click='handleUpdateDate'>Создать</el-button>
  </div>
</template>

<style scoped lang='scss'>
.billboard {
  margin: 0;
  background-color: var(--el-bg-color-overlay);
  border-radius: 10px;
  height: calc(100% - 20px);
  padding: 10px 10px;

  &__string {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .el-input {
      width: 20vw;
    }
  }

  &__editor {
    margin: 1vh 0;
  }
  &__select {
    display: flex;
    justify-content: space-between;
  }
  &__select-item {
    //margin: 0 20px;
  }
}
</style>
