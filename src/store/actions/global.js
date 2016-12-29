import * as types from '.././mutation-types'
import router from '../../router'


var root = 'http://ckcsu.com/recybook_api';

export function init({commit}) {
    let token = localStorage.getItem('recybook_token');
    commit(types.SET_TOKEN, token);
    if (token) {
        commit(types.SET_LOADING);
        $.get(root + '/get_user?token=' + token, function (value) {
            commit(types.UNSET_LOADING);
            if (value.status == 'success') {
                value.token = token;
                return commit(types.INIT_USER, value);
            } else {
                console.log(value);
            }
        })
    }
}

export function login({commit}, data) {
    commit(types.SET_LOADING);

    $.ajax({
        // method: "get",
        url: root + '/login?username=' + data.username + '&password=' + data.password,
        // data: {user: JSON.stringify(user)},
        success: function (value) {
            if (value.status == 'success') {
                commit(types.LOGIN, value);
                router.push('/help');
            } else {
                swal('登陆失败', '账号或密码错误', 'error');
            }
            commit(types.UNSET_LOADING)
        }.bind(this),
        error: (error)=> {
            swal('未知错误', "请检查网络，或者联系管理员", 'error');
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
                    router.push('/market');
                    commit(types.UNSET_LOADING);
                    return commit(types.REGISTER, value);
                } else {
                    swal('注册失败', value.error, 'error');
                }
                commit(types.UNSET_LOADING);
            }.bind(this),
            error: (error)=> {
                console.log(error)
            }
        });
    } else {
        swal('注册失败', '两次密码输入不同', 'error');
        commit(types.UNSET_LOADING)
    }

}

export function editUser({commit}, user) {
    commit(types.SET_LOADING);
    if (user.password == user.confirm) {
        $.ajax({
            method: "POST",
            url: root + '/edit_user',
            data: {user: JSON.stringify(user), token: localStorage.getItem('recybook_token')},
            success: function (value) {
                if (value.status == 'success') {
                    router.push('/market');
                    swal('修改成功', '个人信息修改成功', "success");
                    return commit(types.EDIT_USER, value);
                } else {
                    swal('修改失败', value.error, 'error');
                }
                commit(types.UNSET_LOADING)
            }.bind(this),
            error: (error)=> {
                console.log(error)
            }
        });
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
