import * as types from '../mutation-types'
import * as actions from '../actions/global'
import ls from 'store2'


const state = {
    isLogin: false,
    isLoading: false,
    user:{},
    token:''
}

const mutations = {
    [types.INIT_USER](state, body){
        state.user = body.user;
        state.isLogin = true;
    },
    [types.LOGIN](state, body){
        delete body.user['password'];
        state.user = body.user;
        state.isLogin = true;
        state.token = body.token;
        ls.set('recybook_token', body.token);
    },
    [types.REGISTER](state, body){
        delete body.user['password'];
        state.user = body.user;
        state.isLogin = true;
        state.token = body.token;
        ls.set('recybook_token', body.token);

    },
    [types.LOGOUT](state){
        state.token = '';
        state.isLogin = false;
    },
    [types.EDIT_USER](state, body){
        delete body.user['password'];
        state.user = body.user;
    },
    [types.SET_LOADING](state){
        state.isLoading=true;
    },
    [types.UNSET_LOADING](state){
        state.isLoading=false;
    }
}

export default {
    state,
    actions,
    mutations
}
