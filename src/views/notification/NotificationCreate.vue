<script lang="ts" setup>
import { useNotificationStore } from '@/stores/notification';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TheSelect from '@/components/ui/TheSelect.vue';


const router = useRouter();

const notificationStore = useNotificationStore();
const rangeTime = ref<string[]>([]);
const notification: any = reactive({
  desc: '',
  startTime: '',
  endTime: '',
  type: '',
  entryId: '',
});

const handleUpdate = async () => {
  notification.startTime = rangeTime.value[0];
  notification.endTime = rangeTime.value[1];
  await notificationStore.createNotification(notification);
  router.push({ name: 'notification' });
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full">
    <div class="text-2xl font-bold my-2">Уведомление</div>
    <div class="bg-white dark:bg-neutral-900 p-4 rounded-[10px] w-[500px]">
      <div class="my-3">
        <div>Сообщение</div>
        <el-input
          placeholder="Введите сообщение"
          v-model="notification.desc"
        ></el-input>
      </div>
      <div class="my-3">
        <div>Время отображения</div>
        <el-date-picker
          v-model="rangeTime"
          type="datetimerange"
          placeholder="Выберите дату и время"
        />
      </div>
      <div class="my-3">
        <div>Новость</div>
        <the-select
          placeholder="Выберите новость, если требуется"
          entryOrder="entry"
        ></the-select>
      </div>
      <div class="my-3">
        <div>Тип уведомления</div>
        <el-select v-model="notification.type" placeholder="Цвет уведомления">
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
      <el-button @click="handleUpdate()">Создать</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-range-editor.el-input__wrapper) {
  width: 100%;
}

:deep(.el-select) {
  width: 100%;
}
</style>
