<script setup>
defineProps(["meeting"]);
</script>

<template>
  <div class="wrapper_item">
    <h4>{{ meeting.title }}</h4>
    <p>Тема: {{ meeting.theme }}</p>
    <p>
      <span class="mr-3">Группа {{ meeting.group }}</span>
      <span>Дата: {{ meeting.date }}</span>
    </p>
  </div>
</template>

<style scoped>
.wrapper_item {
  @apply pl-10 py-7 border border-solid 
  hover:bg-slate-100 hover:cursor-pointer;
}
</style>
