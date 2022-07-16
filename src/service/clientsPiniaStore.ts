import { getClients } from "./firebaseService"
import { defineStore } from 'pinia'
import { reactive, toRefs } from "vue";

export interface Client {
    count: number;
    name: string;
    phone: string;
    role: string;
    date: Date;
    email: string;
    inTrainings: string;
}

export const useClientsStore = defineStore('clients', () => {
    let state: {storeClients: Client[] | undefined} = reactive({
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