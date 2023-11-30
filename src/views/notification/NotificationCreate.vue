<script lang="ts" setup>
import { useNotificationStore } from '@/stores/notification';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const notificationStore = useNotificationStore();

const notification: any = reactive({
  desc: '',
  startTime: '',
  endTime: '',
  type: '',
});

const handleUpdate = async () => {
  await notificationStore.createNotification(notification);
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full">
    <div class="bg-white dark:bg-neutral-900 p-4 rounded-[10px]">
      <div class="my-2">
        <div>Контент</div>
        <el-input v-model="notification.desc"></el-input>
      </div>
      <div class="my-2">
        <div>Дата начала</div>
        <el-date-picker
          v-model="notification.startTime"
          type="datetime"
          placeholder="Select date and time"
        />
      </div>
      <div class="my-2">
        <div>Дата конца</div>
        <el-date-picker
          v-model="notification.endTime"
          type="datetime"
          placeholder="Select date and time"
        />
      </div>
      <div class="my-2">
        <div>Тип уведомления</div>
        <el-select v-model="notification.type">
          <el-option label="Обычное" value="primary" />
          <el-option label="Предупреждение" value="warning" />
          <el-option label="Ошибка" value="error" />
        </el-select>
      </div>
      <el-button @click="handleUpdate()">Создать</el-button>
    </div>
  </div>
</template>
