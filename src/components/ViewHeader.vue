<template>
  <header>
    <h2 class="ml-10"><slot></slot></h2>
    <slot name="add_content"></slot>
  </header>
</template>

<style scoped>
header {
  @apply flex flex-row items-center gap-10
  bg-white py-8
  border border-solid;
}
</style>
