<template>
    <div class="p-float-label">
        <Password id="password" v-model="userPassword" @input="handleInput($event); props.v.$touch()" :class="{
            'p-invalid': isPasswordInvalid()
        }" toggleMask>
            <template #header>
                <h6>{{ t("pickPassword") }}</h6>
            </template>
            <template #footer="sp: any">
                {{ sp.level }}
                <Divider />
                <p class="mt-2">{{ t("suggestions") }}</p>
                <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                    <li>{{ t("oneLowercase") }}</li>
                    <li>{{ t("oneUppercase") }}</li>
                    <li>{{ t("oneNumeratic") }}</li>
                    <li>{{ t("minimumEight") }}</li>
                </ul>
            </template>
        </Password>
        <label for="password" :class="{ 'p-error': isPasswordInvalid() }">
            {{ t("password") }}
        </label>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
    modelValue: string
    v: {
        $invalid: boolean
        $dirty: boolean
        $touch: Function
    }
}>()

const emit = defineEmits<{
    (e: 'update:modelValue',
        val: string | null): void
}>()

const userPassword = ref(props.modelValue)

const handleInput = (event: any) => {
    if (!event.target) return
    emit('update:modelValue', event.target.value)
}

const isPasswordInvalid = () => {
    return props.v.$invalid && props.v.$dirty;

}
watch(() => props.modelValue, (data) => {
    userPassword.value = data;
})

</script>

<style scoped>
@import "@/assets/signPage.css";
</style>