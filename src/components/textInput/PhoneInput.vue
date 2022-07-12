<template>
    <div class="p-float-label p-input-icon-right">
        <i class="pi pi-phone" />
        <InputText id="phone" v-model="userPhone" @input="handleInput($event); props.v.$touch()" :class="{
            'p-invalid': isPhoneInvalid()
        }" />
        <label for="phone" :class="{ 'p-error': isPhoneInvalid() }">
            {{ t("fillOutPhone") }}
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

const userPhone = ref(props.modelValue)

const handleInput = (event: any) => {
    if (!event.target) return
    emit('update:modelValue', event.target.value)
}

const isPhoneInvalid = () => {
    return props.v.$invalid && props.v.$dirty;

}
watch(() => props.modelValue, (data) => {
    userPhone.value = data;
})
</script>