<template>
    <div class="forBackground">
        <div class="container">
            <header>
                <h1 class="forTop"> <Button class="pi pi-chevron-left icon" @click="returnBack" />{{ t("create") }}</h1>
                <h2>{{ t("fillOutToCreate") }}</h2>
                <hr />
            </header>
            <section>
                <div class="field">
                    <EmailInput v-model="user.email" :v="v$.email" :error="error" />
                    <ErrorMessage :v="v$.email" :error="error" />
                </div>
                <div class="field">
                    <PasswordInput v-model="user.password" :v="v$.password" :error="error" />
                    <ErrorMessage :v="v$.password" />
                </div>
                <div class="field">
                    <ConfirmPasswordInput v-model="user.confirmPassword" :v="v$.confirmPassword" />
                    <ErrorMessage :v="v$.confirmPassword" />
                </div>
                <div class="field">
                    <NameInput v-model="user.name" :v="v$.name" />
                    <ErrorMessage :v="v$.name" />
                </div>
                <div class="field">
                    <DateInput v-model="user.date" :v="v$.date" />
                    <ErrorMessage :v="v$.date" />
                </div>
                <div class="field">
                    <PhoneInput v-model="user.phone" :v="v$.phone" />
                    <ErrorMessage :v="v$.phone" />
                </div>
            </section>
            <footer>
                <label for="chk-demo1">
                    <input type="checkbox" checked name="remember" id="chk-demo1" />
                    <span>{{ t("rememberMe") }}</span>
                </label>
                <Button :label="t('signUpBtn')" type="submit" @click="signUp" class="signBtn" />
            </footer>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { email, required, sameAs, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useUserStore } from "@/stores";
import { useI18n } from "vue-i18n";
import EmailInput from "@/components/textInput/EmailInput.vue";
import PasswordInput from "@/components/textInput/PasswordInputFromSignUp.vue";
import ConfirmPasswordInput from "@/components/textInput/ConfirmPasswordInput.vue";
import NameInput from "@/components/textInput/NameInput.vue";
import DateInput from "@/components/textInput/DateInput.vue";
import PhoneInput from "@/components/textInput/PhoneInput.vue";
import ErrorMessage from "@/components/errors/ErrorMessage.vue";

const { t } = useI18n();
const userStore = useUserStore();
const router = useRouter();
const error = ref('');
const user = reactive({
    email: "",
    password: "",
    name: "",
    date: undefined,
    phone: "",
    confirmPassword: "",
});
const rules = {
    email: { required, email },
    password: { required, minLength: minLength(6) },
    name: { required },
    date: { required },
    phone: { required },
    confirmPassword: {
        required,
        sameAs: sameAs(computed(() => user.password)),
    },
};
const v$ = useVuelidate(rules, user);
const signUp = async () => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) {
        return;
    }
    try {
        await userStore.signUp(user);
        await userStore.changeUserData();
        router.push("/client");
    } catch (err: any) {
        error.value = err.message;
    }
};
const returnBack = () => {
    router.back();
}
</script>
<style scoped>
@import "@/assets/signPage.css";
</style>