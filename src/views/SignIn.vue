<template>
    <div class="forBackground">
        <header>
            <h1 class="forTop"> <Button class="pi pi-chevron-left icon" @click="returnBack" />{{ t("welcomeBack") }}
            </h1>
            <h2>{{ t("fillOut") }}</h2>
            <hr />
        </header>
        <section class="container">
            <div class="field">
                <EmailInput v-model="v$.email.$model" :v="v$.email" :error="error" />
                <EmailErrorMessage :v="v$.email" :error="error" translation="wrongEmail" />
            </div>
            <div class="field">
                <PasswordInput v-model="user.password" :v="v$.password" :error="error" />
                <PasswordErrorMessage :v="v$.password" :error="error" />
            </div>
            <Button :label='t("forgotPassword")' class="p-button-link" @click="resetPas" />
        </section>
        <footer>
            <Button class="signBtn" type="submit" @click="signIn" :label='t("login")' />
            <div class="rememberBtn">
                <h4>{{ t("rememberMe") }}</h4>
                <input type="checkbox" checked name="remember" />
            </div>
        </footer>
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
import EmailErrorMessage from "@/components/errors/EmailErrorMessage.vue";
import PasswordErrorMessage from "@/components/errors/PasswordErrorMessage.vue";
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
@import "@/assets/style.css";

.signBtn {
    margin-top: 5px;
}

footer {
    display: inline-flex;
    justify-content: flex-end;
}

@media screen and (max-width: 576px) {
    .container {
        width: 315px;
    }

    footer {
        width: 315px;
        margin-top: 5px;
        display: flex;
        align-items: center;
        flex-direction: row;
    }

    .signBtn {
        margin: 0 10px;

    }
}
</style>