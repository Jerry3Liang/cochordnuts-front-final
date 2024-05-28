<template>
    <h3>Info</h3>
        <figure class="card" style="width: 25rem; margin-right: 5%; float: left;">
            <img :src="`${path}${productObj.productNo}`" class="img-thumbnail" alt="無法載入">
        </figure>
        <div class="card" style="padding: 5%; height: 25rem;">
            <h2>{{ productObj.productName }}</h2>
            <h5>演出者：{{ productObj.artistType }}</h5>
            <h5>發行日：{{ productObj.publishedDate }}</h5>
            <div v-show="productObj.discount != 1">
                <h6 style="text-decoration: line-through;">定價：{{ productObj.unitPrice }}</h6>
                <h5 style="color: red;">售價：{{ Math.round(productObj.unitPrice * productObj.discount) }}</h5>
            </div>
            <div v-show="productObj.discount == 1">
                <h5>定價：{{ productObj.unitPrice }}</h5>
            </div>
        
            <div style="margin: 2%;">
                <button v-if="!showMinusBtn" type="button" class="countBtn" disabled>–</button>
                <button v-if="showMinusBtn" type="button" class="countBtn" @click="minusItem">–</button>
                <input type="text" size="2" v-model="count" style="text-align: center; height: 100%;">
                <button type="button" class="countBtn" @click="plusItem">+</button>
            </div>
            <div>
                <button type="button" class="btn btn-outline-danger" style="margin: 2%;" @click="cartAdd(productObj.productNo)">🛒加入購物車</button>
                <button type="button" class="btn btn-outline-primary" @click="wishAdd(productObj.productNo)">🤍加入願望清單</button>
            </div>
        </div>
    
    <nav style="margin: 2%;">
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">商品描述</button>
            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">購物說明</button>
        </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0" style="white-space: pre-wrap;">
            <h5>{{ productObj.describe }}</h5>
        </div>
        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
            <ShoppingGuide></ShoppingGuide>
        </div>
    </div>

</template>
    
<script setup>
    const path = import.meta.env.VITE_PHOTO_URL;
    import Swal from 'sweetalert2';
    import { ref, onMounted } from 'vue';
    import axios from '@/plugins/axios';
    import ShoppingGuide from '@/components/ShoppingGuide.vue';
    const props = defineProps(["productObj"]);
    // console.log(props.productObj);
    // const pro = ref(props.productObj.productNo);

    const count = ref(1);
    const showMinusBtn = ref(false);
    const memberId = ref(null);

    function plusItem(){
        count.value++;
        if(count.value > 1){
            showMinusBtn.value = true;
        }
    }
    function minusItem(){
        count.value--;
        if(count.value === 1){
            showMinusBtn.value = false;
        }
    }

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
        });
    function cartAdd(id){
        let memberNo=sessionStorage.getItem("memberNo");
        // let count = count._value;
        if (memberNo === null) {
            memberNo= "0"
            let obj = {
                productId: id,
                memberNo: memberNo,
                count: count._value
            }
            console.log(obj);
            axios.post("/cart/add", obj)
                .then(function(response){
                    Swal.fire({
                        title: response.data.message,
                        text: "",
                        // icon: "success",
                        showCancelButton: false,
                        showConfirmButton: true,
                        //timer: 1000
                    })
                    console.log(response);
                // console.log(id);
                })
                .catch(function(error){
                console.log(error);
                })
        } else{
            let obj = {
                productId: id,
                memberNo: memberNo,
                count: count._value
            }
            console.log(obj);
            axios.post("/cart/add", obj)
            .then(function(response){
            console.log(response);
            Toast.fire({
                icon: "success",
                title: `${response.data.productName}已加入購物車`
            });
            // console.log(id);
            }).catch(function(error){
            console.log(error);
            })
        }        
    }
    

    function wishAdd(productNo){

        memberId.value = sessionStorage.getItem("memberNo");

        let data = {
            "memberId" : memberId.value,
            "productNo" : productNo
        }
        console.log("data=", data);

        axios.post(`/wishlist/add`, data).then(function(response){
            console.log("response=", response);
            Toast.fire({
                icon: "success",
                title: "已加入願望清單"
            });

        }).catch(function(error){
            console.log("error=", error);
            Toast.fire({
                icon: "warning",
                title: "此商品已在您的願望清單"
            });

        })
    }

    
</script>
    
<style>
    .countBtn{
        background-color: #F0F0F0;
        width: 4%;
        border-radius: 1%;
        border: 1px solid gray;
    }
    .countBtn:hover{
        background-color: #D0D0D0;
    }

</style>