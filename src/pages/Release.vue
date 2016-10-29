<template>
    <div class="well">
        <h3 class="text-center">旧书信息填写</h3>
        <br>
        <div class="col-sm-12 form-group">
            <label for="title">书名</label>
            <input type="text" v-model="book.title" id="title" class="form-control">
        </div>
        <div class="col-sm-12 form-group">
            <label for="author">作者</label>
            <input type="text" v-model="book.author" id="author" class="form-control">
        </div>
        <!--<div class="col-sm-12 form-group">-->
        <!--<form method="post" action="http://upload.qiniu.com/"-->
        <!--enctype="multipart/form-data" v-form name="myform">-->
        <!--<input name="key" type="hidden" value="<resource_key>">-->
        <!--<input name="token" type="hidden" value="<upload_token>">-->
        <!--<input name="file" type="file"/>-->
        <!--</form>-->
        <!--</div>-->

        <div class="col-sm-12 form-group">
            <label for="price">价格</label>
            <input v-model="book.price" type="text" id="price" class="form-control">
        </div>
        <button class="btn btn-primary" @click="submit()">发布</button>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import {config} from "../utils/config";

    export default {
        data(){
            return {
                book: {
                    pic: "",
                    title: "",
                    auther: "",
                    seller: "",
                    price: "",
                    state: "buyable"
                }
            }
        },
        computed:{
            ...mapGetters(['user','token'])
        },
        methods: {
            ...mapActions(['setLoading', 'unSetLoading']),
            submit(){
                this.setLoading();
                this.book.seller = this.user;
                if(this.token){
                    $.ajax({
                        method: "POST",
                        url: config.root + '/books/add',
                        data: {book: book, token: this.token},
                        success: function (value) {
                            this.unSetLoading();
                            if (value.status == 'success') {
                                this.$route.push('/market');
                                swal('发布交易成功', '请耐心等待买家', 'success');
                            } else {
                                swal('发布交易失败', value.error, 'error');
                            }
                        }.bind(this),
                        error: function (error) {
                            this.unSetLoading();
                            console.log(error);
                        }
                    })
                }


            }
        }
    }
</script>

<style scoped>
</style>
