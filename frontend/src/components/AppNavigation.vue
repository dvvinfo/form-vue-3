<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <nav class="flex justify-between items-center w-full">
        <RouterLink to="/" class="text-xl font-bold text-blue-600">
            Формы
        </RouterLink>
        <div class="flex space-x-4">
            <RouterLink to="/taxpayer-form" class="text-gray-700 hover:text-blue-600" active-class="text-blue-600 font-medium">
                Форма A
            </RouterLink>
            <RouterLink to="/user-profile-form" class="text-gray-700 hover:text-blue-600" active-class="text-blue-600 font-medium">
                Форма B
            </RouterLink>
            <RouterLink to="/about" class="text-gray-700 hover:text-blue-600" active-class="text-blue-600 font-medium">
                О нас
            </RouterLink>
        </div>
    </nav>
</template>