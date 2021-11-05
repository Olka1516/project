import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Vuex from 'vuex'
import store from './store'

createApp(App).use(PrimeVue).use(router).use(Vuex).use(store).mount('#app')
