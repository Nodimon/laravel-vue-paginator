<template>

    <div>
        <ul>
            <li :class="{'disabled' : pagination.current_page <= 1}" @click="previousPage"> < </li>
            <li @click="changePage(item)" class="page-link" :class="{active: pagination.current_page === item}" v-for="(item, index) in pages" :key="index">
                {{ item }}
            </li>
            <li :class="{'disabled' : pagination.current_page >= pagination.last_page}" @click="nextPage"> > </li>
        </ul>
    </div>

</template>

<script>
    export default {
        name: "Paginator",
        props: {
            records: {
                type: Array,
                default: () => []
            },
            search: {
                type: String,
                default: ''
            },
            orderBy: {
                type: String,
                default: ''
            },
            direction: {
                type: String,
                default: 'desc'
            },
            filters: {
                type: Array,
                default: () => []
            },
            url: {
                type: String,
                default: ''
            },
            serverSide: {
                type: Boolean,
                default: true
            },
            laravelResource: {
                type: Boolean,
                default: true
            },
            maxPages: {
                type: Number,
                default: 9
            },
            perPage: {
                type: Number,
                default: 5
            }
        },
        data() {
            return {
                pagination: {},
                pages: [],
                initial: true
            }
        },
        methods: {
            paginationUpdate(records) {
                this.$emit('pagination-update', records)
            },
            changePage(page) {
                if (page === '...') return
                this.serverSide ? this.makeRequest(page) : this.paginateWhenNotAjax(page)
            },
            makeRequest(page) {
                const params = {
                    page,
                    orderBy:   this.orderBy,
                    direction: this.direction,
                    filters:   this.filters,
                    search:    this.search,
                    perPage:   this.perPage
                }

                axios.get(this.url, { params })
                    .then(({data}) => {
                        if (data.data.length !== 0) {
                            this.paginationUpdate(data.data)
                        }
                        const { meta, links } = data

                        const pagination = {
                            current_page: meta.current_page,
                            last_page:    meta.last_page,
                            total:        meta.total,
                            next_page:    links.next,
                            prev_page:    links.prev
                        }

                        this.makePagination(pagination)
                    })
                    .catch(error => {
                    })
            },
            paginateWhenNotAjax(page) {
                this.pagination.prev_page    = page - 1;
                this.pagination.current_page = page;
                this.pagination.next_page    = page + 1;

                const paginated = this.records.slice((page * this.perPage) - this.perPage, page * this.perPage);
                this.paginationUpdate(paginated)
                this.makePagination(this.pagination)
            },
            makePagination(pagination) {

                this.pagination = pagination

                const even       = (this.maxPages % 2 === 0) ? 1 : 0
                const leftPages  = Math.floor(this.maxPages / 2)
                const rightPages = pagination.last_page - leftPages + 1 + even

                if (pagination.last_page <= 6 || pagination.last_page < this.maxPages) {
                    this.pages = [...this.createPages(1, pagination.last_page)]
                } else {
                    if (pagination.current_page >= leftPages && pagination.current_page <= rightPages) {
                        this.pages = [1, '...', ...this.createPages(pagination.current_page - 2, pagination.current_page + 2), '...', pagination.last_page]
                    } else {
                        this.pages = [...this.createPages(1, leftPages), '...', ...this.createPages(rightPages, pagination.last_page)]
                    }
                }

                if (!this.serverSide) {
                    if (this.initial) {
                        this.initial = false
                        this.paginateWhenNotAjax(1)
                    }
                }
            },
            previousPage() {
                if (this.pagination.current_page <= 1) return
                this.serverSide ? this.makeRequest(this.pagination.current_page - 1) : this.paginateWhenNotAjax(this.pagination.current_page - 1)
            },
            nextPage() {
                if (this.pagination.current_page >= this.pagination.last_page) return
                this.serverSide ? this.makeRequest(this.pagination.current_page + 1) : this.paginateWhenNotAjax(this.pagination.current_page + 1)
            },
            createPages(start, total) {
                let pages = []
                for (let i = start; i <= total; i++ ) {
                    pages.push(i)
                }
                return pages
            }
        },
        created() {
            console.log("Props", this.$props)
            if (this.serverSide) {
                this.makeRequest()
            } else {
                const pagination = {
                    current_page: 1,
                    last_page:    Math.ceil(this.records.length / this.perPage),
                    total:        this.records.length,
                    next_page:    2,
                    prev_page:    0
                }
                this.makePagination(pagination)
            }
        }
    }
</script>

<style lang="scss" scoped>
    ul {
        display: flex;
        list-style: none;
        text-align: center;
        justify-content: center;

        li {
            padding: 5px;
            min-width: 25px;
            min-height: 25px;
            margin: 0 2.5px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: cornflowerblue;
            font-weight: 600;
            cursor: pointer;

            &.active {
                background-color: cornflowerblue;
                color: #fff;
            }

            &.disabled {
                color: #bed4ff;
            }
        }
    }
</style>