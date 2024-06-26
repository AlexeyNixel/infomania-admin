<script setup lang="ts">
import { useBillboardStore } from '@/stores/billboard';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import TheEditor from '@/components/ui/TheEditor.vue';
import { AffichePlaces } from '@/types/models';
import { ElMessage } from 'element-plus';
import TheUploadDocument from '@/components/ui/TheUploadDocument.vue';

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

const createBillboard = async () => {
  console.log(billboard);
  Object.keys(billboard).forEach((item) => {
    if (!billboard[item]) delete billboard[item];
  });
  ElMessage({
    message: 'Афиша создана',
    type: 'success',
  });
  await router.push({ name: 'billboard' });
  return await billboardStore.createBillboard(billboard);
};
</script>

<template>
  <div class="billboard-update">
    <div class="header">
      <div class="aside">
        <el-input
          v-model="billboard.title"
          class="aside__item"
          placeholder="Название"
        />
        <el-input
          v-model="billboard.phone"
          class="aside__item"
          placeholder="Телефон"
        />
        <el-input
          v-model="billboard.slug"
          class="aside__item"
          placeholder="Слаг"
        />
        <el-select
          class="aside__item"
          v-model="billboard.eventPlace"
          placeholder="Место проведения"
        >
          <el-option
            v-for="(item, index) in places"
            :key="index"
            :label="item"
            :value="index"
          />
        </el-select>
        <el-date-picker
          class="aside__item"
          value-format="YYYY-MM-DDTHH:mm:ss.000+00:00"
          placeholder="Дата проведения"
          v-model="billboard.eventDate"
        />
        <el-time-picker
          format="HH:mm:ss"
          value-format="YYYY-MM-DDTHH:mm:ss.000+00:00"
          v-model="billboard.eventTime"
          placeholder="Время проведения"
        />
        <el-checkbox
          v-model="billboard.isDeleted"
          class="aside__item"
          label="Скрыта"
          border
        />
        <the-upload-document class="aside__item" />
        <el-button class="aside__item" type="warning" @click="createBillboard">
          Создать
        </el-button>
      </div>
      <div class="text-group">
        <div class="editor">
          <the-editor v-model="billboard.desc" class="h-[60vh]" />
        </div>
      </div>
    </div>
    <div class="body"></div>
    <div class="footer"></div>
  </div>
</template>

<style scoped lang="scss">
.billboard-update {
  @apply bg-white dark:bg-neutral-900 p-2 rounded-xl h-full;
  .header {
    @apply flex;

    .aside {
      @apply w-2/12 mr-2;

      &__item {
        @apply w-full m-0 mb-2;
        &_img {
          @apply h-[230px] mb-2;
        }
      }
    }

    .text-group {
      @apply w-full;

      &__item {
        @apply mb-2;
      }
      .editor-alt {
        @apply absolute right-6 mt-1 z-20;
        .editor {
          @apply relative;
        }
      }
    }
  }
}

:deep(.el-input__wrapper) {
  @apply rounded-xl w-full;
}

:deep(.el-select__wrapper) {
  @apply rounded-xl w-full;
}

:deep(.el-input) {
  @apply rounded-xl w-full mb-2;
}

:deep(.el-checkbox) {
  @apply rounded-xl;
}
</style>
