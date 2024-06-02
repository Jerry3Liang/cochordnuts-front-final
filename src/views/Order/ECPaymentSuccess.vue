<template>
    <div class="alert alert-success" role="alert" style="margin-top: 2%; margin-bottom: 35%;">
        <h4 class="alert-heading">付款成功</h4>
        <button  @click="seeDetail">查看訂單</button>
        <p>
            Congratulations! Your payment via Linepay was successful. Your transaction has been securely 
            processed and your order is now confirmed. We sincerely appreciate your trust in Linepay for 
            handling your purchase. Your support allows us to continue providing the best service possible.
        </p>
        <hr>
        <p class="mb-0">If you have any questions or need further assistance, please don't hesitate to contact our customer support. Have a great day!
        </p>
</div>
</template>

<script setup>
import { ref ,onMounted} from 'vue';
import axiosapi from '@/plugins/axios.js';
const memberId = ref(null)
import { useRouter } from 'vue-router';
const router = useRouter();


function seeDetail(){
    memberId.value = sessionStorage.getItem("memberNo");
    
    router.push({path: "/order/userFindAllOrders"});
    
}






</script>

<style>

</style>