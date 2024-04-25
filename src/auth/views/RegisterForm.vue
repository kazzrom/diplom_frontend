<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Card from "primevue/card";
import { ref } from "vue";
import { useAuthProvider } from "../stores/AuthContext.js";

const user = ref({ login: null, password: null });
const AuthProvider = useAuthProvider();

function signUp() {
  AuthProvider.handleSignUp(user.value);
}
</script>

<template>
  <div class="flex justify-center items-center h-[70vh]">
    <form @submit.prevent="signUp" method="post">
      <div class="form_wrapper">
        <h3>Создать аккаунт</h3>
        <div class="flex flex-col gap-2">
          <label for="login">Логин</label>
          <InputText id="login" v-model="user.login" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="password">Пароль</label>
          <InputText id="password" v-model="user.password" />
        </div>
        <Button label="Зарегистрироваться" type="submit" />
      </div>
    </form>
  </div>
</template>
