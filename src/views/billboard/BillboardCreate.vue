<script setup lang="ts">
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

const handleCreateDate = async () => {
  ElMessage({
    message: 'Афиша создана',
    type: 'success',
  });
  await router.push({ name: 'billboard' });
  return await billboardStore.createBillboard(billboard);
};
</script>

<template>
  <div class="billboard">
    <div class="title">
      <div>Название</div>
      <el-input v-model="billboard.title" />
    </div>
    <div class="phone">
      <div>Телефон</div>
      <el-input v-model="billboard.phone" />
    </div>
    <div class="slug">
      <div>Слаг</div>
      <el-input v-model="billboard.slug" />
    </div>
    <div class="editor">
      <div>Контент</div>
      <TheEditor v-model="billboard.desc" />
    </div>
    <div class="timepicker">
      <div>Время</div>
      <el-time-picker
        format="HH:mm:ss"
        value-format="YYYY-MM-DDTHH:mm:ss.000+00:00"
        v-model="billboard.eventTime"
        placeholder="Время"
      />
    </div>
    <div class="datepicker">
      <div>Дата</div>
      <el-date-picker
        value-format="YYYY-MM-DDTHH:mm:ss.000+00:00"
        v-model="billboard.eventDate"
        type="datetime"
        placeholder="Дата"
      />
    </div>
    <div class="place">
      <div>Помещение</div>
      <el-select v-model="billboard.eventPlace" placeholder="Выбрать">
        <el-option
          v-for="(item, index) in places"
          :key="index"
          :label="item"
          :value="index"
        />
      </el-select>
    </div>
    <el-button @click="handleCreateDate" style="width: max-content">
      Создать
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.billboard {
  margin: 0;
  background-color: var(--el-bg-color-overlay);
  border-radius: 10px;
  height: calc(100%);
  padding: 10px 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 5px 5px;
  grid-auto-flow: row dense;
  grid-template-areas:
    'title phone slug'
    'editor editor editor'
    'timepicker datepicker place';
}

.title {
  grid-area: title;
}

.phone {
  grid-area: phone;
}

.slug {
  grid-area: slug;
}

.editor {
  grid-area: editor;
}

.timepicker {
  grid-area: timepicker;
}

.datepicker {
  grid-area: datepicker;
}

.place {
  grid-area: place;
}
</style>
