<template>



    <div class="alert alert-success" role="alert" @click="seeDetail" style="margin-top: 2%; margin-bottom: 35%;">
        <h4 class="alert-heading">{{isPay}}</h4>
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
const isPay=ref('等待付款中🕐')
const isSuccess = ref(true)
const orderNumber=ref('')
import { useRouter } from 'vue-router';
const router = useRouter();

onMounted(function(){

const urlParams =ref( new URLSearchParams(window.location.search))
orderNumber.value=(urlParams.value.get('orderNumber'))
const transactionId =ref(urlParams.value.get('transactionId'))
const amount =ref(urlParams.value.get('amount'))
console.log(orderNumber.value,transactionId.value,amount.value)

let confirmData={
    "amount": amount.value,
    "currency": "TWD"
}
console.log()
axiosapi.post(`/makeConfirm/${transactionId.value}`,confirmData).then(function(response){
    if(response.data.returnCode=='0000'){
            isPay.value='付款成功(點擊查看訂單)'
            successP1.value=
            isSuccess.value=true
    }else{
            isPay.value='付款失敗'+response.data.returnMessage
            isSuccess.value=false
    }
    console.log(response)
}).catch(function (error) {
});

})



function seeDetail(){
    if(isPay.value=='付款成功(點擊查看訂單)'){
        router.push({path: "/order/OrderDetail", query:{orderNumber:orderNumber.value}})//跳回orderDetail 並將orderNo帶到下一頁
    }
    
}
</script>

<style>

</style>