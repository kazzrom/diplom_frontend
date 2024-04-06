<script setup>
import { useCounterStore } from "@/stores/counter.js";
const { getCounter, increment } = useCounterStore();
const counter = getCounter;
</script>

<template>
  <div class="flex flex-col justify-start">
    <h1 class="text-3xl font-bold m-2">{{ counter }}</h1>
    <Button label="Клик" @click="increment" />
  </div>
</template>
