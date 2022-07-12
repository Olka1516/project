<template>
    <div class="forBackground">
        <div class="background">
            <header>
                <img src="../assets/logo.png" alt="" class="logoInner" />
                <div class="text">
                    <h1>{{ t('welcome') }}</h1>
                    <h2>{{ t('createAccount') }}</h2>
                </div>
            </header>
            <footer>
                <Button :label="t('signUpBtn')" type="submit" @click="signUp" class="mainButton" />
                <h2>
                    {{ t('signIn') }}
                    <th />
                    <Button :label="t('signInBtn')" @click="signIn" class="signInBtn" />
                    {{ t('then') }}
                </h2>
            </footer>
        </div>
    </div>
</template>
 <script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();
const signUp = () => {
    router.push("/signUp");
};
const signIn = () => {
    router.push("/signIn");
};
</script>
<style scoped>
@import "@/assets/welcomePageStyle.css";
</style>