<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
    label: string;
    id: string;
    modelValue: string;
    required?: boolean;
    error?: string;
    placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
    required: false,
    error: '',
    placeholder: ''
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'blur'): void;
}>();

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

const handleInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    let value = input.value;

    // Remove all non-digit characters and limit to 11 digits
    const digitsOnly = value.replace(/\D/g, '').substring(0, 11);
    const formatted = formatPhone(digitsOnly);

    emit('update:modelValue', formatted);
};

// Add keypress handler to prevent non-digit input
const handleKeypress = (e: KeyboardEvent) => {
    // Allow: backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        return; // Let it happen, don't do anything
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
};

// Add paste handler to filter non-digit characters
const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData?.getData('text/plain') || '';
    const filteredData = pastedData.replace(/\D/g, '').substring(0, 11);
    const formattedData = formatPhone(filteredData);

    emit('update:modelValue', formattedData);
};
</script>

<template>
    <div class="mb-4">
        <label :for="id" class="block text-gray-700 font-bold mb-2" :class="{ 'text-red-500': required }">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>
        <input :id="id" :value="modelValue" @input="handleInput" @keypress="handleKeypress" @paste="handlePaste"
            @blur="() => emit('blur')" type="tel"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': error }" :placeholder="placeholder" />
        <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
    </div>
</template>