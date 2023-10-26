<script setup lang='ts'>
import { useBillboardStore } from '@/stores/billboard';
import type { BillboardType } from '@/types/models';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import TheEditor from '@/components/ui/TheEditor.vue';
import { AffichePlaces } from '@/types/models';

const route = useRoute();

const billboardStore = useBillboardStore();
const slug = ref<string>(route.params.slug as string);
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
  return await billboardStore.updateBillboard(slug.value, billboard);
};

onMounted(async () => {
  const { data } = await billboardStore.getBillboard(slug.value);
  console.log(data);

  Object.keys(billboard).forEach((key) => {
    billboard[key] = data[key];
  });
});
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
      <el-time-picker
        format='HH:mm:ss'
        value-format='YYYY-MM-DDTHH:mm:ss.000+00:00'
        v-model='billboard.eventTime'
        placeholder='Время'
      />
      <el-date-picker
        v-model='billboard.eventDate'
        type='datetime'
        placeholder='Дата'
      />
      <el-select v-model='billboard.eventPlace' placeholder='Select'>
        <el-option
          v-for='(item, index) in places'
          :key='index'
          :label='item'
          :value='index'
        />
      </el-select>
    </div>
    <el-button @click='handleUpdateDate'>Обновить</el-button>
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
}
</style>
