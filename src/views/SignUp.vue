<template>
    <div class="forBackground">
        <div>
            <header>
                <h1>Sign Up</h1>
                <h2>Будь ласка, заповніть цю форму, щоб створити обліковий запис.</h2>
            </header>
            <hr />
            <div class="container">
                <div class="field">
                    <div class="p-float-label p-input-icon-right">
                        <i class="pi pi-envelope" />
                        <InputText id="email" v-model="v$.email.$model" :class="{
                            'p-invalid': (v$.email.$invalid && v$.email.$dirty) || error,
                        }" aria-describedby="email-error" />
                        <label for="email" :class="{
                            'p-error': (v$.email.$invalid && v$.email.$dirty) || error,
                        }">Email*</label>
                    </div>
                    <span v-if="(v$.email.$error && v$.email.$dirty) || error">
                        <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                            <small class="p-error">{{ error.$message }}</small>
                        </span>
                    </span>
                    <small v-else-if="
                        (v$.email.$invalid && v$.email.$dirty) ||
                        v$.email.$pending
                    " class="p-error">{{ v$.email.required.$message }}</small>
                    <small v-if="error" class="p-error">{{
                            error.replace(
                                "Firebase: Error (auth/email-already-in-use).",
                                "\nThis account already exists."
                            )
                    }}</small>
                </div>
                <div class="field">
                    <div class="p-float-label">
                        <Password id="password" v-model="v$.password.$model" :class="{
                            'p-invalid': v$.password.$invalid && v$.password.$dirty,
                        }" toggleMask>
                            <template #header>
                                <h6>Pick a password</h6>
                            </template>
                            <template #footer="sp">
                                {{ sp.level }}
                                <Divider />
                                <p class="mt-2">Suggestions</p>
                                <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                    <li>At least one lowercase</li>
                                    <li>At least one uppercase</li>
                                    <li>At least one numeric</li>
                                    <li>Minimum 8 characters</li>
                                </ul>
                            </template>
                        </Password>
                        <label for="password"
                            :class="{ 'p-error': v$.password.$invalid && v$.password.$dirty }">Password*</label>
                    </div>
                    <small v-if="v$.password.$model === '' && v$.password.$dirty" class="p-error">{{
                            v$.password.required.$message.replace("Value", "Password")
                    }}</small>
                    <div>
                        <small v-if="
                            v$.password.minLength.$invalid &&
                            !v$.password.minLength.$response
                        " class="p-error">{{ v$.password.minLength.$message }}</small>
                    </div>
                </div>
                <div class="field">
                    <div class="p-float-label">
                        <Password id="confirmPassword" v-model="v$.confirmPassword.$model" :class="{
                            'p-invalid':
                                v$.confirmPassword.$invalid && v$.confirmPassword.$dirty,
                        }" toggleMask :feedback="false">
                        </Password>
                        <label for="confirmPassword" :class="{
                            'p-error':
                                v$.confirmPassword.$invalid && v$.confirmPassword.$dirty,
                        }">Confirm password*</label>
                    </div>
                    <div>
                        <small v-if="v$.confirmPassword.$model === '' && v$.confirmPassword.$dirty
                        " class="p-error">{{
        v$.confirmPassword.required.$message.replace(
            "Value",
            "Password"
        )
}}</small>
                    </div>
                    <div>
                        <small v-if="!v$.confirmPassword.sameAs.$pending && v$.confirmPassword.sameAs.$invalid &&
                            v$.confirmPassword.$dirty
                        " class="p-error">{{
        v$.confirmPassword.sameAs.$message.replace(/value/g, "password")
}}</small>
                    </div>
                </div>
                <div class="field">
                    <div class="p-float-label p-input-icon-right">
                        <i class="pi pi-user" />
                        <InputText id="name" v-model="v$.name.$model" :class="{
                            'p-invalid': v$.name.$invalid && v$.name.$dirty,
                        }" />
                        <label for="name" :class="{ 'p-error': v$.name.$invalid && v$.name.$dirty }">Name*</label>
                    </div>
                    <small v-if="
                        (v$.name.$invalid && v$.name.$dirty) || v$.name.$pending
                    " class="p-error">{{ v$.name.required.$message.replace("Value", "Name") }}</small>
                </div>
                <div class="field">
                    <div class="p-float-label">
                        <Calendar class="calenBtn" id="date" v-model="user.date" :showIcon="true" />
                        <label for="date">Birthday*</label>
                    </div>
                </div>
                <div class="field">
                    <div class="p-float-label p-input-icon-right">
                        <i class="pi pi-phone" />
                        <InputText id="phone" v-model="v$.phone.$model" :class="{
                            'p-invalid': v$.phone.$invalid && v$.phone.$dirty,
                        }" />
                        <label for="phone" :class="{
                            'p-error': v$.phone.$invalid && v$.phone.$dirty,
                        }">Phone*</label>
                    </div>
                    <small v-if="
                        (v$.phone.$invalid && v$.phone.$dirty) ||
                        v$.phone.$pending
                    " class="p-error">{{ v$.phone.required.$message.replace("Value", "Phone") }}</small>
                </div>
            </div>
            <footer>
                <label class="rememberBtn">
                    <input type="checkbox" checked name="remember" />
                    <h4>Remember me</h4>
                </label>
                <Button label="Create Account" type="submit" @click="signUp" class="signBtn" />
            </footer>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { email, required, sameAs, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useUserStore } from "../stores";

const userStore = useUserStore();
const router = useRouter();
const error = ref(null);
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
        console.log("Not valid");
        return;
    }
    try {
        await userStore.signUp(user);
        router.push("/client");
    } catch (err: any) {
        error.value = err.message;
    }
};
</script>
<style scoped>
.forBackground {
    width: 100%;
    min-height: 100vh;
    background-color: #ebd7c3;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.p-input-icon-right {
    width: 100%;
    border: none;
}

.signBtn {
    width: 150px;
    height: 45px;
    background-color: #00589B;
    border: none;
}

.field {
    margin-bottom: 1.6rem;
}

.calenBtn {
    width: 100%;
}

.container {
    padding: 26px 0 6px;
    text-align: left;
}

.rememberBtn {
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

input {
    padding-bottom: 10px;
    border: 1px solid #ccc;
}

footer {
    float: center;
    display: flex;
    justify-content: space-around;
}

@media screen and (max-width: 576px) {
    .container {
        margin: 0 15px;
    }
}
</style>