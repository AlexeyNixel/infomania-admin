<template>
  <div>
    <ckeditor
      class="p-2 rounded-[10px] ring-1 ring-white text-2xl"
      :editor="editor"
    />
  </div>
</template>

<script lang="ts" setup>
import '@/plugins/ckeditor/baloon/ckeditor.js';
import { ref } from 'vue';

interface Header {
  name: string;
}


const editor = BalloonEditor;
</script>

<style lang="scss" scoped>
.ck.ck-editor__editable.ck-rounded-corners:not(.ck-editor__nested-editable) {
  border-radius: 10px;
  padding: 0 10px !important;
  margin: 0 !important;
}

.ck.ck-editor__editable_inline > :last-child {
  margin: 5px 0;
}
</style>
