<script setup lang="ts">
import { useEntryStore } from '@/stores/entry';
import { onMounted, reactive, ref } from 'vue';
import TheEditor from '@/components/ui/TheEditor.vue';
import TheSelect from '@/components/ui/TheSelect.vue';
import TheUpload from '@/components/ui/TheUpload.vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import TheUploadDocument from '@/components/ui/TheUploadDocument.vue';

const route = useRoute();
const router = useRouter();
const entryStore = useEntryStore();
const content = ref<any>();
const preview = ref();
const entry = reactive<any>({
  title: '',
  desc: '',
  slug: '',
  content: '',
  rubrics: [],
  fileId: '',
  departmentId: '',
  publishedAt: '',
  isDeleted: false,
  pinned: false,
});
const slug = ref<string>(route.params.slug as string);

const handleUpdateData = async () => {
  entry.content = entry.content.replaceAll(/'|«|»/g, '"');
  await entryStore.updateEntry(slug.value, entry);
  ElMessage({
    message: 'Новость обновлена',
    type: 'success',
  });
  await router.push({ name: 'entries' });
};

onMounted(async () => {
  content.value = await entryStore.getEntry(slug.value, {
    include: 'preview,rubrics,department',
  });

  Object.keys(entry).forEach((key) => {
    entry[key] = content.value[key];
  });
  const { rubrics } = content.value || {};
  preview.value = content.value.preview.path || undefined;
  entry.rubrics = rubrics.map((item: { rubricId: string }) => item.rubricId);
});
</script>

<template>
  <div class="entry" v-if="entry">
    <div class="image">
      <the-upload :current-image="preview" v-model="entry.fileId" />
    </div>
    <div class="fields">
      <div class="title">
        <span>Название</span>
        <el-input v-model="entry.title" />
      </div>
      <div class="desc">
        <span>Описание</span>
        <el-input v-model="entry.desc" />
      </div>
      <div class="slug">
        <span>Слаг</span>
        <el-input v-model="entry.slug" />
      </div>
      <div class="disabled">
        <el-checkbox
          v-model="entry.pinned"
          label="Главная новость"
          size="large"
        />
      </div>
    </div>
    <div class="editor">
      <TheEditor v-model="entry.content" />
    </div>
    <div class="department">
      <div>Отдел</div>
      <the-select v-model="entry.departmentId" entryOrder="department" />
    </div>
    <div class="rubric">
      <div>Рубрики</div>
      <the-select v-model="entry.rubrics" entryOrder="rubric" />
    </div>
    <div class="date">
      <div>Дата</div>
      <VueDatePicker
        v-model="entry.publishedAt"
        locale="ru"
        format="dd/MM/yyyy HH:mm"
      />
    </div>
    <div class="document">
      <the-upload-document />
    </div>
    <div class="button">
      <el-button @click="handleUpdateData">Обновить</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-input__wrapper) {
  border-radius: 10px;
}

:deep(.el-button) {
  border-radius: 10px;
}

.entry {
  margin: 0;
  background-color: var(--el-bg-color-overlay);
  border-radius: 10px;
  height: calc(100% - 20px);
  padding: 10px 10px;

  display: grid;
  grid-template-columns: 0.9fr 1.1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 2.6fr 0.2fr 0.2fr;
  gap: 5px 5px;
  grid-auto-flow: row dense;
  grid-template-areas:
    'image fields fields fields fields'
    'editor editor editor editor editor'
    'department rubric date document document'
    'button . . . .';
}

.editor {
  grid-area: editor;
}

.department {
  grid-area: department;
}

.rubric {
  grid-area: rubric;
}

.date {
  grid-area: date;
}

.delete {
  grid-area: delete;
}

.document {
  grid-area: document;
}

.image {
  grid-area: image;
}

.button {
  grid-area: button;
}

.fields {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    'title title title'
    'desc desc desc'
    'slug slug slug';

  grid-area: fields;
}

.title {
  grid-area: title;
}

.slug {
  grid-area: slug;
}

.desc {
  grid-area: desc;
}
</style>
