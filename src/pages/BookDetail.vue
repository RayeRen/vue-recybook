<template>
    <div class="well">
        <div class="row">
            <div class="col-md-4 col-sm-12 col-md-offset-2 ">
                <img :src="pic_url" class="img-responsive center-block book-pic" alt="图片加载中"/>
            </div>
            <div class="col-md-4 col-sm-12">
                <p class="book-title">{{book.title}} </p>
                <p class="book-info">作者：{{book.author}}</p>
                <p class="book-info">价格：{{book.price}}元</p>
                <p class="book-info">原价：{{book.old_price}}元</p>
                <p class="book-info">备注：{{book.remark}}</p>
                <!--<p class="book-info">状态：<span v-html="stateToChinese"></span></p>-->
                <!--<div v-if="book.seller.id!=user.id">-->
                <div>
                <!--<div v-if="book.seller.id!=user.id">-->
                    <p class="book-info">卖方：{{book.seller.name}}</p>
                    <p class="book-info">卖方手机号码：{{book.seller.phone}}</p>
                    <p class="book-info">卖方QQ：{{book.seller.qq}}</p>
                </div>
                <div v-if="book.buyer.name!='' && book.seller && book.seller.id==user.id">
                    <p class="book-info">买方：{{book.buyer.name}}</p>
                    <p class="book-info">买方手机号码：{{book.buyer.phone}}</p>
                    <p class="book-info">买方QQ：{{book.buyer.qq}}</p>
                </div>
                <br>
                <div class="btn-group">

                    <a class="btn btn-primary" @click="edit(book)" v-if="book.seller.id == user.id ">编辑</a>　
                    <a class="btn btn-primary" @click="buy(book)" v-if="book.seller.id != user.id &&book.state == 'buyable' ">购买</a>　
                    <a class="btn btn-success"
                       v-if="book.state == 'selling' && (book.seller.id == user.id || book.buyer && book.buyer.id == user.id) "
                       @click="finishTrade(book)">点击完成交易</a>
                    <a class="btn btn-danger" v-if="book.seller.id == user.id" @click="deleteBook(book)">删除</a>
                    <a class="btn btn-default" @click="$router.back()">返回</a>
                </div>

            </div>
        </div>
    </div>
</template>


<style scoped>
    .book-title {
        font-size: 1.5em;
        color: #6c6c6c;
    }

    .book-info {

    }

    .book-pic{
        border: solid 1px rgb(213, 220, 220);
        border-radius: 5px;
    }
</style>


<script>
    import {config} from '../utils/config'
    import {mapGetters, mapActions} from 'vuex';

    export default {
        data(){
            return {
                book: {
                    id:'',
                    title: '',
                    state: '',
                    price: '',
                    author: '',
                    remark: '',
                    old_price: '',
                    seller: {
                        name: '',
                        phone: '',
                        qq: ''
                    },
                    buyer: {
                        name: '',
                        phone: '',
                        qq: ''
                    }
                },
                pic_url:''
            }
        },
        computed: {
            ...mapGetters(['user', 'token']),
        },
        created(){
            let id = this.$route.params.id;
            $.getJSON(config.root + '/books/' + id, function (book) {
                this.book = book;
                this.pic_url='http://book.ckcsu.com/book_img/'+this.book.id+'.jpg?imageView2/1/w/250/h/370/interlace/0/q/100';
            }.bind(this))
        },
        methods: {
            ...mapActions(['setLoading', 'unSetLoading']),
            edit(book){
                this.$router.push("/edit/"+book.id);
            },
            buy(book){
                let context = this;
                swal({
                            title: "购买确认",
                            text: "你确定要购买吗？",
                            type: "success",
                            showCancelButton: true,
                            confirmButtonColor: "#22AA55",
                            confirmButtonText: "购买",
                            closeOnConfirm: false
                        },
                        function () {
                            this.book = changeState({
                                book: book,
                                method: 'buy',
                                newState: 'selling',
                                msg: {
                                    title: '下单成功！',
                                    content: '请尽快与卖方联系，购买完毕后请到我的交易中点击完成交易！',
                                }
                            }, context)
                        });
            },
            finishTrade(book){
                let context = this;
                swal({
                            title: "交易完成确认",
                            text: "你确定交易已完成吗？",
                            type: "success",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "完成",
                            closeOnConfirm: false
                        },
                        function () {
                            this.book = changeState({
                                book: book,
                                method: 'confirm',
                                newState: 'sold',
                                msg: {
                                    title: '完成交易成功！',
                                    content: '感谢使用旧书回流系统！',
                                }
                            }, context)
                        });
            },
            deleteBook(book){
                swal({
                            title: "删除",
                            text: "你确定要删除吗？",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "删除",
                            closeOnConfirm: false
                        },
                        function () {
                            $.ajax({
                                url: config.root + '/books/' + book.id + '/delete',
                                data: {book: JSON.stringify(book), token: this.token},
                                method: "POST",
                                success: function (value) {
                                    this.unSetLoading();
                                    if (value.status == 'success') {
                                        swal("删除成功!", "该书已从书架中删除", "success");
                                        this.$router.push('/market');
                                    } else {
                                        swal('出错', value.error, 'error');
                                    }
                                }.bind(this),
                                error: function (error) {
                                    this.unSetLoading();
                                    swal('未知错误', error, 'error');
                                }
                            });
                        }.bind(this))
            },

        }
    }

    function changeState(obj, context) {
        var token = localStorage.getItem('recybook_token');
        $.ajax({
            url: config.root + '/books/' + obj.book.id + '/' + obj.method,
            data: {token: token},
            method: "POST",
            success: function (value) {
                context.unSetLoading();
                if (value.status == 'success') {
                    obj.book.buyer = context.user;
                    obj.book.state = obj.newState;
                    context.$router.push('/my_trade');
                    swal(obj.msg.title, obj.msg.content, "success");
                } else {
                    swal('出错', value.error, 'error');
                }
            },
            error: function (error) {
                context.unSetLoading();
                swal('未知错误', error, 'error');
                console.log(error);
            }
        });
        return obj.book;
    }
</script>
