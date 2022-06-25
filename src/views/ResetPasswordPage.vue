<template>
    <div class="forBackground">
        <Toast />
        <header>
            <h1 class="forTop"> <Button class="pi pi-chevron-left icon" @click="returnBack" />
                {{ t("resetPassword") }}
            </h1>
            <h2>{{ t("resetPasswordText") }}</h2>
            <hr />
        </header>
        <section class="container">
            <div class="field">
                <EmailInput v-model="v$.email.$model" :v="v$.email" :error="error" />
                <EmailErrorMessage :v="v$.email" :error="error" translation="wrongEmail" />
            </div>
        </section>
        <footer>
            <Button class="signBtn" type="submit" @click="resetPas" :label='t("resetPasswordBtn")' />
        </footer>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useUserStore } from "../stores";
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import EmailInput from "@/components/textInput/EmailInput.vue";
import EmailErrorMessage from "@/components/errors/EmailErrorMessage.vue";

const { t } = useI18n();
const userStore = useUserStore();
const toast = useToast();
const error = ref('');
const user = reactive({
    email: ""
});
const router = useRouter();

const rules = {
    email: { required, email },
};
const v$ = useVuelidate(rules, user);
const resetPas = async () => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) {
        return;
    }
    try {
        await userStore.resetPas(user.email);
        toast.add({ severity: 'success', summary: 'Sent', detail: 'Check your email', life: 3000 });
    } catch (err: any) {
        error.value = err.message;
    }
};

const returnBack = () => {
    router.back();
}
</script>
<style scoped>
@import "@/assets/style.css";
</style>