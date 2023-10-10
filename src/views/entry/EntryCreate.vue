<script setup lang='ts'>
import { useEntryStore } from '@/stores/entry';
import { onMounted, reactive, ref } from 'vue';
import TheEditor from '@/components/ui/TheEditor.vue';
import TheSelect from '@/components/ui/TheSelect.vue';
import TheUpload from '@/components/ui/TheUpload.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
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
});


const handleUpdateData = async () => {
  console.log(entry);
  await entryStore.createEntry(entry);
};

</script>

<template>
  <div class='entry' v-if='entry'>
    <div class='image'>
      <the-upload :current-image='preview' v-model='entry.fileId'/>
    </div>
    <div class='fields'>
      <div class='title'>
        <span>Название</span>
        <el-input
          v-model='entry.title'
        />
      </div>
      <div class='desc'>
        <span>Описание</span>
        <el-input
          v-model='entry.desc'
        />
      </div>
      <div class='slug'>
        <span>Слаг</span>
        <el-input
          v-model='entry.slug'
        />
      </div>
    </div>
    <div class='editor'>
      <TheEditor v-model='entry.content' />
    </div>
    <div class='department'>
      <the-select v-model='entry.departmentId' entryOrder='department' />
    </div>
    <div class='rubric'>
      <the-select v-model='entry.rubrics' entryOrder='rubric' />
    </div>
    <div class='date'>
      <el-date-picker
        v-model='entry.publishedAt'
      />
    </div>
    <div class='delete'>
      <el-button>Удалить</el-button>
    </div>
    <div class='document'>
      <el-button>Документ</el-button>
    </div>
    <div class='button'>
      <el-button @click='handleUpdateData'>Обновить</el-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>
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
    "image fields fields fields fields"
    "editor editor editor editor editor"
    "department rubric date delete document"
    "button . . . .";
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
    "title title title"
     "desc desc desc"
    "slug slug slug";

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