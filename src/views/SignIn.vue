<template>
    <div class="forBackground">
        <header>
            <h1>Sign In</h1>
            <h2>Будь ласка, заповніть цю форму, щоб увійти у свій акаунт.</h2>
            <hr />
        </header>
        <section class="container">
            <div class="field">
                <div class="p-float-label p-input-icon-right">
                    <i class="pi pi-envelope" />
                    <InputText id="email" v-model="v$.email.$model" :class="{
                        'p-invalid':
                            (v$.email.$invalid && v$.email.$dirty) ||
                            error === 'Firebase: Error (auth/user-not-found).',
                    }" aria-describedby="email-error" />
                    <label for="email" :class="{
                        'p-error':
                            (v$.email.$invalid && v$.email.$dirty) ||
                            error === 'Firebase: Error (auth/user-not-found).',
                    }">Email*</label>
                </div>
                <span v-if="
                    (v$.email.$error && v$.email.$dirty) ||
                    error === 'Firebase: Error (auth/user-not-found).'
                ">
                    <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                        <small class="p-error">{{ error.$message }}</small>
                    </span>
                </span>
                <small v-else-if="
                    (v$.email.$invalid && v$.email.$dirty) ||
                    v$.email.$pending
                " class="p-error">{{ v$.email.required.$message }}</small>
                <small v-if="error === 'Firebase: Error (auth/user-not-found).'" class="p-error">{{
                        error.replace(
                            "Firebase: Error (auth/user-not-found).",
                            "\nEmail is incorrect. Please try again"
                        )
                }}</small>
            </div>
            <div class="field">
                <div class="p-float-label">
                    <Password id="password" v-model="v$.password.$model" :class="{
                        'p-invalid':
                            (v$.password.$invalid && v$.password.$dirty) ||
                            error === 'Firebase: Error (auth/wrong-password).',
                    }" toggleMask :feedback="false">
                    </Password>
                    <label for="password" :class="{
                        'p-error':
                            (v$.password.$invalid && v$.password.$dirty) ||
                            error === 'Firebase: Error (auth/wrong-password).',
                    }">Password*</label>
                </div>
                <small v-if="
                    (v$.password.$invalid && v$.password.$dirty) ||
                    v$.password.$pending
                " class="p-error">{{
        v$.password.required.$message.replace("Value", "Password")
}}</small>
                <small v-if="error === 'Firebase: Error (auth/wrong-password).'" class="p-error">{{
                        error.replace(
                            "Firebase: Error (auth/wrong-password).",
                            "\nPassword is incorrect. Please try again."
                        )
                }}</small>
            </div>
            <Button label="Forgot password?" class="p-button-link" @click="resetPas" />
        </section>
        <footer>
            <Button class="signBtn" type="submit" @click="signIn" label="Login" />
            <div class="rememberBtn">
                <h4>Remember me</h4>
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
import { useUserStore } from "../stores";

const router = useRouter();
const userStore = useUserStore();
const error = ref(null);
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
        console.log("Not valid");
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
</script>

<style scoped>
.forBackground {
    width: 100%;
    min-height: 100vh;
    background-color: #ebd7c3;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

input {
    padding-bottom: 10px;
    border: 1px solid #ccc;
}

.container {
    width: 550px;
    text-align: left;
}

.signBtn {
    margin: 5px 50px 18px;
    padding: 8px 50px;
    background-color: #00589B;
    border: none;
}

.p-input-icon-right {
    width: 100%;
    border: none;
}

.field {
    margin-top: 1.7rem;
}

footer {
    width: 550px;
    margin-top: 5px;
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
}

.rememberBtn {
    width: 150px;
    display: flex;
    align-items: center;
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