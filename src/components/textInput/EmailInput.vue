<template>
    <div class="p-float-label p-input-icon-right">
        <i class="pi pi-envelope" />
        <InputText id="email" v-model="userEmail"
            @input="handleInput($event); props.v.$touch()" :class="{
                'p-invalid': isEmailInvalid()
            }" aria-describedby="email-error" />
        <label for="email" :class="{ 'p-error': isEmailInvalid() }">
            {{ t("email") }}
        </label>
    </div>
</template>
<script setup lang="ts">
import { ErrorMessageEnum } from '@/types';
import { ref, watch } from 'vue';
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps<{
    modelValue: string
    v: {
        $invalid: boolean
        $dirty: boolean
        $touch: Function
    }
    error: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue',
        val: string | null): void
}>()
const userEmail = ref(props.modelValue)

const handleInput = (event: any) => {
    if (!event.target) return
    emit('update:modelValue', event.target.value);
}

const isEmailInvalid = () => {
    return (props.v.$invalid && props.v.$dirty) ||
        (props.error === ErrorMessageEnum.EmailNotFound || props.error === ErrorMessageEnum.EmailInUse);
}
watch(() => props.modelValue, (data) => {
    userEmail.value = data;
})
</script>