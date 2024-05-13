<script setup>
import Navbar from "@/components/Navbar/Navbar.vue";
import ConfirmDialog from "primevue/confirmdialog";
import Toast from "primevue/toast";
import { useAuthProvider } from "@/auth/stores/AuthContext.js";
import { useHomeStore } from "@/auth/stores/Home.js";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

// onMounted(() => handleFetchProtected());

const store = useAuthProvider();
const { handleLogOut } = store;
const { isUserLogged } = storeToRefs(store);

const { data } = storeToRefs(useHomeStore());
</script>

<template>
  <div class="app flex flex-col h-screen">
    <ConfirmDialog></ConfirmDialog>
    <Toast></Toast>
    <header class="px-5 bg-white flex flex-row justify-between items-center">
      <div class="logo flex flex-row">
        <Avatar class="bg-transparent mr-3" icon="pi pi-book" />
        <h4>Журнал педагогических наблюдений куратора/мастера группы</h4>
      </div>
      <nav class="flex items-center py-4 gap-3">
        <!-- <RouterLink v-show="isUserLogged" to="/home">Home</RouterLink> -->
        <p v-show="isUserLogged">{{ data }}</p>
        <Button
          v-show="isUserLogged"
          text
          severity="secondary"
          label="Выйти"
          @click="handleLogOut"
        />
        <RouterLink v-show="!isUserLogged" to="/sign-up"
          >Зарегистироваться</RouterLink
        >
        <RouterLink v-show="!isUserLogged" to="/sign-in">Войти</RouterLink>
      </nav>
    </header>
    <main class="flex flex-row grow">
      <!-- FIXME: исправить появление сайдбара -->
      <Navbar v-show="isUserLogged" class="w-80" />
      <router-view class="grow"></router-view>
    </main>
  </div>
</template>
