import Paginator from "./Paginator";

const PaginatorVue = {
    install(Vue, option = {}) {

        Vue.component('paginator', Paginator)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(PaginatorVue)
}

export default PaginatorVue