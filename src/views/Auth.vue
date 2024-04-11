<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { auth } from '@/api/admin';
import { useAdminStore } from '@/stores/admin';
import { useRouter } from 'vue-router';
import { axiosApi } from '@/api/axios';

const router = useRouter();
const status = ref<any>();
const adminStore = useAdminStore();
const isErrorLogin = ref<boolean>(false);

const user = ref({
  username: '',
  password: '',
});

const handleAuth = async () => {
  status.value = await auth(user.value);

  if (status.value.data) {
    adminStore.token = status.value.data.access_token;
    adminStore.username = status.value.data.username;
    localStorage.setItem('token', adminStore.token);
    localStorage.setItem('username', adminStore.username);
    axiosApi.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${adminStore.token}`;
    await router.push({ path: localStorage.getItem('nextPage') || '/' });
  } else if (status.value.request.status === 401) {
    isErrorLogin.value = !isErrorLogin.value;
  }
};

onBeforeMount(async () => {});
</script>

<template>
  <div class="wrapper">
    <el-form class="login-form" @keydown.enter="handleAuth()">
      <div class="login-form__title">Авторизация</div>
      <transition>
        <div v-if="isErrorLogin" class="text-sm text-red-600 text-center my-2">
          Неправильный логин или пароль
        </div>
      </transition>
      <div class="login-form__field my-2">
        <span>Логин</span>
        <el-input v-model="user.username" />
      </div>
      <div class="login-form__field my-2">
        <span>Пароль</span>
        <el-input type="password" show-password v-model="user.password" />
      </div>
      <el-button @click="handleAuth()">Войти</el-button>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  width: 300px;
  //height: 500px;
  //background-color: var(--el-bg-color-overlay);
  border-radius: 10px;
  padding: 10px;

  &__title {
    font-size: 1.3rem;
    font-weight: bold;
    text-align: center;
  }

  &__field {
  }
}
</style>
