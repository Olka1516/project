<template>
    <div class="forBackground">
        <div class="container">
            <header>
                <h1><Button class="pi pi-chevron-left icon" @click="returnBack" />{{ t("welcomeBack") }}
                </h1>
                <h2>{{ t("fillOut") }}</h2>
            </header>
            <section>
                <hr />
                <div class="field">
                    <EmailInput v-model="user.email" :v="v$.email" :error="error" />
                    <ErrorMessage :v="v$.email" :error="error" />
                </div>
                <div class="field">
                    <PasswordInput v-model="user.password" :v="v$.password" :error="error" />
                    <ErrorMessage :v="v$.password" :error="error" />
                </div>
            </section>
            <footer>
                <div class="foot">
                    <Button :label='t("forgotPassword")' class="p-button-link forgotPassword" @click="resetPas" />
                    <label for="chk-demo1">
                        <input type="checkbox" checked name="remember" id="chk-demo1" />
                        <span>{{ t("rememberMe") }}</span>
                    </label>
                </div>
                <Button class="signBtn" type="submit" @click="signIn" :label='t("login")' />
            </footer>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useUserStore } from "@/stores";
import { useI18n } from "vue-i18n";
import EmailInput from "@/components/textInput/EmailInput.vue";
import ErrorMessage from "@/components/errors/ErrorMessage.vue";
import PasswordInput from "@/components/textInput/PasswordInput.vue";

const router = useRouter();
const userStore = useUserStore();
const error = ref('');
const { t } = useI18n();
const user = reactive({
    email: "sasha@gmail.com",
    password: "123456",
});
const rules = {
    email: { required, email },
    password: { required },
};
const v$ = useVuelidate(rules, user);
const signIn = async () => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) {
        return;
    }
    try {
        await userStore.signIn(user);
        await userStore.changeUserData();
        if (userStore.role === "client") router.push("/client");
        else router.push("/admin");
    } catch (err: any) {
        error.value = err.message;
    }
};
const resetPas = async () => {
    router.push("/resetPassword");
};

const returnBack = () => {
    router.back();
}
</script>

<style scoped>
@import "@/assets/signPage.css";
</style>