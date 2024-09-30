<script setup lang="ts">
import { useEntryStore } from '@/stores/entry';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import TheEditor from '@/components/ui/TheEditor.vue';
import TheSelect from '@/components/ui/TheSelect.vue';
import TheUpload from '@/components/ui/TheUpload.vue';
import TheUploadDocument from '@/components/ui/TheUploadDocument.vue';
import { Quill } from '@vueup/vue-quill';

const router = useRouter();
const route = useRoute();
const isAltEditor = ref(!!route.query.editor);
const entryStore = useEntryStore();
const aside = ref<string | undefined>();

const newEntry = reactive<any>({
  title: '',
  desc: '',
  slug: '',
  content: '',
  fileId: '',
  rubrics: [],
  departmentId: '',
  publishedAt: new Date(),
  isDeleted: false,
  pinned: false,
});

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];

const quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions,
  },
  theme: 'snow',
});

const updateEntry = async () => {
  await entryStore.createEntry(newEntry);
  await router.push('/entries');
  return ElMessage({
    message: 'Новость создана',
    type: 'success',
  });
};
</script>

<template>
  <div class="entry-update">
    <div class="header">
      <div class="aside">
        <the-upload
          class="aside__item_img"
          v-model="newEntry.fileId"
          :current-image="aside"
        />
        <the-select
          class="aside__item"
          placeholder="Выбрать отдел"
          v-model="newEntry.departmentId"
          entryOrder="department"
        />
        <the-select
          class="aside__item"
          v-model="newEntry.rubrics"
          placeholder="Выбрать рубрику"
          entryOrder="rubric"
        />
        <el-date-picker
          class="aside__item"
          placeholder="Дата публикации"
          v-model="newEntry.publishedAt"
        />
        <el-checkbox
          v-model="newEntry.isDeleted"
          class="aside__item"
          label="Скрыта"
          border
        />
        <el-checkbox
          v-model="newEntry.pinned"
          class="aside__item"
          label="Закреплена"
          border
        />
        <the-upload-document class="aside__item" />
        <el-button class="aside__item" type="warning" @click="updateEntry">
          Создать
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
          <quill-editor toolbar="#my-toolbar" v-else theme="snow">
            <template #toolbar>
              <div id="my-toolbar">
                <!-- Add buttons as you would before -->
                <button class="ql-bold"></button>
                <button class="ql-italic"></button>

                <!-- But you can also add your own -->
                <button id="custom-button"></button>
              </div>
            </template>
          </quill-editor>
          <!--          <el-input-->
          <!--           -->
          <!--            class="h-[60vh]"-->
          <!--            type="textarea"-->
          <!--            v-model="newEntry.content"-->
          <!--          />-->
        </div>
      </div>
    </div>

    <div class="footer"></div>
  </div>
</template>

<style scoped lang="scss">
.entry-update {
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
