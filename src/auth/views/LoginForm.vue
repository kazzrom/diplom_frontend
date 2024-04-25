<script setup>
import { ref } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { useAuthProvider } from "../stores/AuthContext.js";

const user = ref({ login: null, password: null });
const AuthProvider = useAuthProvider();

function signIn() {
  AuthProvider.handleSignIn(user.value);
}
</script>

<template>
  <div class="flex justify-center items-center h-[70vh]">
    <form @submit.prevent="signIn" method="post">
      <div class="form_wrapper">
        <h3>Войти в аккаунт</h3>
        <div class="flex flex-col gap-2">
          <label for="login">Логин</label>
          <InputText id="login" v-model="user.login" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="password">Пароль</label>
          <InputText id="password" v-model="user.password" />
        </div>
        <Button label="Войти" type="submit" />
      </div>
    </form>
  </div>
</template>

<style>
.form_wrapper {
  @apply flex flex-col items-center
    border border-solid border-slate-200 rounded-xl 
    p-10 gap-6;
}
</style>
