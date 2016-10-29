<template>
    <div class="well well-lg">
        <div class="row">
            <div class="text-center">
                <button class="btn btn-danger" @click="logout()">注销</button>
            </div>
        </div>
        <br>
        <h4 class="text-center">个人信息修改</h4>
        <form id="info-form">
            <div class="col-sm-12 form-group">
                <label for="password">密码（若要修改密码请填写，否则留空）</label>
                <input v-model="user.password" type="password" name="password" class="form-control">
            </div>
            <div class="col-sm-12 form-group">
                <label for="confirm">确认密码（若要修改密码请填写，否则留空）</label>
                <input v-model="user.confirm" type="password" name="confirm" class="form-control">
            </div>
            <div class="col-sm-12 form-group">
                <label for="name">姓名</label>
                <input v-model="user.name" name="name" type="text" class="form-control" data-bv-notempty>
            </div>
            <div class="col-sm-12 form-group">
                <label for="phone">手机号</label>
                <input v-model="user.phone" name="phone" type="text" class="form-control" data-bv-notempty>
            </div>
            <div class="col-sm-12 form-group">
                <label for="qq">QQ</label>
                <input v-model="user.qq" name="qq" type="text" class="form-control" data-bv-notempty>
            </div>
            <div class="col-sm-12 form-group">
                <label for="dorm">寝室号</label>
                <input v-model="user.dorm" type="text" name="dorm" class="form-control" data-bv-notempty>
            </div>
            <div class="text-center">
                <router-link class="btn btn-default" :to="'/market'">返回</router-link>
                <button class="btn btn-primary" id="contfirm-btn" type="submit" @click.stop="Fnsubmit">修改</button>
            </div>
        </form>
    </div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default{
        data(){
            return {
                user: {
                    name: '',
                    password: '',
                    confirm: '',
                    phone: '',
                    qq: '',
                    dorm: '',
                }
            }
        },
        mounted(){
            $(function () {
                this.user.name = this.stateUser.name;
                this.user.phone = this.stateUser.phone;
                this.user.qq = this.stateUser.qq;
                this.user.dorm = this.stateUser.dorm;
                $('#info-form').bootstrapValidator();
            }.bind(this));
        },
        created(){
        },
        methods: {
            ...mapActions(['logout', 'editUser']),
            Fnsubmit:function(event){
                $('#info-form').data('bootstrapValidator').validate();
                if ($('#info-form').data('bootstrapValidator').isValid()) {
                    swal('修改成功', '个人信息修改成功', "success");
                    this.editUser(this.user).then($('#info-form').data('bootstrapValidator').validate())
                }
                $('#info-form').data('bootstrapValidator').resetForm();
            },
        },
        computed: {
            ...mapGetters({stateUser: 'user'})
        }
    }

</script>

<style scoped>
</style>
