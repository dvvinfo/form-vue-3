import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { SuccessResponse } from '@/types';

export const useFormStore = defineStore('form', () => {
  const requestId = ref<string | null>(null);
  const classifier = ref<string | null>(null);

  function setFormData(data: SuccessResponse) {
    requestId.value = data.requestId;
    classifier.value = data.classifier;
  }

  function clearFormData() {
    requestId.value = null;
    classifier.value = null;
  }

  return { requestId, classifier, setFormData, clearFormData };
});