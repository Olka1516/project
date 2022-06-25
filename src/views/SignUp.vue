<template>
    <div class="forBackground">
        <header>
            <h1 class="forTop"> <Button class="pi pi-chevron-left icon" @click="returnBack" />{{ t("create") }}</h1>
            <h2>{{ t("fillOutToCreate") }}</h2>
            <hr />
        </header>
        <div class="container">
            <div class="field">
                <EmailInput v-model="v$.email.$model" :v="v$.email" :error="error" />
                <EmailErrorMessage :v="v$.email" :error="error" translation="emailIsNotValid" />
            </div>
            <div class="field">
                <PasswordInput v-model="v$.password.$model" :v="v$.password" :error="error" />
                <PasswordErrorMessage v-model="v$.password.$model" :v="v$.password" />
            </div>
            <div class="field">
                <ConfirmPasswordInput v-model="v$.confirmPassword.$model" :v="v$.confirmPassword" />
                <PasswordErrorMessage v-model="v$.confirmPassword.$model" :v="v$.confirmPassword" />
            </div>
            <div class="field">
                <NameInput v-model="v$.name.$model" :v="v$.name" />
                <NameDatePhoneErrors name="name" :v="v$.name" />
            </div>
            <div class="field">
                <DateInput v-model="v$.date.$model" :v="v$.date" />
                <NameDatePhoneErrors name="date" :v="v$.date" />
            </div>
            <div class="field">
                <PhoneInput v-model="v$.phone.$model" :v="v$.phone" />
                <NameDatePhoneErrors name="phone" :v="v$.phone" />
            </div>
        </div>
        <footer>
            <label class="rememberBtn">
                <input type="checkbox" checked name="remember" />
                <h4> {{ t("rememberMe") }} </h4>
            </label>
            <Button :label="t('signUpBtn')" type="submit" @click="signUp" class="signBtn" />
        </footer>
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
import EmailErrorMessage from "@/components/errors/EmailErrorMessage.vue";
import PasswordErrorMessage from "@/components/errors/PasswordErrorSignUp.vue";
import NameDatePhoneErrors from "@/components/errors/NameDatePhoneErrors.vue";

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
        console.log("nea")
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
@import "@/assets/style.css";

@media screen and (max-width: 576px) {
    .container {
        margin: 0 15px;
    }
}
</style>