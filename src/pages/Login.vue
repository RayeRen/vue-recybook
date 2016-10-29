<template>
    <div class="login-box well">
        <div class="col-sm-12 form-group">
            <label for="username">用户名</label>
            <input type="text" v-model="username" id="username" class="form-control">
        </div>
        <div class="col-sm-12 form-group">
            <label for="password">密码</label>
            <input v-model="password" type="password" id="password" class="form-control">
        </div>
        <a class="btn btn-primary" @click="submit">提交</a>
        <router-link class="btn btn-primary" to="'/register'">注册</router-link>
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
        methods:{
            ...mapActions(['login']),
            submit(){
                this.login({username:this.username,password:this.password,context:this});
            }
        }
    }

</script>

<style>
</style>
