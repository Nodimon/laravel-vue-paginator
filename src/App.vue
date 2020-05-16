<template>
    <div id="app">

        <h1 style="text-align: center">Paginator Package</h1>

        <div style="display: flex; justify-content: center">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="record in paginated" :key="record.id">
                        <td>{{ record.id }}</td>
                        <td>{{ record.email }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <paginator
                :records="records"
                :search="search"
                :order-by="orderBy"
                :direction="direction"
                :page-size="pageSize"
                :filters="filters"
                :server-side="false"
                :max-pages="9"
                :per-page="1"
                @pagination-update="(event) => {paginated = event}"
        ></paginator>

<!--        <paginator-->
<!--                :records="records"-->
<!--                :search="search"-->
<!--                :order-by="orderBy"-->
<!--                :direction="direction"-->
<!--                :page-size="pageSize"-->
<!--                :filters="filters"-->
<!--                :url="url"-->
<!--                :server-side="true"-->
<!--                :laravel-resource="true"-->
<!--                :max-pages="9"-->
<!--                @pagination-update="(event) => {records = event}"-->
<!--        ></paginator>-->

    </div>
</template>

<script>
    export default {
        name: 'App',
        components: {},
        data() {
            return {
                records: [
                    {
                        id: 1,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 2,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 3,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 4,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 5,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 6,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 7,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 8,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 9,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 10,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 11,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 12,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 13,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 14,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 15,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 16,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 17,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 18,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 19,
                        email: 'dino.emp@gmail.com'
                    },
                    {
                        id: 20,
                        email: 'dino.emp@gmail.com'
                    }
                ],
                paginated: [],
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
