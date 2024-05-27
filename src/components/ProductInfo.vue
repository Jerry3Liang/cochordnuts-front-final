<template>
    <h3>Info</h3>
        <figure class="card" style="width: 25rem; margin-right: 5%; float: left;">
            <img :src="`${path}${productObj.productNo}`" class="img-thumbnail" alt="無法載入">
        </figure>
        <div class="card" style="padding: 5%; height: 25rem;">
            <h2>{{ productObj.productName }}</h2>
            <h5>演出者：{{ productObj.artistType }}</h5>
            <h5>發行日：{{ productObj.publishedDate }}</h5>
            <h5>NT.{{ productObj.unitPrice }}</h5>
            <h5>售價： {{ Math.round(productObj.unitPrice * productObj.discount) }}</h5>
            <div style="margin: 2%;">
                <button v-if="!showMinusBtn" type="button" class="countBtn" disabled>–</button>
                <button v-if="showMinusBtn" type="button" class="countBtn" @click="minusItem">–</button>
                <input type="text" size="2" v-model="count" style="text-align: center; height: 100%;">
                <button type="button" class="countBtn" @click="plusItem">+</button>
            </div>
            <div>
                <button type="button" class="btn btn-outline-danger" style="margin: 2%;" @click="cartAdd">🛒加入購物車</button>
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
        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
            <h5>{{ productObj.describe }}</h5>
        </div>
        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
            <ShoppingGuide></ShoppingGuide>
        </div>
    </div>

</template>
    
<script setup>
    const path = import.meta.env.VITE_PHOTO_URL;
    import { ref, onMounted } from 'vue';
    import axios from '@/plugins/axios';
    import ShoppingGuide from '@/components/ShoppingGuide.vue';
    const props = defineProps(["productObj"]);
    // console.log(props.productObj);
    // const pro = ref(props.productObj.productNo);

    const count = ref(1);
    const showMinusBtn = ref(false);
    const memberId = ref(1);

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

    function cartAdd(){

    }

    function wishAdd(productNo){
        let data = {
            "memberId" : memberId.value,
            "productNo" : productNo
        }
        console.log(data);

        axios.post(`/wishlist/add`, data).then(function(response){
            console.log("response=", response);

        }).catch(function(error){
            console.log("error=", error);

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