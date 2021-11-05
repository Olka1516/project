import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'

const store = createStore({
    state: {
        count: 8
    },
    mutations,
    actions,
    getters: {
        decrease(state) {
            return state.count > 0 ? state.count-- : 0;
        },
    }
})

export default store

