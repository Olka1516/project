import axios from "axios";

export default {
    decrease({ commit }) {
        commit("decrease");
    },
    async set8({ commit }) {
        const response = await axios.get('http://localhost:3000/set8')
        commit('set8', response.data);

    },
    async set12({ commit }) {
        const response = await axios.get('http://localhost:3000/set12')
        commit('set12', response.data);
    },
    async signUp({ commit }, name) {
        await axios.post("http://localhost:3000", name)
            .then((response) => {
                commit('signUp', response.data);
            })
    },
    async signIn({ commit }) {
        const response = await axios.get("http://localhost:3000/email")
        commit('signIn', response.data);
    }
}