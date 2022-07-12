<template>
    <div class="p-float-label p-input-icon-right">
        <i class="pi pi-user" />
        <InputText id="name" v-model="userName" @input="handleInput($event); props.v.$touch()"
            :class="{ 'p-invalid': isNameInvalid() }" />
        <label for="name" :class="{ 'p-error': isNameInvalid() }">
            {{ t("name") }}
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

const userName = ref(props.modelValue)

const handleInput = (event: any) => {
    if (!event.target) return
    emit('update:modelValue', event.target.value)
}

const isNameInvalid = () => {
    return props.v.$invalid && props.v.$dirty;
}

watch(() => props.modelValue, (data) => {
    userName.value = data;
})
</script>