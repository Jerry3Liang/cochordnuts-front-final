<template>
    <div class="alert alert-success" role="alert" @click="seeDetail" style="margin-top: 2%; margin-bottom: 35%;">
        <h4 class="alert-heading">付款失敗(請聯繫客服)</h4>
        <p>
            We're sorry! Your payment via ECPay was unsuccessful. Unfortunately, your transaction could not be processed at this time, and your order has not been confirmed. We apologize for any inconvenience this may have caused. Please try again or contact our support team for assistance. Thank you for your understanding and patience.
        </p>
        <hr>
        <p class="mb-0">If you have any questions or need further assistance, please don't hesitate to contact our customer support. Have a great day!
        </p>
</div>
</template>

<script setup>
    import { ref ,onMounted} from 'vue';
    import axiosapi from '@/plugins/axios.js';
    const orderNumber=ref('')
    import { useRouter } from 'vue-router';
    const router = useRouter();


    function seeDetail(){
        memberId.value = sessionStorage.getItem("memberNo");
        
        router.push({path: "/Customer/CustomerAnswer"})
        
    }
</script>

<style></style>
