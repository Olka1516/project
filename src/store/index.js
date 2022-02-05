import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'


const store = createStore({
    state: {
        count: 1,
        name: "User",
    },
    mutations,
    actions,
})

export default store

