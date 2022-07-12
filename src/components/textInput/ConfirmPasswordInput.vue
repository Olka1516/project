<template>
    <div class="p-float-label">
        <Password id="confirmPassword" v-model="userPassword" @input="handleInput($event); props.v.$touch()" :class="{
            'p-invalid':
                isPasswordInvalid()
        }" toggleMask :feedback="false">
        </Password>
        <label for="confirmPassword" :class="{ 'p-error': isPasswordInvalid() }">
            {{ t("confirmPassword") }}
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