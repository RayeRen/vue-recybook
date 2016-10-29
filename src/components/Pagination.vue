<template>
    <div class="text-center">
        <ul class="pagination">
            <li :class="{'disabled':filter.page==1}"><a href="#" @click="changePage(filter.page-1)">&laquo;</a>
            </li>
            <li :class="{'active':1==filter.page}"><a href="#" @click="changePage(1)">1</a>
            <li v-for="page in pages" :class="{'active':page==filter.page}"><a href="#" @click="changePage(page)">{{page}}</a>
            </li>
            <li><a href="#" @click="changePage(filter.page+1)">&raquo;</a></li>
        </ul>
    </div>
</template>
<script>
    export default{
        props:['filter','pages','page_number'],
        methods:{
            changePage:function (page) {
                if (page > 0 && page <= this.page_number) {
                    this.filter.page = page;
                    this.$emit('fetch');
                }
            }
        }
    }
</script>
