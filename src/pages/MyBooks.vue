<template>
    <div>
        <Search :filter.sync="filter" @fetch='fetch'></Search>
        <br>
        <div class="row text-center">
            <Booklist :books="books"></Booklist>
        </div>
        <div class="row">
            <Pagination :filter.sync="filter" :pages="pages" :page_number="page_number" @fetch='fetch'></Pagination>
        </div>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import {config} from '../utils/config'
    import Booklist from '../components/Booklist.vue'
    import Search from '../components/Search.vue'
    import Pagination from '../components/Pagination.vue'

    export default {
        components: {
            Booklist, Search, Pagination
        },
        data(){
            return {
                filter: {
                    searchText: '',
                    order: 'time',
                    page: 1
                },
                page_number: 0,
                pages: [],
                books: [],
            }
        },
        mounted(){
            this.fetch();
        },
        computed:{
            ...mapGetters(['token'])
        },
        methods: {
            ...mapActions(['setLoading', 'unSetLoading']),
            fetch(){
                this.setLoading();
                $.ajax({
                    method: "POST",
                    url: config.root + '/books',
                    data: {type: 'my_books', filter: this.filter, token: this.token},
                    success: function (value) {
                        this.unSetLoading();
                        if (value.status == 'success') {
                            this.page_number = value.page_number;
                            this.books = value.books;
                            this.pages = [];
                            for (var i = Math.max(this.filter.page - 2, 2); i <= Math.min(this.filter.page + 2, this.page_number); i++) {
                                this.pages.push(i);
                            }
                        } else {
                            swal('加载失败', value.error, 'error');
                            console.log(value);
                        }
                    }.bind(this),
                    error: (error)=> {
                        this.unSetLoading();
                        console.log(error)
                    }
                })
            },
        }
    }

</script>

<style scoped>

</style>
