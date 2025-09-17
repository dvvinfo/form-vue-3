<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from '@/components/AppHeader.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>