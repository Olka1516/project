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
                <div class="p-float-label p-input-icon-right">
                    <i class="pi pi-envelope" />
                    <InputText id="email" v-model="v$.email.$model" :class="{
                        'p-invalid': (v$.email.$invalid && v$.email.$dirty) || error === ErrorMessage.EmailNotFound
                    }" aria-describedby="email-error" />
                    <label for="email" :class="{
                        'p-error': (v$.email.$invalid && v$.email.$dirty) || error === ErrorMessage.EmailNotFound
                    }">
                        {{ t("email") }}*
                    </label>
                </div>
                <div>
                    <span v-if="(v$.email.$error && v$.email.$dirty)">
                        <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
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
            <div class="field">
                <div class="p-float-label">
                    <Password id="password" v-model="v$.password.$model" :class="{
                        'p-invalid':
                            (v$.password.$invalid && v$.password.$dirty) || error === ErrorMessage.PasswordNotFound
                    }" toggleMask :feedback="false">
                    </Password>
                    <label for="password" :class="{
                        'p-error':
                            (v$.password.$invalid && v$.password.$dirty) ||
                            error === ErrorMessage.PasswordNotFound
                    }">
                        {{ t("password") }}*
                    </label>
                </div>
                <div>
                    <small v-if="(v$.password.$invalid && v$.password.$dirty) || v$.password.$pending" class="p-error">
                        {{ t('requiredPassword') }}
                    </small>
                </div>
                <div>
                    <small v-if="error === ErrorMessage.PasswordNotFound" class="p-error">
                        {{ t('wrongPassword') }}
                    </small>
                </div>
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
import ErrorMessage from "@/components";
import { useI18n } from "vue-i18n";

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