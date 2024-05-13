<script setup>
import { ref, computed } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { useAuthProvider } from "../stores/AuthContext.js";
import useVuelidate from "@vuelidate/core";
import signInRules from "@/validators/signInRules.js";

const user = ref({ login: null, password: null });
const AuthProvider = useAuthProvider();

const v$ = useVuelidate(
  computed(() => signInRules),
  user
);

function signIn() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }
  AuthProvider.handleSignIn(user.value);
}
</script>

<template>
  <div class="wrapper">
    <form @submit.prevent="signIn" method="post">
      <div class="form_wrapper">
        <h3>Войти в аккаунт</h3>
        <div class="form_item">
          <label for="login">Логин</label>
          <InputText
            id="login"
            v-model="user.login"
            :invalid="v$.login.$dirty && v$.password.$invalid"
            aria-describedby="login-help"
          />
          <small v-show="v$.login.$dirty && v$.login.$invalid" id="login-help"
            >Введите логин</small
          >
        </div>
        <div class="form_item">
          <label for="password">Пароль</label>
          <Password
            id="password"
            v-model="user.password"
            :feedback="false"
            :invalid="v$.password.$dirty && v$.password.$invalid"
            aria-describedby="password-help"
          />
          <small
            v-show="v$.password.$dirty && v$.password.$invalid"
            id="password-help"
            >Пароль слишком короткий</small
          >
        </div>
        <Button label="Войти" type="submit" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex justify-center items-center;
}

.form_wrapper {
  @apply flex flex-col items-center
    border border-solid border-slate-200 rounded-xl 
    p-10 gap-6;
}

.form_item {
  @apply flex flex-col gap-2;
}
</style>
