<template>
    <div>
        <small v-if="(props.v.$invalid && props.v.$dirty) || props.v.$pending" class="p-error">
            {{ t('requiredPassword') }}
        </small>
    </div>
    <div>
        <small v-if="props.error === ErrorMessage.PasswordNotFound" class="p-error">
            {{ t('wrongPassword') }}
        </small>
    </div>
</template>


<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ErrorMessage } from "@/types";

const { t } = useI18n();

const props = defineProps<{
    v: {
        $invalid: boolean,
        $dirty: boolean,
        $pending: boolean
    },
    error: string
}>();
</script>

