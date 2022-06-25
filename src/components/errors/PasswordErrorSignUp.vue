<template>
    <div>
        <small v-if="props.modelValue === '' && props.v.$dirty" class="p-error">
            {{ t('requiredPassword') }}
        </small>
    </div>
    <div v-if="props.v.minLength">
        <small v-if="props.v.minLength.$invalid && !props.v.minLength.$response" class="p-error">
            {{ t('passwordRequiredMinLength') }}
        </small>
    </div>
    <div v-if="props.v.sameAs">
        <small v-if="!props.v.sameAs.$pending && props.v.sameAs.$invalid && props.v.$dirty" class="p-error">
            {{ t("PasswordMustBeEqual") }}
        </small>
    </div>
</template>


<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
    modelValue: string
    v: {
        $dirty: boolean,
        minLength?: {
            $invalid: boolean
            $response: boolean
        }
        sameAs?: {
            $pending: boolean
            $invalid: boolean
        }
    },
}>();
</script>

