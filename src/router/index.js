import Vue from 'vue'
import VueRouter from 'vue-router'
import ls from 'store2'

import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Market from '../pages/Market.vue'
import Release from '../pages/Release.vue'
import Admin from '../pages/Admin.vue'
import BookDetail from '../pages/BookDetail.vue'

Vue.use(VueRouter)

const scrollBehavior = to => {
    const position = {}
    if (to.hash) {
        position.selector = to.hash
    }
    if (to.matched.some(mm => mm.meta.scrollToTop)) {
        position.x = 0
        position.y = 0
    }
    return position
}

const auth = (to, from, next) => {
    var token = ls.get('recybook_token')
    if (!token) {
        next('/login')
    } else {
        next()
    }
}

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    scrollBehavior,
    routes: [
        {path: '/login', component: Login, meta: {scrollToTop: true}},
        {path: '/register', component: Register, meta: {scrollToTop: true}},
        {path: '/', component: Market, beforeEnter: auth},
        {path: '/market', component: Market, meta: {scrollToTop: true}, beforeEnter: auth},
        {path: '/release', component: Release, meta: {scrollToTop: true}, beforeEnter: auth},
        // {path: '/my_book', component: MyBook, meta: {scrollToTop: true}, beforeEnter: auth},
        // {path: '/my_trade', component: MyTrade, meta: {scrollToTop: true}, beforeEnter: auth},
        {path: '/admin', component: Admin, meta: {scrollToTop: true}, beforeEnter: auth},
        {path: '/book/:id', component: BookDetail, meta: {scrollToTop: true}, beforeEnter: auth},
    ]
})

export default router
