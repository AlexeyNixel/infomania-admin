<script setup lang='ts'>
import { ref } from 'vue';
import { auth } from '@/api/admin';
import { useAdminStore } from '@/stores/admin';
import { useRouter } from 'vue-router';

const router = useRouter()
const status = ref<any>()
const adminStore = useAdminStore()

const user = ref({
  username: '',
  password: '',
});

const handleAuth = async (account: object) => {
  status.value = await auth(account)
  if (status.value.data) {
    localStorage.setItem('token', status.value.data.access_token)
    adminStore.token = status.value.data.access_token

    await router.push({name:'index'})
  }
}
</script>

<template>
  <div class='wrapper'>
    <el-form class='login-form'>
      <div class='login-form__title'>Авторизация</div>
      <div class='login-form__field'>
        <span>Логин</span>
        <el-input v-model='user.username' />
      </div>
      <div class='login-form__field'>
        <span>Пароль</span>
        <el-input type='password' show-password v-model='user.password' />
      </div>
      <el-button @click='handleAuth(user)'>Войти</el-button>
    </el-form>
  </div>
</template>

<style scoped lang='scss'>
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
    margin: 30px 0;
  }
}
</style>