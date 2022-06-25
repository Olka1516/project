<template>
    <div>
        <span v-if="(props.v.$error && props.v.$dirty)">
            <span id="email-error" v-for="(error, index) of props.v.$errors" :key="index">
                <small v-if="isEmailInvalid(error.$message, ErrorMessage.EmailIsRequired)" class="p-error">{{
                        t("requiredEmail")
                }}</small>
                <small v-if="isEmailInvalid(error.$message, ErrorMessage.EmailIsNotValid)" class="p-error">{{
                        t("emailNotValid")
                }}</small>
            </span>
        </span>
    </div>
    <div>
        <small v-if="isEmailInvalid(props.error)" class="p-error pr-1">
            {{ choiseMessageTranslation() }}
        </small>
    </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ErrorMessage } from "@/types";
import type { ErrorObject } from "@vuelidate/core";
import type { Ref } from "vue";

const { t } = useI18n();

const props = defineProps<{
    v: {
        $error: boolean,
        $dirty: boolean,
        $errors: ErrorObject[]
    },
    error: string,
    translation: string,
}>();

const isEmailInvalid = (errorMessage: string | Ref<string>, enumErrorMessage?: string) => {
    return errorMessage === ErrorMessage.EmailInUse || errorMessage === ErrorMessage.EmailNotFound || errorMessage === enumErrorMessage;
}

const choiseMessageTranslation = () => {
    return props.translation === "wrongEmail" ? t('wrongEmail') : t("emailExists");
}
</script>