<template>
    <div>
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">{{title}}</a>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" v-show="isLogin">
                    <ul class="nav navbar-nav">
                        <li>
                            <router-link :to="{ path: '/market', activeClass: 'active' }">市场</router-link>
                        </li>
                        <li>
                            <router-link :to="{ path: '/release', activeClass: 'active' }">我要卖书</router-link>
                        </li>
                        <li>
                            <router-link :to="{ path: '/my_book', activeClass: 'active' }">我的旧书</router-link>
                        </li>
                        <li>
                            <router-link :to="{ path: '/my_trade', activeClass: 'active' }">我的交易</router-link>
                        </li>
                        <li>
                            <router-link :to="{ path: '/admin', activeClass: 'active' }">个人中心</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="container">
            <div class="col-sm-12">
                <transition name="fade">
                    <router-view></router-view>
                </transition>
            </div>
        </div>

        <div class="preloader" :class="{ 'preloader-active':isLoading }">
            <div class="loading-icon">
                <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw preloader-wrapper"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    //    import $ from 'jquery'

    export default{
        methods: {
            ...mapActions([
                'init' // map this.increment() to this.$store.dispatch('increment')
            ]),
        },
        mounted(){
            this.init();
            $(".nav > li > a").click(function(){
                $('#collapse').addClass("collapsed");
                $('#collapse').attr("aria-expanded",false);
                $("#bs-example-navbar-collapse-1").removeClass("in");
                $("#bs-example-navbar-collapse-1").attr("aria-expanded",false);
            });
        },
        computed: {
            title: function () {
                let title = '';
                switch (this.$route.path) {
                    case '/login':
                        title = '登陆';
                        break;
                    case '/register':
                        title = '注册';
                        break;
                    case '/market':
                        title = '市场';
                        break;
                    case '/my_book':
                        title = '我的旧书';
                        break;
                    case '/release':
                        title = '我要卖书';
                        break;
                    case '/my_trade':
                        title = '我的交易';
                        break;
                    case '/admin':
                        title = '个人中心';
                        break;
                    default :
                        title = '旧书回流';
                        break;
                }
                return title;
            },
            ...mapGetters([
                'isLoading', 'isLogin'
            ])
        }
    }


</script>

<style scope>
    .preloader {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.2);
        height: 100%;
        display: none;
        z-index: 9999;
    }

    .preloader-active {
        display: inline-block;
    }

    .loading-icon {
        position: fixed;
        top: calc(50% - 32px);
        left: calc(50% - 32px);
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s ease
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }

</style>
