<template>
    <div class="well">
        <h3 class="text-center">旧书信息编辑</h3>
        <br>
        <div class="col-sm-12 form-group">
            <label for="title">书名</label>
            <input type="text" v-model="book.title" id="title" class="form-control" data-bv-notempty>
        </div>
        <div class="col-sm-12 form-group">
            <label for="author">作者</label>
            <input type="text" v-model="book.author" id="author" class="form-control" data-bv-notempty>
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
            <input v-model="book.price" type="text" id="price" class="form-control" data-bv-notempty>
        </div>
        <div class="col-sm-12 form-group">
            <label for="remark">原价</label>
            <input v-model="book.old_price" id="old_price" class="form-control">
        </div>
        <div class="col-sm-12 form-group">
            <label for="remark">备注(可填写购买时间，有无破损等信息)</label>
            <textarea v-model="book.remark" id="remark" class="form-control"></textarea>
        </div>
        <div class="col-sm-12 form-group">
            <label for="price">书本图片(不更改则无需上传)</label>
            <input type="file" name="file" id="file" value="上传图片" required data-bv-notempty>
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
                    author: "",
                    seller: "",
                    remark: "",
                    old_price: "",
                    price: "",
                    state: "buyable"
                }
            }
        },
        created: function () {
            let id = this.$route.params.id;
            $.getJSON(config.root + '/books/' + id, function (book) {
                this.book = book;
            }.bind(this))
        },
        computed: {
            ...mapGetters(['user', 'token'])
        },
        methods: {
            ...mapActions(['setLoading', 'unSetLoading']),
            submit(){
                this.book.seller = this.user;

                var formData = new FormData();
                var file = $('input[name="file"]').prop('files')[0];
                formData.append("file", file);
//                if (!file) {
//                    swal('错误', "请上传图片", 'error');
//                    return;
//                }
                if (this.token) {
                    this.setLoading();
                    $.ajax({
                        method: "POST",
                        url: config.root + '/books/edit',
                        data: {book: this.book, token: this.token},
                        success: function (value) {

                            if (value.status == 'success') {
                                //上传图片
                                var name = value.id + '.jpg';
                                name = 'book_img/' + name;

                                formData.append("key", name);
                                formData.append("token", value.upload_token);
                                if (file) {
                                    $.ajax({
                                        url: 'http://up.qiniu.com',
                                        type: 'POST',
                                        data: formData,
                                        cache: false,
                                        contentType: false,
                                        processData: false,
                                        success: function () {
                                            this.unSetLoading();
                                            this.$router.push('/market');
                                            swal('成功', '编辑成功', 'success');
                                        }.bind(this)
                                    });
                                } else {
                                    this.unSetLoading();
                                    this.$router.push('/market');
                                }

                            } else {
                                this.unSetLoading();
                                swal('编辑失败', value.error, 'error');
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
