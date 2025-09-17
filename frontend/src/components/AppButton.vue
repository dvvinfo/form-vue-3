<script setup lang="ts">
interface Props {
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    disabled?: boolean;
    fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'button',
    variant: 'primary',
    disabled: false,
    fullWidth: false
});

const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void;
}>();

const getButtonClass = () => {
    let baseClass = 'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';

    if (props.fullWidth) {
        baseClass += ' w-full';
    }

    if (props.disabled) {
        baseClass += ' opacity-50 cursor-not-allowed';
    }

    switch (props.variant) {
        case 'primary':
            return props.disabled
                ? `${baseClass} bg-blue-500 text-white`
                : `${baseClass} bg-blue-500 hover:bg-blue-700 text-white`;
        case 'secondary':
            return props.disabled
                ? `${baseClass} bg-gray-500 text-white`
                : `${baseClass} bg-gray-500 hover:bg-gray-700 text-white`;
        case 'success':
            return props.disabled
                ? `${baseClass} bg-green-500 text-white`
                : `${baseClass} bg-green-500 hover:bg-green-700 text-white`;
        case 'danger':
            return props.disabled
                ? `${baseClass} bg-red-500 text-white`
                : `${baseClass} bg-red-500 hover:bg-red-700 text-white`;
        default:
            return props.disabled
                ? `${baseClass} bg-blue-500 text-white`
                : `${baseClass} bg-blue-500 hover:bg-blue-700 text-white`;
    }
};
</script>

<template>
    <button :type="type" :class="getButtonClass()" :disabled="disabled" @click="(e) => emit('click', e)">
        <slot></slot>
    </button>
</template>