<script setup lang="ts">
import { useEntryStore } from '@/stores/entry';
import { onBeforeMount, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import TheEditor from '@/components/ui/TheEditor.vue';

import TheSelect from '@/components/ui/TheSelect.vue';
import TheUpload from '@/components/ui/TheUpload.vue';
import TheUploadDocument from '@/components/ui/TheUploadDocument.vue';

const router = useRouter();
const route = useRoute();
const slug = ref<string>(route.params.slug as string);
const entryStore = useEntryStore();
const preview = ref<string | undefined>();
const isAltEditor = ref(!!route.query.editor);

const newEntry = reactive<any>({
  title: '',
  desc: '',
  slug: '',
  content: '',
  fileId: '',
  rubrics: [],
  departmentId: '',
  publishedAt: '',
  isDeleted: false,
  pinned: false,
});

const updateEntry = async () => {
  await entryStore.updateEntry(slug.value, newEntry);
  router.push('/entries');
  return ElMessage({
    message: 'Новость обновлена',
    type: 'success',
  });
};

onBeforeMount(async () => {
  const data = await entryStore.getEntry(slug.value, {
    include: 'rubrics,preview',
  });

  Object.keys(newEntry).forEach((key: any) => {
    newEntry[key] = data[key];
  });
  newEntry.rubrics = newEntry.rubrics.map(
    (item: { rubricId: string }) => item.rubricId
  );
  preview.value = data?.preview.path;
});
</script>

<template>
  <div class="entry-update">
    <div class="header">
      <div class="preview">
        <the-upload
          class="preview__item"
          model-value=""
          :current-image="preview"
        />
        <the-select
          class="preview__item"
          placeholder="Выбрать отдел"
          v-model="newEntry.departmentId"
          entryOrder="department"
        />
        <the-select
          class="preview__item"
          v-model="newEntry.rubrics"
          placeholder="Выбрать рубрику"
          entryOrder="rubric"
        />
        <el-date-picker
          class="preview__item"
          placeholder="Дата публикации"
          v-model="newEntry.publishedAt"
        />
        <el-checkbox
          v-model="newEntry.isDeleted"
          class="preview__item"
          label="Скрыта"
          border
        />
        <el-checkbox
          v-model="newEntry.pinned"
          class="preview__item"
          label="Закреплена"
          border
        />
        <the-upload-document class="preview__item" />
        <el-button class="preview__item" type="warning" @click="updateEntry">
          Обновить
        </el-button>
      </div>
      <div class="text-group">
        <el-input
          v-model="newEntry.title"
          class="text-group__item"
          placeholder="Название"
        />
        <el-input
          v-model="newEntry.desc"
          class="text-group__item"
          placeholder="Описание"
        />
        <el-input
          v-model="newEntry.slug"
          class="text-group__item"
          placeholder="Слаг"
        />
        <div class="editor">
          <el-button @click="isAltEditor = !isAltEditor" class="editor-alt">
            Альтернативный эдитор
          </el-button>
          <the-editor
            v-if="!isAltEditor"
            v-model="newEntry.content"
            class="h-[60vh]"
          />
          <el-input
            v-else
            class="h-[60vh]"
            type="textarea"
            v-model="newEntry.content"
          />
        </div>
        <div class="flex"></div>
      </div>
    </div>
    <div class="body"></div>
    <div class="footer"></div>
  </div>
</template>

<style scoped lang="scss">
.entry-update {
  @apply bg-white dark:bg-neutral-900 p-2 rounded-xl h-full;
  .header {
    @apply flex;

    .preview {
      @apply w-2/12 mr-2;

      &__item {
        @apply w-full m-0 mb-2;
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
  @apply rounded-xl w-full text-lg;
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
