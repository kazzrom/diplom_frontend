<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { ref, computed } from "vue";
import { useAuthProvider } from "../stores/AuthContext.js";
import UserModel from "../models/newUser.js";
import useVuelidate from "@vuelidate/core";
import signUpRules from "@/validators/signUpRules.js";
import Panel from "primevue/panel";

const user = ref(UserModel.fields);

const v$ = useVuelidate(
  computed(() => signUpRules),
  user
);

const AuthProvider = useAuthProvider();

function signUp() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }
  AuthProvider.handleSignUp(user.value);
}
</script>

<template>
  <div class="wrapper">
    <form @submit.prevent="signUp" method="post">
      <div class="form_wrapper">
        <h3>Регистрация аккаунта</h3>
        <div class="form_data">
          <Panel header="Аккаунт">
            <div class="form_login">
              <div class="form_item">
                <label for="login">Логин</label>
                <InputText
                  id="login"
                  v-model="user.login"
                  :invalid="v$.login.$dirty && v$.login.$invalid"
                  aria-describedby="login-help"
                />
                <small
                  v-show="v$.login.$dirty && v$.login.$invalid"
                  id="login-help"
                  >Придумайте свой логин</small
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
            </div>
          </Panel>
          <Panel header="Куратор">
            <div class="form_curator">
              <div class="form_item">
                <label for="surname">Фамилия</label>
                <InputText
                  id="surname"
                  v-model="user.Curator.surname"
                  :invalid="
                    v$.Curator.surname.$dirty && v$.Curator.surname.$invalid
                  "
                />
              </div>
              <div class="form_item">
                <label for="name">Имя</label>
                <InputText
                  id="name"
                  v-model="user.Curator.name"
                  :invalid="v$.Curator.name.$dirty && v$.Curator.name.$invalid"
                />
              </div>
              <div class="form_item">
                <label for="patronymic">Отчетство</label>
                <InputText
                  id="patronymic"
                  v-model="user.Curator.patronymic"
                  :invalid="
                    v$.Curator.patronymic.$dirty &&
                    v$.Curator.patronymic.$invalid
                  "
                />
              </div>
            </div>
          </Panel>
          <Panel header="Группа">
            <div class="form_group">
              <div class="form_item">
                <label for="groupNumber">Номер группы</label>
                <InputText
                  id="groupNumber"
                  v-model="user.Group.groupNumber"
                  :invalid="
                    v$.Group.groupNumber.$dirty && v$.Group.groupNumber.$invalid
                  "
                />
              </div>
              <div class="form_item">
                <label for="groupName">Название группы</label>
                <InputText
                  id="groupName"
                  v-model="user.Group.groupName"
                  :invalid="
                    v$.Group.groupName.$dirty && v$.Group.groupName.$invalid
                  "
                />
              </div>
            </div>
          </Panel>
        </div>
        <Button label="Зарегистрироваться" type="submit" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex justify-center items-center;
}

.form_wrapper {
  @apply flex flex-col items-center gap-10
  border border-solid border-slate-200 rounded-xl
  p-10;
}

.form_data {
  @apply flex flex-row gap-5;
}

.form_item {
  @apply flex flex-col gap-2;
}

.form_login {
  @apply flex flex-col gap-5;
}

.form_curator {
  @apply flex flex-col gap-5;
}

.form_group {
  @apply flex flex-col gap-5;
}
</style>
