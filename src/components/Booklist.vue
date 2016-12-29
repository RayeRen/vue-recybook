<template>
    <div>
        <template v-for="book in books">
            <div class="col-md-4">
                <router-link :to="'/book/'+book.id" tag='div' class="col-xs-12 text-left book-box"
                             :class="[book.state=='buyable'?'border-blue':book.state=='selling'?'border-red':'border-green']">
                    <div class="col-xs-5"><img
                            :src="'http://book.ckcsu.com/book_img/'+book.id+'.jpg?imageView2/1/w/100/h/120/interlace/0/q/100'"
                            class="img-responsive center-block book-pic"/></div>
                    <div class="col-xs-7">
                        <div class="title">{{book.title}}</div>
                        <div v-if="book.old_price!=0" class="item-price">价格/原价<br>{{book.price}}/{{book.old_price}} 元
                        </div>
                        <div v-else class="item-price">价格:{{book.price}} 元</div>
                    </div>
                </router-link>
            </div>
        </template>
    </div>
</template>

<style>
    .border-blue {
        border: solid 2px rgba(33, 150, 243, 1);
    }

    .border-red {
        border: solid 2px rgb(243, 54, 59);
    }

    .border-green {
        border: solid 2px rgb(75, 175, 80);
    }

    .book-box {
        border-radius: 5px;
        padding: 10px;
        height: 150px;
        margin-bottom: 10px;
        background-color: white;
    }


    .book-pic {
        border: solid 1px rgb(213, 220, 220);
        border-radius: 5px;
    }

    .item-state {
        font-size: 1em;
        color: rgba(76, 175, 80, 1);
    }

    .item-price {
        margin-top: 1px;
        font-size: 1.2em;
        color: #2196f3;
    }

    .title {
        font-size: 1.2em;
    }


    @media (max-width: 768px) {
        .book-box {
            height: auto;
        }
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

