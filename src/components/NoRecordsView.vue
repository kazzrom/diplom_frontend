<script setup>
defineProps({
  message: {
    default: "Пока нет записей",
    type: String,
  },
});
</script>

<template>
  <div class="wrapper">
    <h3>{{ message }}</h3>
    <slot></slot>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col justify-center items-center grow;
}
</style>
