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
                <div class="p-float-label p-input-icon-right">
                    <i class="pi pi-envelope" />
                    <InputText id="email" v-model="v$.userEmail.$model" :class="{
                        'p-invalid':
                            (v$.userEmail.$invalid && v$.userEmail.$dirty) ||
                            error === ErrorMessage.EmailNotFound
                    }" aria-describedby="email-error" />
                    <label for="email" :class="{
                        'p-error':
                            (v$.userEmail.$invalid && v$.userEmail.$dirty) ||
                            error === ErrorMessage.EmailNotFound
                    }">
                        {{ t("email") }}*
                    </label>
                </div>
                <div>
                    <span v-if="(v$.userEmail.$error && v$.userEmail.$dirty)">
                        <span id="email-error" v-for="(error, index) of v$.userEmail.$errors" :key="index">
                            <small v-if="error.$message === ErrorMessage.EmailIsRequired" class="p-error">{{
                                    t("requiredEmail")
                            }}</small>
                            <small v-if="error.$message === ErrorMessage.EmailIsNotValid" class="p-error">{{
                                    t("emailNotValid")
                            }}</small>
                        </span>
                    </span>
                </div>
                <div>
                    <small v-if="error === ErrorMessage.EmailNotFound" class="p-error pr-1">
                        {{ t('wrongEmail') }}
                    </small>
                </div>
            </div>
        </section>
        <footer>
            <Button class="signBtn" type="submit" @click="resetPas" :label='t("resetPasswordBtn")' />
        </footer>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useUserStore } from "../stores";
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import ErrorMessage from "@/components";

const { t } = useI18n();
const userStore = useUserStore();
const toast = useToast();
const error = ref('');
const userEmail = ref("");
const router = useRouter();

const rules = {
    userEmail: { required, email },
};
const v$ = useVuelidate(rules, { userEmail });
const resetPas = async () => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) {
        console.log("Not valid");
        return;
    }
    try {
        await userStore.resetPas(userEmail.value);
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