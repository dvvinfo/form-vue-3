<template>
  <div class="container mx-auto p-4">
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold mb-4">О приложении</h1>
      <p class="mb-4">
        Это приложение на Vue 3 + TypeScript + Vite с Pinia и Vue Router.
      </p>

      <h2 class="text-2xl font-semibold mb-3">Возможности</h2>
      <ul class="list-disc pl-5 mb-4">
        <li class="mb-2">Форма A с проверкой ИНН для физических или юридических лиц</li>
        <li class="mb-2">Форма B с персональной информацией и проверкой логина</li>
        <li class="mb-2">Проверка в реальном времени</li>
        <li class="mb-2">Управление состоянием с помощью Pinia для хранения результатов формы</li>
        <li class="mb-2">Адаптивный дизайн с Tailwind CSS</li>
      </ul>

      <h2 class="text-2xl font-semibold mb-3">Как использовать</h2>
      <ol class="list-decimal pl-5 mb-4">
        <li class="mb-2">Перейдите к Форме A или Форме B с главной страницы</li>
        <li class="mb-2">Заполните обязательные поля</li>
        <li class="mb-2">Отправьте форму, когда все проверки пройдены</li>
        <li class="mb-2">Просмотрите результаты отправки на странице результатов</li>
      </ol>

      <RouterLink to="/">
        <Button variant="primary">
          На главную
        </Button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Button from '@/components/AppButton.vue';
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>