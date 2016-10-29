<template>
    <div>
        <template v-for="book in books">
            <div class="col-md-4 ">
                <router-link :to="'/book/'+book.id" tag='div' class="col-xs-12 text-left book-box">
                    <div class="col-xs-5"><img :src="book.pic" class="img-responsive center-block book-pic"/></div>
                    <div class="col-xs-7"><h5>{{book.title}}</h5>
                        <p>
                            <span class="item-price">{{book.price}} 元</span>
                        </p></div>
                </router-link>
            </div>
        </template>
    </div>
</template>

<style>
    .book-box {
        border: solid 2px rgba(33, 150, 243, 1);
        border-radius: 5px;
        padding: 10px;
        height:auto;
        margin-bottom: 10px;
        background-color: white;
    }

    .book-pic {
        border: solid 1px rgb(213, 220, 220);
        border-radius: 5px;
    }

    .item-state {
        font-size: 1.2em;
        color: rgba(76, 175, 80, 1);
    }

    .item-price {
        font-size: 1.5em;
    }
</style>

<style>

</style>

<script>
    export default{
        data(){
            return {}
        },
        props: ['books'],
    }
</script>

