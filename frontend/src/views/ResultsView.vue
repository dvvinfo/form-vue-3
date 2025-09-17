<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useFormStore } from '@/stores/formStore';
import { RouterLink } from 'vue-router';
import Button from '@/components/AppButton.vue';
import { getSubmissions } from '@/services/api';

const router = useRouter();
const formStore = useFormStore();

const submissions = ref<any[]>([]);
const loading = ref(true);

const hasResults = computed(() => {
    return formStore.requestId !== null && formStore.classifier !== null;
});

const clearResults = () => {
    formStore.clearFormData();
    router.push('/');
};

onMounted(async () => {
    try {
        submissions.value = await getSubmissions();
    } catch (error) {
        console.error('Error fetching submissions:', error);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-6">Результаты отправки формы</h1>

        <div v-if="hasResults" class="bg-white p-6 rounded-lg shadow-md mb-6">
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

        <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-4">История отправок</h2>
            
            <div v-if="loading" class="text-center py-4">
                Загрузка...
            </div>
            
            <div v-else-if="submissions.length > 0">
                <div v-for="submission in submissions" :key="submission.id" class="border-b border-gray-200 py-3">
                    <div class="flex justify-between items-center">
                        <div>
                            <span class="font-medium">Форма {{ submission.formType }}</span>
                            <span class="text-gray-500 text-sm ml-2">ID: {{ submission.requestId }}</span>
                        </div>
                        <div class="text-gray-500 text-sm">
                            {{ new Date(submission.submittedAt).toLocaleString() }}
                        </div>
                    </div>
                </div>
            </div>
            
            <div v-else class="text-gray-600">
                Нет отправленных форм.
            </div>
        </div>
    </div>
</template>