<template>
    <div class="login-box well">
        <h4 class="text-center">Good Buy Books <small>旧书回流</small></h4>
        <ul>
            <li>本项目由竺可桢学院学生会推出，旨在为全校同学们提供一个出售图书的线上平台。</li>
            <li>本项目为公益项目，只为同学们提供买卖双方的联系方式，价格、取货等具体事宜可自行联系交易对方。</li>
            <li>书本边框颜色代表书本的状态：<br><span style="color:rgba(33, 150, 243, 1)">蓝色</span>代表可购买；<br><span style="color:rgb(243, 54, 59)">红色</span>代表已下单，但交易未完成；<br><span style="color:rgb(75, 175, 80)">绿色</span>代表已完成交易；<br></li>
            <li>在交易完成后，买卖双方均可在书本界面点击完成交易。</li>
            <li>你也可以随时删除自己的书本。</li>
            <li>那么，我们开始吧！</li>
        </ul>
        <div class="text-center">
        <button class="btn btn-primary" @click="$router.push('/market')">进入市场</button>
        </div>
    </div>
</template>


<style>
</style>
