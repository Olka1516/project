<template>
    <div class="p-float-label">
        <Calendar class="calenBtn" id="date" v-model="userDate" @date-select="handleInput($event); props.v.$touch()"
            :showIcon="true" :class="{ 'p-invalid': isDateInvalid() }" />
        <label for="date" :class="{ 'p-error': isDateInvalid() }">
            {{ t("fillOutBirthday") }}
        </label>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";


const { t } = useI18n();

const props = defineProps<{
    modelValue?: Date
    v: {
        $dirty: boolean
        $invalid: boolean
        $touch: Function
    }
}>()

const emit = defineEmits<{
    (e: 'update:modelValue',
        val: Date): void
}>()

const userDate = ref(props.modelValue)

const handleInput = (event: Date) => {
    if (!event) return
    emit('update:modelValue', event)
}

const isDateInvalid = () => {
    return props.v.$invalid && props.v.$dirty;
}

watch(() => props.modelValue, (data) => {
    userDate.value = data;
})
</script>
<style scoped>
@import "@/assets/signPage.css";
</style>