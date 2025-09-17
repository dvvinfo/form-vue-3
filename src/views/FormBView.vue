<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFormStore } from '@/stores/formStore';
import FormB from '@/components/forms/FormB.vue';
import type { FormBData } from '@/types';
import Button from '@/components/AppButton.vue';

const router = useRouter();
const formStore = useFormStore();

const formData = ref<FormBData>({
    name: '',
    surname: '',
    patronymic: '',
    birthDate: '',
    login: '',
    email: ''
});

const handleSubmit = async (data: FormBData) => {
    try {
        // Simulate API call
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                // Simulate successful response
                resolve({
                    requestId: Math.floor(Math.random() * 100000).toString(),
                    classifier: 'form-b-classifier'
                });
            }, 1000);
        });

        // Save to store
        formStore.setFormData(response as any);

        // Navigate to results
        router.push('/results');
    } catch (error) {
        console.error('Form submission error:', error);
    }
};
</script>

<template>
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-6">Форма B</h1>
        <FormB :initial-data="formData" @submit="handleSubmit" />
        <RouterLink to="/">
            <Button variant="secondary" class="mt-4">
                ← Назад на главную
            </Button>
        </RouterLink>
    </div>
</template>