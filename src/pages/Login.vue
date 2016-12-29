<template>
    <div class="login-box well">
        <h3 class="text-center">Good Buy Books<br>
            <small>登陆</small>
        </h3>
        <div class="text-center">
            <a class="btn btn-success btn-lg" @click="$router.push('market')">先逛一圈</a><br><br>
        </div>
        <div class="col-sm-12 form-group">
            <label for="username">学号(账号)</label>
            <input type="text" v-model="username" id="username" class="form-control">
        </div>
        <div class="col-sm-12 form-group">
            <label for="password">密码</label>
            <input v-model="password" type="password" id="password" class="form-control">
        </div>
        <div class="text-center">
            <a class="btn btn-primary btn-lg" @click="submit">登陆</a>
            <router-link class="btn btn-default btn-lg" to="/register">注册</router-link>
        </div>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default{
        data(){
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            ...mapActions(['login']),
            submit(){
                this.login({username: this.username, password: this.password, context: this});
            }
        }
    }

</script>

<style>
</style>
