<template>
    <div class="forBackground">
        <header>
            <img src="../assets/logo.png" alt="" class="logoInner" />
            <div class="text">
                <h1>Hello, friend</h1>
                <h2>Create account to use this program</h2>
            </div>
        </header>
        <footer>
            <Button label="Sign up" type="submit" @click="signUp" class="p-button-raised p-button-danger" />
            <h2>
                Already have an account? Cool!
                <th />
                <Button label="Sing in" @click="signIn" class="signInBtn" />
                then
            </h2>
        </footer>
    </div>
</template>
 <script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const signUp = () => {
    router.push("/signUp");
};
const signIn = () => {
    router.push("/signIn");
};
</script>
<style scoped>
.forBackground {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #fa6055, rgb(250, 186, 197));
}

header {
    display: flex;
    justify-content: space-between;
}

.logoInner {
    margin-left: 20px;
}

.text {
    font-size: 30px;
    text-align: right;
    margin: 80px 180px 0 0;
}

footer {
    text-align: center;
    margin-top: 14px;
}

.p-button-danger {
    width: 180px;
    height: 30px;
    border-radius: 10px;
}

.p-button-danger:hover {
    animation: pulsate 1s ease-in-out;
}

.signInBtn {
    font-weight: 700;
    border: none;
    color: #1f2b38;
    border-radius: 10px;
    background: none;
    text-decoration: underline;
    text-decoration-color: black;
}

.signInBtn:hover {
    animation: pulsate 1s ease-in-out;
}

@keyframes pulsate {
    0% {
        box-shadow: 0 0 25px #ff755d, 0 0 50px #c2002a;
    }
}

button.p-component {
    vertical-align: inherit;
}

button.p-component:hover {
    background: none;
    border: none;
    color: #2c3e50;
}

@media screen and (max-width: 1200px) {
    .logoInner {
        width: 350px;
        height: 350px;
    }

    .text {
        margin-right: 100px;
    }
}

@media screen and (max-width: 992px) {
    .text {
        margin-right: 80px;
    }

    footer {
        margin-top: 80px;
    }
}

@media screen and (max-width: 768px) {
    .logoInner {
        margin-top: 30px;
        width: 300px;
        height: 300px;
    }

    .text {
        font-size: 27px;
        margin-right: 60px;
    }

    footer {
        margin-top: 90px;
    }
}

@media screen and (max-width: 576px) {
    header {
        flex-direction: column;
    }

    .logoInner {
        width: 200px;
        height: 200px;
    }

    .text {
        font-size: 20px;
        margin: 0 5px;
    }
}
</style>