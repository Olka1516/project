<template>
    <small v-if="(props.v.$invalid && props.v.$dirty) || props.v.$pending" class="p-error">
        {{ choiseMessageTranslation() }}
    </small>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
    name: string
    v: {
        $invalid: boolean
        $dirty: boolean
        $pending: boolean
    }
}>();

const choiseMessageTranslation = () => {
    return props.name === "name" ? t("requiredName") : props.name === "phone" ? t("requiredPhone") : t("requiredDate");
}
</script>