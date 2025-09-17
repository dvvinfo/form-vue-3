<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useFormStore } from '@/stores/formStore';
import { RouterLink } from 'vue-router';
import Button from '@/components/AppButton.vue';

const router = useRouter();
const formStore = useFormStore();

const hasResults = computed(() => {
    return formStore.requestId !== null && formStore.classifier !== null;
});

const clearResults = () => {
    formStore.clearFormData();
    router.push('/');
};
</script>

<template>
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-6">Результаты отправки формы</h1>

        <div v-if="hasResults" class="bg-white p-6 rounded-lg shadow-md">
            <div class="mb-4">
                <h2 class="text-xl font-semibold mb-2">Отправка успешна</h2>
                <p class="text-gray-600">Ваша форма была успешно отправлена.</p>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">ID запроса:</label>
                <div class="bg-gray-100 p-3 rounded">{{ formStore.requestId }}</div>
            </div>

            <div class="mb-6">
                <label class="block text-gray-700 font-bold mb-2">Классификатор:</label>
                <div class="bg-gray-100 p-3 rounded">{{ formStore.classifier }}</div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
                <Button @click="clearResults" variant="primary">
                    Отправить другую форму
                </Button>
                <RouterLink to="/">
                    <Button variant="secondary">
                        На главную
                    </Button>
                </RouterLink>
            </div>
        </div>

        <div v-else class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-4">Нет доступных результатов</h2>
            <p class="text-gray-600 mb-4">Вы еще не отправляли формы.</p>
            <RouterLink to="/">
                <Button variant="primary">
                    На главную
                </Button>
            </RouterLink>
        </div>
    </div>
</template>