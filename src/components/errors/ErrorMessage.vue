<template>
    <div>
        <span v-if="(props.v.$error && props.v.$dirty) || props.error">
            <small class="p-error">{{
                    getError()
            }}</small>
        </span>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ErrorMessageEnum } from "@/types";
import type { ErrorObject } from "@vuelidate/core";

const { t } = useI18n();

const props = defineProps<{
    v: {
        $error: boolean
        $dirty: boolean
        $errors: ErrorObject[]
        $path: string
    },
    error?: string
}>();

const getError = () => {
    const { $message: message } = props.v.$errors?.[0] ?? { $message: null }

    switch (props.v.$path) {
        case "email":
            if (message === ErrorMessageEnum.EmailIsNotValid)
                return t("emailNotValid")
            else if (message === ErrorMessageEnum.IsRequired)
                return t("requiredEmail")
            else if (props.error === ErrorMessageEnum.EmailInUse)
                return t("emailExists")
            else if (props.error === ErrorMessageEnum.EmailNotFound)
                return t('wrongEmail')
            break;
        case "password":
            if (message === ErrorMessageEnum.IsRequired)
                return t('requiredPassword')
            else if (message === ErrorMessageEnum.PasswordMinLength)
                return t('passwordRequiredMinLength')
            else if (props.error === ErrorMessageEnum.PasswordNotFound)
                return t('wrongPassword')
            break;
        case "confirmPassword":
            if (message === ErrorMessageEnum.IsRequired)
                return t('requiredPassword')
            else if (message === ErrorMessageEnum.PasswordIsEqual)
                return t("PasswordMustBeEqual")
            break;
        case "name":
            if (message === ErrorMessageEnum.IsRequired)
                return t('requiredName')
            break;
        case "date":
            if (message === ErrorMessageEnum.IsRequired)
                return t('requiredDate')
            break;
        case "phone":
            if (message === ErrorMessageEnum.IsRequired)
                return t('requiredPhone')
            break;
    }
}
</script>