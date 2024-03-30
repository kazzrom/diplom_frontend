<script setup>
defineProps(['scr_item']);
</script>

<template>
  <router-link
    v-if="scr_item.route"
    v-slot="{ href, navigate }"
    :to="scr_item.route"
    custom
  >
    <a
      class="flex items-center cursor-pointer text-slate-800 px-3 py-2"
      :href="href"
      @click="navigate"
    >
      <span :class="scr_item.icon" />
      <span class="ml-2 text-slate-800">{{ scr_item.label }}</span>
    </a>
  </router-link>
  <a
    v-else
    class="flex items-center cursor-pointer text-slate-800 px-3 py-2"
    :href="scr_item.url"
    :target="scr_item.target"
  >
    <span :class="scr_item.icon" />
    <span class="ml-2">{{ scr_item.label }}</span>
    <span
      v-if="scr_item.items"
      class="pi pi-angle-down text-slate-800 ml-auto"
    />
  </a>
</template>
