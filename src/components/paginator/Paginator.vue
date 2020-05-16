<template>

    <div>
        <h1>Paginator Package</h1>

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
            }
        },
        data() {
            return {
                result: [],
                pagination: {},
                pages: []
            }
        },
        methods: {
            paginationUpdate() {
                this.$emit('pagination-update', this.result)
            },
            changePage(page) {
                if (page === '...') return
                this.makeRequest(page)
            },
            makeRequest(page) {
                const params = {
                    page,
                    orderBy: this.orderBy,
                    direction: this.direction,
                    filters: this.filters,
                    search: this.search,
                    perPage: this.perPage
                }

                axios.get(this.url, { params })
                    .then(({data}) => {
                        // console.log("Res", data)
                        if (data.data.length !== 0) {
                            this.result = data.data
                            this.paginationUpdate()
                        }
                        this.makePagination(data)
                        // console.log("Pagination", this.pagination)
                    })
                    .catch(error => {
                        // console.log("Error", error)
                    })
            },
            makePagination({ meta, links }) {

                if (this.laravelResource) {
                    this.pagination = {
                        current_page: meta.current_page,
                        last_page:    meta.last_page,
                        to:           meta.to,
                        from:         meta.from,
                        total:        meta.total,
                        next_page:    links.next,
                        prev_page:    links.prev
                    }

                    const current = meta.current_page
                    const even = (this.maxPages % 2 === 0) ? 1 : 0
                    const leftPages = Math.floor(this.max / 2)
                    const rightPages = meta.last_page - leftPages + 1 + even

                    if (meta.last_page <= 6 || meta.last_page < this.maxPages) {
                        this.pages = [...this.createPages(1, meta.last_page)]
                    } else {
                        if (current >= leftPages && current <= rightPages) {
                            // console.log("If between")
                            // console.log("Left", current - 2)
                            // console.log("Right", current + 2)
                            this.pages = [1, '...', ...this.createPages(current - 2, current + 2), '...', meta.last_page]
                        } else {
                            this.pages = [...this.createPages(1, leftPages), '...', ...this.createPages(rightPages, meta.last_page)]
                        }

                        // console.log("Pages", this.pages)
                        // console.log("Current", current)
                        // console.log("Even", even)
                        // console.log("Left Pages", leftPages)
                        // console.log("Right Pages", rightPages)
                    }
                }
            },
            previousPage() {
                if (this.pagination.current_page <= 1) return
                this.makeRequest(this.pagination.current_page - 1)
            },
            nextPage() {
                if (this.pagination.current_page >= this.pagination.last_page) return
                this.makeRequest(this.pagination.current_page + 1)
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
            this.makeRequest()
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