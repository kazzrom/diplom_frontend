<script setup>
import Dropdown from "primevue/dropdown";
</script>

<template>
  <div class="wrapper">
    <div class="active_item">
      <label for="Староста">Староста</label>
      <Dropdown :options="fullnames" :optionLabel="fullname" id="Староста" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col p-10;
}

.active_item {
  @apply flex flex-row items-center gap-5;
}

.active_item label {
  @apply font-bold;
}
</style>
