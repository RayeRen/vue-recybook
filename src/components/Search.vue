<template>
    <div class="panel panel-success">
        <div class="panel-heading">
            <h3 class="panel-title">书本筛选</h3>
        </div>
        <div class="panel-body">
            <div class="col-sm-12">
                <div class="row">
                    <div class="form-group col-sm-6">
                        <label for="book_name">书名搜索</label>
                        <input class="form-control" type="text" v-model="filter.searchText" id="book_name">
                    </div>
                    <div class="form-group col-sm-6">
                        <label for="order">排序</label>
                        <select class="form-control" id="order" v-model="filter.order">
                            <option value="time">发布时间最新</option>
                            <option value="price">价格从低到高</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row text-center">
                <button @click="$dispatch('fetch')" class="btn btn-primary">搜索</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props: ['filter'],
    }
</script>

<style>
</style>
