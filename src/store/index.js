import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import global from './modules/global'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    getters,
    modules: {
        global,
    },
    strict: debug
})
