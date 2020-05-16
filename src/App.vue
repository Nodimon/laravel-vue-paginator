<template>
    <div id="app">

        <paginator
                :records="records"
                :search="search"
                :order-by="orderBy"
                :direction="direction"
                :page-size="pageSize"
                :filters="filters"
                :url="url"
                :server="true"
                :laravel-resource="true"
                :max-pages="9"
                @pagination-update="(event) => {records = event}"
        ></paginator>

    </div>
</template>

<script>
    export default {
        name: 'App',
        components: {},
        data() {
            return {
                records: [],
                search: 'Dino',
                orderBy: 'name',
                direction: 'asc',
                pageSize: 30,
                filters: [],
                url: 'http://127.0.0.1:8000/api/users'
            }
        }
    }
</script>

<style lang="scss">

</style>
