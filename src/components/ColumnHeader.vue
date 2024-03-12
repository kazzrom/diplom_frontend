<script setup></script>

<template>
  <div class="bg-white flex justify-between items-center h-[100px] px-[35px]">
    <h2 class="text-4xl font-medium">Список группы</h2>
    <Button
      icon="pi pi-user-plus"
      severity="secondary"
      aria-label="Добавить обучающегося"
    />
    <Button
      icon="pi pi-user-minus"
      severity="secondary"
      aria-label="Удалить обучающегося"
    />
    <MultiSelect class="w-[350px]" placeholder="Выберите столбцы" />
    <InputGroup class="w-[350px]">
      <InputGroupAddon>
        <i class="pi pi-search" />
      </InputGroupAddon>
      <InputText placeholder="Поиск" />
    </InputGroup>
  </div>
</template>
