import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import FastClick from 'fastclick'
import VeeValidate from 'vee-validate';


window.addEventListener('load', () => {
    FastClick.attach(document.body)
})
Vue.use(VeeValidate);
new Vue({
    router,
    el: '#app',
    store,
    render: h => h(App)
})


