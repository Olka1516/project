<template>
    <div class="forBackground">
        <div class="container">
            <Toast />
            <h1>Reset password</h1>
            <h2>Будь ласка, напишіть свій емейл, щоб відновити пароль.</h2>
            <hr />
            <header>
                <div class="field">
                    <div class="p-float-label p-input-icon-right">
                        <i class="pi pi-envelope" />

                        <InputText id="email" v-model="v$.userEmail.$model" :class="{
                            'p-invalid':
                                (v$.userEmail.$invalid && v$.userEmail.$dirty) ||
                                error === 'Firebase: Error (auth/user-not-found).',
                        }" aria-describedby="email-error" />

                        <label for="email" :class="{
                            'p-error':
                                (v$.userEmail.$invalid && v$.userEmail.$dirty) ||
                                error === 'Firebase: Error (auth/user-not-found).',
                        }">Email*</label>
                    </div>
                    <span v-if="
                        (v$.userEmail.$error && v$.userEmail.$dirty) ||
                        error === 'Firebase: Error (auth/user-not-found).'
                    ">
                        <span id="email-error" v-for="(error, index) of v$.userEmail.$errors" :key="index">
                            <small class="p-error">{{ error.$message }}</small>
                        </span>
                    </span>
                    <small v-else-if="
                        (v$.userEmail.$invalid && v$.userEmail.$dirty) ||
                        v$.userEmail.$pending
                    " class="p-error">{{ v$.userEmail.required.$message }}</small>
                    <small v-if="error === 'Firebase: Error (auth/user-not-found).'" class="p-error">{{
                            error.replace(
                                "Firebase: Error (auth/user-not-found).",
                                "\nEmail is incorrect. Please try again."
                            )
                    }}</small>
                </div>
            </header>
            <Button class="resetBtn" type="submit" @click="resetPas" label="Reset" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useUserStore } from "../stores";
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

const userStore = useUserStore();
const toast = useToast();
const error = ref(null);
const userEmail = ref("");

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
</script>
<style scoped>
.forBackground {
    width: 100%;
    min-height: 100vh;
    background-color: #ebd7c3;
    display: inline-flex;
    justify-content: center;
    text-align: center;
}

input {
    padding-bottom: 10px;
    border: 1px solid #ccc;
}

header {
    padding: 26px 0 6px;
    text-align: left;
}

.resetBtn {
    margin: 5px 0 18px 0;
    padding: 8px 50px;
    background-color: #00589B;
    border: none;
}

.field {
    margin-bottom: 1.6rem;
}

.p-input-icon-right {
    width: 100%;
    border: none;
}
</style>