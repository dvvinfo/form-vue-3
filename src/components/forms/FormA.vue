<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import InputField from '@/components/InputField.vue';
import AppButton from '@/components/AppButton.vue';
import type { FormAData } from '@/types';

const props = defineProps<{
    initialData?: FormAData;
}>();

const emit = defineEmits<{
    (e: 'submit', data: FormAData): void;
}>();

// Form data
const name = ref(props.initialData?.name || '');
const email = ref(props.initialData?.email || '');
const inn = ref(props.initialData?.inn || '');
const phone = ref(props.initialData?.phone || '');

// Validation errors
const errors = ref({
    name: '',
    email: '',
    inn: '',
    phone: ''
});

// Validation functions
const validateName = () => {
    if (!name.value.trim()) {
        errors.value.name = 'Имя обязательно для заполнения';
        return false;
    }
    errors.value.name = '';
    return true;
};

const validateEmail = () => {
    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        errors.value.email = 'Неверный формат электронной почты';
        return false;
    }
    errors.value.email = '';
    return true;
};

const validateInn = () => {
    const innValue = inn.value.replace(/\s/g, '');

    // Physical person INN (12 digits)
    if (innValue.length === 12) {
        // Simplified validation for physical person
        errors.value.inn = '';
        return true;
    }

    // Legal entity INN (10 digits)
    if (innValue.length === 10) {
        // Simplified validation for legal entity
        errors.value.inn = '';
        return true;
    }

    if (innValue.length > 0) {
        errors.value.inn = 'ИНН должен содержать 10 или 12 цифр';
        return false;
    }

    errors.value.inn = '';
    return true;
};

const validatePhone = () => {
    // Extract only digits from the formatted phone number
    const phoneDigits = phone.value.replace(/\D/g, '');

    // Check if we have exactly 11 digits (7 XXX XXX XX XX)
    if (phone.value && phoneDigits.length !== 11) {
        errors.value.phone = 'Телефон должен содержать ровно 11 цифр';
        return false;
    }

    // Check format pattern
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    if (phone.value && !phoneRegex.test(phone.value)) {
        errors.value.phone = 'Телефон должен быть в формате +7 (XXX) XXX-XX-XX';
        return false;
    }

    errors.value.phone = '';
    return true;
};

// Format phone number as user types
const formatPhone = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '').substring(0, 11);

    // Format as +7 (XXX) XXX-XX-XX
    let formatted = '';
    if (cleaned.length > 0) {
        formatted = '+7 (';
    }
    if (cleaned.length > 1) {
        formatted += cleaned.substring(1, 4);
    }
    if (cleaned.length > 4) {
        formatted += ') ' + cleaned.substring(4, 7);
    }
    if (cleaned.length > 7) {
        formatted += '-' + cleaned.substring(7, 9);
    }
    if (cleaned.length > 9) {
        formatted += '-' + cleaned.substring(9, 11);
    }

    return formatted;
};

// Real-time validation watchers
watch(name, () => {
    validateName();
});

watch(email, () => {
    validateEmail();
});

watch(inn, () => {
    validateInn();
});

watch(phone, () => {
    validatePhone();
});

// Form validation
const isFormValid = computed(() => {
    // Extract only digits from the phone number
    const phoneDigits = phone.value.replace(/\D/g, '');

    return (
        name.value.trim() !== '' &&
        errors.value.name === '' &&
        errors.value.email === '' &&
        inn.value.replace(/\s/g, '').length >= 10 &&
        errors.value.inn === '' &&
        phoneDigits.length === 11 && // Exactly 11 digits for Russian phone numbers
        errors.value.phone === ''
    );
});

// Submit handler
const handleSubmit = () => {
    if (isFormValid.value) {
        emit('submit', {
            name: name.value,
            email: email.value,
            inn: inn.value,
            phone: phone.value
        });
    }
};

// Validate on blur
const validateField = (field: keyof FormAData) => {
    switch (field) {
        case 'name':
            validateName();
            break;
        case 'email':
            validateEmail();
            break;
        case 'inn':
            validateInn();
            break;
        case 'phone':
            validatePhone();
            break;
    }
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-md">
        <!-- Name Field -->
        <InputField label="Имя" id="name" v-model="name" :required="true" :error="errors.name"
            placeholder="Введите ваше имя" @blur="() => validateField('name')" />

        <!-- Email Field -->
        <InputField label="Email" id="email" v-model="email" type="email" :error="errors.email"
            placeholder="Введите ваш email" @blur="() => validateField('email')" />

        <!-- INN Field -->
        <InputField label="ИНН" id="inn" v-model="inn" :required="true" :error="errors.inn"
            placeholder="Введите ИНН (10 или 12 цифр)" @blur="() => validateField('inn')" />
        <p class="text-gray-500 text-sm mt-1 mb-4">Введите 10 цифр для юридического лица или 12 цифр для физического
            лица</p>

        <!-- Phone Field -->
        <InputField label="Телефон" id="phone" v-model="phone" :required="true" :error="errors.phone"
            placeholder="+7 (XXX) XXX-XX-XX" :format-function="formatPhone" :digits-only="true"
            @blur="() => validateField('phone')" />

        <!-- Submit Button -->
        <AppButton type="submit" :disabled="!isFormValid" :fullWidth="true" variant="primary">
            Отправить
        </AppButton>
    </form>
</template>