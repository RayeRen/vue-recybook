import * as types from '.././mutation-types'
import router from '../../router'
import ls from 'store2'


var root = 'http://ckcsu.sparker.top/recybook_api';

export function init({commit}) {
    let token=ls.get('recybook_token');
    if (token) {
        commit(types.SET_LOADING);
        $.get(root + '/get_user?token=' + token, function (value) {
            commit(types.UNSET_LOADING);
            if (value.status == 'success') {
                return commit(types.INIT_USER, value);
            } else {
                console.log(value);
            }
        })
    }
}

export function login({commit}, data) {
    console.log(data.password);
    commit(types.SET_LOADING);
    $.get(root + '/login?username=' + data.username + '&password=' + data.password, function (value) {
        commit(types.UNSET_LOADING);
        if (value.status == 'success') {
            commit(types.LOGIN, value);
            router.push('/market');
        } else {
            console.log(value);
        }
    });
}

export function register({commit}, user) {
    commit(types.SET_LOADING);
    if (user.password == user.confirm) {
        $.ajax({
            method: "POST",
            url: root + '/register',
            data: {user: JSON.stringify(user)},
            success: function (value) {
                if (value.status == 'success') {
                    this.$route.go('/market');
                    return commit(types.REGISTER, value);
                } else {
                    swal('注册失败', value.error, 'error');
                }
            }.bind(this),
            error: (error)=> {
                console.log(error)
            }
        }).then(commit(types.UNSET_LOADING));
    } else {
        swal('注册失败', '两次密码输入不同', 'error');
        commit(types.UNSET_LOADING)
    }

}

export function editUser({commit}, user) {
    commit(types.SET_LOADING);
    if (user.password ==user.confirm) {
        $.ajax({
            method: "POST",
            url: root + '/edit_user',
            data: {user: JSON.stringify(user)},
            success: function (value) {
                if (value.status == 'success') {
                    router.push('/market');
                    return commit(types.EDIT_USER, value);
                } else {
                    swal('修改失败', value.error, 'error');
                }
            }.bind(this),
            error: (error)=> {
                console.log(error)
            }
        }).then(commit(types.UNSET_LOADING));
    } else {
        swal('修改失败', '两次密码输入不同', 'error');
        commit(types.UNSET_LOADING)
    }
}

export function logout({commit}) {
    router.push('/login');
    commit(types.LOGOUT);
}


export function setLoading({commit}) {
    commit(types.SET_LOADING)
}

export function unSetLoading({commit}) {
    commit(types.UNSET_LOADING)
}
