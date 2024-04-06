<script setup>
defineProps(['item']);
</script>

<template>
  <router-link
    v-if="item.route"
    v-slot="{ href, navigate }"
    :to="item.route"
    custom
  >
    <a
      class="flex items-center cursor-pointer text-slate-800 px-3 py-2"
      :href="href"
      @click="navigate"
    >
      <span :class="item.icon" />
      <span class="ml-2 text-slate-800">{{ item.label }}</span>
    </a>
  </router-link>
  <a
    v-else
    class="flex items-center cursor-pointer text-slate-800 px-3 py-2"
    :href="item.url"
    :target="item.target"
  >
    <span :class="item.icon" />
    <span class="ml-2">{{ item.label }}</span>
    <span
      v-if="item.items"
      class="pi pi-angle-down text-slate-800 ml-auto"
    />
  </a>
</template>
