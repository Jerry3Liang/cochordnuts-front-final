<template>
    <div class="row mt-5">
        <div class="col-md-5 mx-auto">
            <div class="input-group">
                <input class="form-control border rounded-pill" type="text" placeholder="輸入訂單編號" v-model="orderSearch"
                    @input="doSearch">
            </div>
        </div>
    </div>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">訂單編號</th>
                <th scope="col">會員編號</th>
                <th scope="col">金額</th>
                <th scope="col">更新時間</th>
                <th scope="col">狀態</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(anOrder, index) in orders" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ anOrder.orderNo }}</td>
                <td>{{ anOrder.memberNo }}</td>
                <td>$ {{ anOrder.totalPay }}</td>
                <td>{{ anOrder.lastModifiedDate }}</td>
                <td>{{ anOrder.status }}</td>
                <button type="button" class="btn btn-outline-secondary"
                    @click="seeOrderDetail(anOrder.orderNo)">查看詳細內容</button>
            </tr>
        </tbody>
    </table>
    <Paginate class="justify-content-center" first-button-text="&lt;&lt;" last-button-text="&gt;&gt;" prev-text="&lt;"
        next-text="&gt;" :page-count=pages :initial-page="current" v-model="current" :click-handler="doChangePage"
        :first-last-button="true"></Paginate>
</template>

<script setup>
import moment from 'moment';
import Swal from 'sweetalert2';
import axiosapi from '@/plugins/axios.js';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Paginate from "vuejs-paginate-next"
const router = useRouter();
const orders = ref([])
const current = ref(1)
const pages = ref(100)
const start = ref(0)
const rows = ref(10)
const member = ref(sessionStorage.getItem("memberNo"))
const orderSearch = ref('')
function seeOrderDetail(orderNo) {

    router.push({ path: "/order/OrderDetail", query: { orderNumber: orderNo } })//跳頁 將orderNo帶到下一頁

}
onMounted(function () {
    doChangePage();

})

function doSearch() {
    let data = {
        "memberNo": member.value,
        "start": start.value,
        "rows": rows.value,
        "num": orderSearch.value
    }
    axiosapi.post("/orders/findBymemberNo", data).then(function (response) {
        console.log(orderSearch.value)
        orders.value = []
        // console.log(response)   
        console.log(response.data.count)
        // console.log(orderSearch.value)  
        // console.log(rows.value)
        pages.value = Math.ceil(response.data.count / rows.value)
        // console.log(pages.value)
        for (let i = 0; i < response.data.memberOrders.length; i++) {
            orders.value.push(response.data.memberOrders[i]);
            orders.value[i].lastModifiedDate = moment(orders.value[i].lastModifiedDate).format('YYYY-MM-DD HH:mm:ss')
        }


    }).catch(function (error) {
        console.log("error", error);
        Swal.fire({
            text: '查無資料：',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });
    });
}

function doChangePage(page) {
    if (member.value == null || member.value == "") {
        Swal.fire({
            text: '請先登入會員',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });
        setTimeout(function () {
            router.push({ path: "/secure/login" })
        }, 50);


    } else {
        if (page) {
            start.value = (page - 1) * rows.value
            current.value = page
        } else {
            start.value = 0
            current.value = 1
        }
        let data = {
            "memberNo": member.value,
            "start": start.value,
            "rows": rows.value,
            "num": orderSearch.value
        }
        axiosapi.post("/orders/findBymemberNo", data).then(function (response) {
            orders.value = []
            console.log(response)
            pages.value = Math.ceil(response.data.count / rows.value)
            for (let i = 0; i < response.data.memberOrders.length; i++) {
                orders.value.push(response.data.memberOrders[i]);
                orders.value[i].lastModifiedDate = moment(orders.value[i].lastModifiedDate).format('YYYY-MM-DD HH:mm:ss')
            }


        }).catch(function (error) {
            console.log("error", error);
            Swal.fire({
                text: '無訂單紀錄',
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonText: '確認',
            });
        });









    }




}


</script>

<style></style>