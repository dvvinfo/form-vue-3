<script setup lang="ts">
interface Props {
    label: string;
    id: string;
    modelValue: string;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    required?: boolean;
    error?: string;
    formatFunction?: (value: string) => string;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    placeholder: '',
    required: false,
    error: '',
    formatFunction: undefined
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'blur'): void;
    (e: 'input', event: Event): void;
}>();

const handleInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    let value = input.value;

    // Apply formatting if provided
    if (props.formatFunction) {
        value = props.formatFunction(value);
    }

    emit('update:modelValue', value);
    emit('input', e);
};
</script>

<template>
    <div class="mb-4">
        <label :for="id" class="block text-gray-700 font-bold mb-2" :class="{ 'text-red-500': required }">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>
        <input :id="id" :value="modelValue" @input="handleInput" @blur="() => emit('blur')" :type="type"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': error }" :placeholder="placeholder" />
        <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
    </div>
</template>