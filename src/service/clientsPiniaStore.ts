import { getClients } from "./firebaseService"
import { defineStore } from 'pinia'
import { reactive, toRefs } from "vue";

export interface StoreClients {
    count: number;
    name: string;
    phone: string;
    role: string;
    date: Date;
    email: string;
    inTrainings: string;
}

export interface State {
    storeClients: StoreClients[]
}

export const useClientsStore = defineStore('clients', () => {
    let state: State = reactive({
        storeClients: []
    })

    const fetchClients = async () => {
        const clients = await getClients();
        state.storeClients = clients;
    }

    return {
        ...toRefs(state),
        fetchClients
    }
})