<script setup lang="ts">
import { ref, computed } from 'vue';
import InputField from '@/components/InputField.vue';
import Button from '@/components/AppButton.vue';
import type { FormBData } from '@/types';

const props = defineProps<{
    initialData?: FormBData;
}>();

const emit = defineEmits<{
    (e: 'submit', data: FormBData): void;
}>();

// Form data
const name = ref(props.initialData?.name || '');
const surname = ref(props.initialData?.surname || '');
const patronymic = ref(props.initialData?.patronymic || '');
const birthDate = ref(props.initialData?.birthDate || '');
const login = ref(props.initialData?.login || '');
const email = ref(props.initialData?.email || '');

// Validation errors
const errors = ref({
    name: '',
    surname: '',
    patronymic: '',
    birthDate: '',
    login: '',
    email: ''
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

const validateSurname = () => {
    if (!surname.value.trim()) {
        errors.value.surname = 'Фамилия обязательна для заполнения';
        return false;
    }
    errors.value.surname = '';
    return true;
};

const validatePatronymic = () => {
    if (!patronymic.value.trim()) {
        errors.value.patronymic = 'Отчество обязательно для заполнения';
        return false;
    }
    errors.value.patronymic = '';
    return true;
};

const validateBirthDate = () => {
    const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!dateRegex.test(birthDate.value)) {
        errors.value.birthDate = 'Дата должна быть в формате ДД.ММ.ГГГГ';
        return false;
    }

    // Additional validation for real date
    const parts = birthDate.value.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    const year = parseInt(parts[2], 10);

    const date = new Date(year, month, day);
    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month ||
        date.getDate() !== day
    ) {
        errors.value.birthDate = 'Неверная дата';
        return false;
    }

    errors.value.birthDate = '';
    return true;
};

const validateLogin = () => {
    if (login.value.length < 6) {
        errors.value.login = 'Логин должен содержать минимум 6 символов';
        return false;
    }

    if (!/^[a-zA-Z]+$/.test(login.value)) {
        errors.value.login = 'Логин должен содержать только латинские символы';
        return false;
    }

    errors.value.login = '';
    return true;
};

const validateEmail = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        errors.value.email = 'Неверный формат электронной почты';
        return false;
    }
    errors.value.email = '';
    return true;
};

// Format date as user types
const formatDate = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '').substring(0, 8);

    // Format as DD.MM.YYYY
    let formatted = '';
    if (cleaned.length > 0) {
        formatted = cleaned.substring(0, 2);
    }
    if (cleaned.length > 2) {
        formatted += '.' + cleaned.substring(2, 4);
    }
    if (cleaned.length > 4) {
        formatted += '.' + cleaned.substring(4, 8);
    }

    return formatted;
};

// Form validation
const isFormValid = computed(() => {
    return (
        name.value.trim() !== '' &&
        surname.value.trim() !== '' &&
        patronymic.value.trim() !== '' &&
        birthDate.value.length === 10 && // DD.MM.YYYY = 10 characters
        errors.value.name === '' &&
        errors.value.surname === '' &&
        errors.value.patronymic === '' &&
        errors.value.birthDate === '' &&
        login.value.length >= 6 &&
        /^[a-zA-Z]+$/.test(login.value) &&
        errors.value.login === '' &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) &&
        errors.value.email === ''
    );
});

// Submit handler
const handleSubmit = () => {
    if (isFormValid.value) {
        emit('submit', {
            name: name.value,
            surname: surname.value,
            patronymic: patronymic.value,
            birthDate: birthDate.value,
            login: login.value,
            email: email.value
        });
    }
};

// Validate on blur
const validateField = (field: keyof FormBData) => {
    switch (field) {
        case 'name':
            validateName();
            break;
        case 'surname':
            validateSurname();
            break;
        case 'patronymic':
            validatePatronymic();
            break;
        case 'birthDate':
            validateBirthDate();
            break;
        case 'login':
            validateLogin();
            break;
        case 'email':
            validateEmail();
            break;
    }
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-md">
        <!-- Name Field -->
        <InputField label="Имя" id="name" v-model="name" :required="true" :error="errors.name"
            placeholder="Введите ваше имя" @blur="() => validateField('name')" />

        <!-- Surname Field -->
        <InputField label="Фамилия" id="surname" v-model="surname" :required="true" :error="errors.surname"
            placeholder="Введите вашу фамилию" @blur="() => validateField('surname')" />

        <!-- Patronymic Field -->
        <InputField label="Отчество" id="patronymic" v-model="patronymic" :required="true" :error="errors.patronymic"
            placeholder="Введите ваше отчество" @blur="() => validateField('patronymic')" />

        <!-- Birth Date Field -->
        <InputField label="Дата рождения" id="birthDate" v-model="birthDate" :required="true" :error="errors.birthDate"
            placeholder="ДД.ММ.ГГГГ" :format-function="formatDate" @blur="() => validateField('birthDate')" />

        <!-- Login Field -->
        <InputField label="Логин" id="login" v-model="login" :required="true" :error="errors.login"
            placeholder="Введите логин (минимум 6 латинских символов)" @blur="() => validateField('login')" />

        <!-- Email Field -->
        <InputField label="Email" id="email" v-model="email" type="email" :required="true" :error="errors.email"
            placeholder="Введите ваш email" @blur="() => validateField('email')" />

        <!-- Submit Button -->
        <Button type="submit" :disabled="!isFormValid" :fullWidth="true" variant="success">
            Отправить
        </Button>
    </form>
</template>