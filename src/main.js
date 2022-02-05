import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Vuex from 'vuex'
import store from './store'
import { i18n } from './lang'
import axios from 'axios'
import VueAxios from 'vue-axios'
import firebase from "firebase";

// var firebaseConfig = {
//     apiKey: "AIzaSyBMun7Tlq0vuDG4k25GQdXh716t-1AwJvY",
//     authDomain: "gfamily-40b6e.firebaseapp.com",
//     projectId: "gfamily-40b6e",
//     storageBucket: "gfamily-40b6e.appspot.com",
//     messagingSenderId: "79293193359",
//     appId: "1:79293193359:web:b5e370625d39894e35a4fa",
//     measurementId: "G-0Z1DMMLLHZ"
// };

// const firebaseConfig = {
//     apiKey: "",
//     authDomain: "",
//     projectId: "",
//     storageBucket: "",
//     messagingSenderId: "",
//     appId: "",
//   };

firebase.initializeApp({apiKey: "AIzaSyBMun7Tlq0vuDG4k25GQdXh716t-1AwJvY",
    authDomain: "gfamily-40b6e.firebaseapp.com",
    projectId: "gfamily-40b6e",
    storageBucket: "gfamily-40b6e.appspot.com",
    messagingSenderId: "79293193359",
    appId: "1:79293193359:web:b5e370625d39894e35a4fa",
    measurementId: "G-0Z1DMMLLHZ"});


createApp(App).use(VueAxios, axios).use(i18n).use(PrimeVue).use(router).use(Vuex).use(store).mount('#app')
