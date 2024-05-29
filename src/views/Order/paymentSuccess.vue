<template>
    <h1>{{isPay}}</h1>
    <button type="button" @click="seeDetail" v-show="isSuccess">檢視訂單明細</button>
</template>

<script setup>
import { ref ,onMounted} from 'vue';
import axiosapi from '@/plugins/axios.js';
const isPay=ref('等待付款中')
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
            isPay.value='付款成功'
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
    router.push({path: "/order/OrderDetail", query:{orderNumber:orderNumber.value}})//跳回orderDetail 並將orderNo帶到下一頁
}
</script>

<style>

</style>