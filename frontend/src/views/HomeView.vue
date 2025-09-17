<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Button from '@/components/AppButton.vue';
</script>

<template>
  <main class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Формы приложения</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Форма A</h2>
        <p class="mb-4">Форма для физических или юридических лиц с проверкой ИНН.</p>
        <RouterLink to="/taxpayer-form">
          <Button variant="primary">
            Перейти к Форме A
          </Button>
        </RouterLink>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Форма B</h2>
        <p class="mb-4">Форма с персональной информацией и проверкой логина.</p>
        <RouterLink to="/user-profile-form">
          <Button variant="success">
            Перейти к Форме B
          </Button>
        </RouterLink>
      </div>
    </div>
  </main>
</template>