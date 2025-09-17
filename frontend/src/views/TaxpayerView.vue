<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFormStore } from '@/stores/formStore';
import FormA from '@/components/forms/TaxpayerForm.vue';
import type { FormAData } from '@/types';
import Button from '@/components/AppButton.vue';
import { submitFormA } from '@/services/api';

const router = useRouter();
const formStore = useFormStore();

const formData = ref<FormAData>({
    name: '',
    email: '',
    inn: '',
    phone: ''
});

const errorMessage = ref('');

const handleSubmit = async (data: FormAData) => {
    try {
        errorMessage.value = '';
        // Format the phone number for backend (remove spaces, parentheses, and dashes)
        const formattedData = {
            ...data,
            phone: data.phone.replace(/\D/g, '').replace(/^7/, '+7')
        };

        // Make real API call
        const response = await submitFormA(formattedData);

        // Save to store
        formStore.setFormData(response);

        // Navigate to results
        router.push('/results');
    } catch (error: any) {
        console.error('Form submission error:', error);
        // Display error message to user
        if (error.message) {
            errorMessage.value = error.message;
        } else {
            errorMessage.value = 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.';
        }
    }
};
</script>

<template>
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-6">Форма A</h1>

        <!-- Error message display -->
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Ошибка:</strong> {{ errorMessage }}
        </div>

        <FormA :initial-data="formData" @submit="handleSubmit" />
        <RouterLink to="/">
            <Button variant="secondary" class="mt-4">
                ← Назад на главную
            </Button>
        </RouterLink>
    </div>
</template>