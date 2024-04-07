<script setup>
defineProps(["item", "props"]);
</script>

<template>
  <router-link
    v-if="item.route"
    v-slot="{ href, navigate }"
    :to="item.route"
    custom
  >
    <a :href="href" v-bind="props.action" @click="navigate">
      <span class="ml-2">{{ item.label }}</span>
    </a>
  </router-link>
  <a v-else :href="item.url" :target="item.target" v-bind="props.action">
    <span class="ml-2">{{ item.label }}</span>
  </a>
</template>
