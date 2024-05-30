<template>
    <div class="container" style="text-align: center;">
        <h3 style="margin: 3%;">{{ userName }}的願望清單</h3>
        <div class="card col-10" style="margin: auto; text-align: center;">
        <table style="margin: 5%;">
            <tr style="font-size: large;">
                <th>品項</th>
                <th>商品/演唱者</th>
                <th>定價</th>
                <th>售價</th>
                <th></th>
            </tr>
            <tr v-for="product in products" :key="product.productNo">
                <td><img :src="`${path}${product.productNo}`" alt="無法載入" style="height: 6rem;"></td>
                <td>{{ product.productName }}<br>{{ product.artistType }}
                </td>
                <td>{{ product.unitPrice }}</td>
                <td>{{ Math.round(product.unitPrice * product.discount)}}</td>
                <td><button class="btn btn-outline-danger button-spacing" @click="callRemoveWishList(product.productNo)">刪除</button>
                <button class="btn btn-outline-danger" @click="addCart(product.productNo)">加入購物車</button></td>
            </tr>
        </table>
        </div>
    </div>    

</template>
    
<script setup>
    const path = import.meta.env.VITE_PHOTO_URL;
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import axiosapi from '@/plugins/axios';
    import Swal from 'sweetalert2';

    const products = ref(null);
    const memberId = ref(null);
    const userName = ref(null);
    const router= useRouter();


    onMounted(function(){
        callFindWishList();
    })
    function addCart(productNo){
        let cartData={
            "memberNo":memberId.value,
            "productId":productNo,
            "count":1
        }

        axiosapi.post(`/cart/add`,cartData).then(function(response){
                console.log("response=", response.data);
                Swal.fire({
                icon: "success",
                title: "已加入購物車"
            });
                
            }).catch(function(error){
                console.log("error=", error);
                
        
            })


    }

    function callFindWishList(){

        memberId.value = sessionStorage.getItem("memberNo");
        userName.value = sessionStorage.getItem("userName");
        
        if(memberId.value == null){
            router.push({path: "/secure/login"});
            Swal.fire({
            title: "尚未登入",
            text: "請先登入會員",
            icon: "warning",
            showConfirmButton: true,
            confirmButtonText: "前往登入",
            showCancelButton: true,
            cancelButtonText: "回首頁",
            }).then(function(result){
                if(result.isConfirmed){
                    router.push({path: "/secure/login"});
                } else {
                    router.push({path: "/"});
                };

            });
        } else {
            
            axiosapi.get(`/wishlist/find/${memberId.value}`).then(function(response){
                console.log("response=", response.data);
                products.value = response.data;
                
            }).catch(function(error){
                console.log("error=", error);
    
            })
        }

        
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
    td{
        padding: 1%;
    }
    .button-spacing {
        margin-right: 5px; /* 設定按鈕間的右邊距為 10 像素 */
}
</style>