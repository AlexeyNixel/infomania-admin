<script lang="ts" setup>
import { useNotificationStore } from '@/stores/notification';
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';

const notificationStore = useNotificationStore();
const notification = ref();

onMounted(async () => {
  notification.value = await notificationStore.getNotifications();
});
</script>

<template>
  <div class="list">
    <div class="list__header">
      <div class="list__field-long">Контент</div>
      <div class="list__field">Начало</div>
      <div class="list__field">Конец</div>
      <div class="list__field">Тип</div>
    </div>
    <el-scrollbar>
      <div class="list-item" v-for="item in notification" :key="item.id">
        <router-link
          :to="{ name: 'notificationUpdate', params: { id: item.id } }"
          class="list-item__field-long"
          >{{ item.desc }}</router-link
        >
        <div class="list-item__field">
          {{ dayjs(item.startTime).format('DD.MM.YYYY') }}
        </div>
        <div class="list-item__field">
          {{ dayjs(item.endTime).format('DD.MM.YYYY') }}
        </div>
        <div :class="`list-item__field bg-green-600 rounded-[10px] font-bold`">
          {{ item.type }}
        </div>
      </div>
    </el-scrollbar>
    <!-- <el-pagination
      @current-change="fetchData"
      class="pagination"
      background
      layout="prev, pager, next"
      :page-size="30"
      :page-count="totalPage"
    /> -->
  </div>
</template>

<style scoped lang="scss">
.list {
  background-color: var(--el-bg-color-overlay);
  border-radius: 10px;
  height: 100%;

  &__header {
    display: flex;
    padding: 15px;
  }

  &__field {
    width: 16.66%;
    border-right: 1px solid white;
    text-align: center;

    &-long {
      width: 78%;
      text-align: center;
      border-right: 1px solid white;
    }
  }
}

.list-item {
  display: flex;
  padding: 1vh 15px;
  margin: 1vh 0;

  &__field {
    width: 16.66%;
    text-align: center;

    &-long {
      width: 78%;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}

:deep(.el-scrollbar) {
  height: calc(90% - 5px);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-button) {
  border-radius: 10px;
}
</style>
