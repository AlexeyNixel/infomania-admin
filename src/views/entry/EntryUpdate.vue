<script setup lang="ts">
import { useEntryStore } from '@/stores/entry';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage, dayjs } from 'element-plus';
import TheEditor from '@/components/ui/TheEditor.vue';
import AltEditor from '@/components/ui/AltEditor.vue';
import TheSelect from '@/components/ui/TheSelect.vue';
import TheUpload from '@/components/ui/TheUpload.vue';
import TheUploadDocument from '@/components/ui/TheUploadDocument.vue';

interface RuleForm {
  title: string;
  desc: string;
  slug: string;
  fileId: string;
  content: string;
  isDeleted: boolean;
  pinned: boolean;
  rubrics: string[];
  departmentId: string;
  publishedAt: string;
  preview?: any;
}
const entry = reactive<RuleForm>({
  title: '',
  desc: '',
  slug: '',
  content: '',
  rubrics: [],
  fileId: '',
  departmentId: '',
  publishedAt: new Date().toString(),
  isDeleted: false,
  pinned: false,
});
const rules = reactive<FormRules<RuleForm>>({
  title: [{ required: true, message: 'Обязательное поле' }],
  desc: [{ required: true, message: 'Обязательное поле' }],
  slug: [{ required: true, message: 'Обязательное поле' }],
  content: [{ required: true, message: 'Обязательное поле' }],
  rubrics: [{ required: true, message: 'Обязательное поле' }],
  fileId: [{ required: true, message: 'Обязательное поле' }],
  departmentId: [{ required: true, message: 'Обязательное поле' }],
  publishedAt: [{ required: true, message: 'Обязательное поле' }],
  isDeleted: [{ required: true, message: 'Обязательное поле' }],
  pinned: [{ required: true, message: 'Обязательное поле' }],
});

const ruleFormRef = ref<FormInstance>();
const router = useRouter();
const route = useRoute();
const slug = ref<string | string[]>(route.params.slug);
const entryStore = useEntryStore();
const preview = ref<string | undefined>();
const isAltEditor = ref<boolean>(false);

const submitForm = async (form: FormInstance | undefined) => {
  if (!form) return;

  await form.validate((valid, fields) => {
    if (valid) {
      entry.publishedAt = dayjs(entry.publishedAt).format(
        'YYYY-MM-DDTHH:mm:ss.SSS+00:00'
      );
      entryStore.updateEntry(slug.value as string, entry);
      ElMessage({
        message: 'Новость создана',
        type: 'success',
      });
      console.log(entry);
      router.push({ name: 'entries' });
    } else {
      ElMessage({
        message: 'Некорректный ввод',
        type: 'error',
      });
    }
  });
};

onMounted(async () => {
  const data: RuleForm = await entryStore.getEntry(slug.value as string, {
    include: 'rubrics,preview',
  });
  const { rubrics } = data;
  Object.keys(entry).forEach((key) => {
    //@ts-ignored
    entry[key] = data[key];
  });
  preview.value = data.preview.path || undefined;

  entry.rubrics = entry.rubrics.map(
    //@ts-ignored
    (item: { rubricId: string }) => item.rubricId
  );
});
</script>

<template>
  <el-form
    label-position="top"
    class="entry"
    ref="ruleFormRef"
    :model="entry"
    :rules="rules"
  >
    <div class="">
      <div class="flex">
        <el-form-item class="">
          <the-upload :current-image="preview" v-model="entry.fileId" />
        </el-form-item>
        <div class="w-full">
          <el-form-item label="Название" prop="title">
            <el-input v-model="entry.title" />
          </el-form-item>
          <el-form-item label="Описание" prop="desc">
            <el-input v-model="entry.desc" />
          </el-form-item>
          <el-form-item label="Слаг" prop="slug">
            <el-input v-model="entry.slug" />
          </el-form-item>
        </div>
      </div>
      <el-form-item prop="content">
        <el-button class="my-2" @click="isAltEditor = !isAltEditor">
          Алтернативный редактор
        </el-button>
        <alt-editor v-if="isAltEditor" v-model="entry.content" />
        <the-editor
          v-else
          class="w-full editor"
          v-model="entry.content"
        ></the-editor>
      </el-form-item>
      <div class="flex justify-between items-center">
        <el-form-item label="Отдел" prop="departmentId" class="department">
          <the-select v-model="entry.departmentId" entryOrder="department" />
        </el-form-item>
        <el-form-item prop="rubrics" label="Рубрики" class="rubric">
          <the-select v-model="entry.rubrics" entryOrder="rubric" />
        </el-form-item>
        <el-form-item prop="publishedAt" label="Дата публикации" class="date">
          <el-date-picker v-model="entry.publishedAt" />
        </el-form-item>
        <el-form-item class="document flex my-auto">
          <the-upload-document />
        </el-form-item>
        <el-form-item class="my-auto delete">
          <el-checkbox v-model="entry.isDeleted" label="Удален" border />
        </el-form-item>
        <el-form-item class="my-auto pinned">
          <el-checkbox label="Закрепить" v-model="entry.pinned" border />
        </el-form-item>
      </div>
      <el-form-item>
        <el-button @click="submitForm(ruleFormRef)"> Обновить </el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<style scoped lang="scss">
:deep(.el-form-item.is-error .editor) {
  border: 1px solid #f56c6c;
  border-radius: 10px;
  transition: border 0.5s;
}

.entry {
  margin: 0;
  background-color: var(--el-bg-color-overlay);
  border-radius: 10px;
  height: calc(100%);
  padding: 10px 10px;
}
</style>
