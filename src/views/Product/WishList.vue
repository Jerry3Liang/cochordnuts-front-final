<template>
    <div class="container">
        <h3>wishList</h3>
        <table>
            <tr>
                <td>圖片</td>
                <td>商品</td>
                <td>價格</td>
                <td>售價</td>
                <td></td>
            </tr>
            <tr v-for="product in products" :key="product.productNo">
                <td><img :src="`${path}${product.productNo}`" alt="無法載入" style="height: 6rem;"></td>
                <td>{{ product.productName }}</td>
                <td>{{ product.unitPrice }}</td>
                <td>{{ Math.round(product.unitPrice * product.discount)}}</td>
                <td><button class="btn btn-outline-danger" @click="callRemoveWishList(product.productNo)">刪除</button></td>
            </tr>
        </table>
    </div>    

</template>
    
<script setup>
    const path = import.meta.env.VITE_PHOTO_URL;
    import { ref, onMounted } from 'vue';
    import axiosapi from '@/plugins/axios';

    const products = ref(null);
    const memberId = ref(1);

    onMounted(function(){
        callFindWishList();
    })

    function callFindWishList(){
        axiosapi.get(`/wishlist/find/${1}`).then(function(response){
            console.log("response=", response.data);
            products.value = response.data;
        }).catch(function(error){
            console.log("error=", error);

        })
    }

    function callRemoveWishList(productNo){

        axiosapi.delete(`/wishlist/remove/${memberId.value}/${productNo}`).then(function(response){
            console.log("response=", response);
            callFindWishList();

        }).catch(function(error){
            console.log("error=", error);

        })
        
    }
    
</script>
    
<style>
    
</style>