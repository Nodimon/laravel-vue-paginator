import Vue from 'vue'
import App from './App.vue'
import PaginatorVue from "./components/paginator";

import axios from 'axios'
Vue.prototype.$http = axios
window.axios = axios;

Vue.config.productionTip = false

Vue.use(PaginatorVue)

new Vue({
    render: h => h(App),
}).$mount('#app')
