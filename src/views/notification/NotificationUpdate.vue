<script lang="ts" setup>
import { useNotificationStore } from '@/stores/notification';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TheSelect from '@/components/ui/TheSelect.vue';

const route = useRoute();
const slug = ref<string>(route.params.id as string);
const notificationStore = useNotificationStore();

const notification: any = reactive({
  desc: '',
  startTime: '',
  endTime: '',
  type: '',
  entryId: '',
});

onMounted(async () => {
  const data = await notificationStore.getNotificationById(slug.value);

  Object.keys(notification).forEach((item) => {
    notification[item] = data[item];
  });
});

const handleUpdate = async () => {
  await notificationStore.updateNotification(slug.value, notification);
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
      <div class="my-2">
        <div>Новость</div>
        <the-select
          entry-order="entry"
          v-model="notification.entryId"
        ></the-select>
      </div>
      <el-button @click="handleUpdate()">Обновить</el-button>
    </div>
  </div>
</template>
