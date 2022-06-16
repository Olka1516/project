<template>
    <div class="forBackground">
        <header>
            <h1 class="forTop"> <Button class="pi pi-chevron-left icon" @click="returnBack" />{{ t("create") }}</h1>
            <h2>{{ t("fillOutToCreate") }}</h2>
            <hr />
        </header>
        <div class="container">
            <div class="field">
                <div class="p-float-label p-input-icon-right">
                    <i class="pi pi-envelope" />
                    <InputText id="email" v-model="v$.email.$model" :class="{
                        'p-invalid': (v$.email.$invalid && v$.email.$dirty) || error,
                    }" aria-describedby="email-error" />
                    <label for="email" :class="{ 'p-error': (v$.email.$invalid && v$.email.$dirty) || error }">
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
                    <small v-if="error" class="p-error">{{
                            t('emailExists')
                    }}</small>
                </div>
            </div>
            <div class="field">
                <div class="p-float-label">
                    <Password id="password" v-model="v$.password.$model" :class="{
                        'p-invalid': v$.password.$invalid && v$.password.$dirty,
                    }" toggleMask>
                        <template #header>
                            <h6>{{ t("pickPassword") }}</h6>
                        </template>
                        <template #footer="sp: any">
                            {{ sp.level }}
                            <Divider />
                            <p class="mt-2">{{ t("suggestions") }}</p>
                            <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                <li>{{ t("oneLowercase") }}</li>
                                <li>{{ t("oneUppercase") }}</li>
                                <li>{{ t("oneNumeratic") }}</li>
                                <li>{{ t("minimumEight") }}</li>
                            </ul>
                        </template>
                    </Password>
                    <label for="password" :class="{ 'p-error': v$.password.$invalid && v$.password.$dirty }">
                        {{ t("password") }}*
                    </label>
                </div>
                <div>
                    <small v-if="v$.password.$model === '' && v$.password.$dirty" class="p-error">
                        {{ t('requiredPassword') }}
                    </small>
                </div>
                <div>
                    <small v-if="v$.password.minLength.$invalid && !v$.password.minLength.$response" class="p-error">
                        {{ t('passwordRequiredMinLength') }}
                    </small>
                </div>
            </div>
            <div class="field">
                <div class="p-float-label">
                    <Password id="confirmPassword" v-model="v$.confirmPassword.$model" :class="{
                        'p-invalid':
                            v$.confirmPassword.$invalid && v$.confirmPassword.$dirty,
                    }" toggleMask :feedback="false">
                    </Password>
                    <label for="confirmPassword"
                        :class="{ 'p-error': v$.confirmPassword.$invalid && v$.confirmPassword.$dirty }">
                        {{ t("confirmPassword") }}*
                    </label>
                </div>
                <div>
                    <small v-if="v$.confirmPassword.$model === '' && v$.confirmPassword.$dirty" class="p-error">
                        {{ t("requiredPassword") }}
                    </small>
                </div>
                <div>
                    <small
                        v-if="!v$.confirmPassword.sameAs.$pending && v$.confirmPassword.sameAs.$invalid && v$.confirmPassword.$dirty"
                        class="p-error">
                        {{ t("PasswordMustBeEqual") }}
                    </small>
                </div>
            </div>
            <div class="field">
                <div class="p-float-label p-input-icon-right">
                    <i class="pi pi-user" />
                    <InputText id="name" v-model="v$.name.$model"
                        :class="{ 'p-invalid': v$.name.$invalid && v$.name.$dirty }" />
                    <label for="name" :class="{ 'p-error': v$.name.$invalid && v$.name.$dirty }">
                        {{ t("name") }}*
                    </label>
                </div>
                <small v-if="(v$.name.$invalid && v$.name.$dirty) || v$.name.$pending" class="p-error">
                    {{ t("requiredName") }}
                </small>
            </div>
            <div class="field">
                <div class="p-float-label">
                    <Calendar class="calenBtn" id="date" v-model="user.date" :showIcon="true" />
                    <label for="date">
                        {{ t("fillOutBirthday") }}*
                    </label>
                </div>
                <small v-if="(v$.date.$invalid && v$.date.$dirty) || v$.date.$pending" class="p-error">
                    {{ t("requiredDate") }}
                </small>
            </div>
            <div class="field">
                <div class="p-float-label p-input-icon-right">
                    <i class="pi pi-phone" />
                    <InputText id="phone" v-model="v$.phone.$model" :class="{
                        'p-invalid': v$.phone.$invalid && v$.phone.$dirty,
                    }" />
                    <label for="phone" :class="{ 'p-error': v$.phone.$invalid && v$.phone.$dirty }">
                        {{ t("fillOutPhone") }}*
                    </label>
                </div>
                <small v-if="(v$.phone.$invalid && v$.phone.$dirty) || v$.phone.$pending" class="p-error">
                    {{ t("requiredPhone") }}
                </small>
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
import ErrorMessage from "@/components";
import { useI18n } from "vue-i18n";

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