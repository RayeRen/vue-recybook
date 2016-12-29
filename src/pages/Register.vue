<template>
    <div class="well well-lg">
        <div class="col-sm-12 form-group">
            <label for="username">学号(账号)</label>
            <input v-model="user.username" type="text" name="username" class="form-control">
        </div>
        <div class="col-sm-12 form-group">
            <label for="password">密码</label>
            <input v-model="user.password" type="password" name="password" class="form-control">
        </div>
        <div class="col-sm-12 form-group">
            <label for="confirm">确认密码</label>
            <input v-model="user.confirm" type="password" name="confirm" class="form-control">
        </div>
        <div class="col-sm-12 form-group">
            <label for="name">姓名</label>
            <input v-model="user.name" name="name" type="text" class="form-control">
        </div>
        <div class="col-sm-12 form-group">
            <label for="phone">手机号</label>
            <input v-model="user.phone" name="phone" type="text" class="form-control">
        </div>
        <div class="col-sm-12 form-group">
            <label for="qq">QQ</label>
            <input v-model="user.qq" name="qq" type="text" class="form-control">
        </div>
        <div class="col-sm-12 form-group">
            <label for="dorm">寝室号</label>
            <input v-model="user.dorm" type="text" name="dorm" class="form-control">
        </div>
        <div class="text-center">
            <router-link class="btn btn-default" to="/login">返回</router-link>
            <input type="submit" class="btn btn-primary" value="注册" @click="submit()">
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default{
        data(){
            return {
                user: {
                    username: '',
                    password: '',
                    confirm: '',
                    name: '',
                    phone: '',
                    qq: '',
                    dorm: ''
                }
            }
        },
        methods: {
            ...mapActions(['register']),
            submit(){
                var user = this.user;
                this.register(user);
            }
        }
    }


</script>
<style>
</style>
