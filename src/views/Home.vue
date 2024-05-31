<template>
    <!-- <h3>Home</h3> -->
    <!-- <div class="col-6" style="margin: auto; margin-top: 5%"> -->
        <!-- <div
            style="margin: 0; background-color: #E0E0E0; width: 30em; height: 22em; margin: auto; align-content: center;"> -->
            <div  style="margin: auto;">
                <Carousel></Carousel>
            </div>
        <!-- </div> -->
    <!-- </div> -->
    <!-- <Products></Products> -->
    <div style="margin: 5%; text-align: center;" v-if="showRecommend">
        <h3>為你推薦</h3>
        <hr>
        <Recommend></Recommend>
    </div>
    
    <div style="margin: 5%; text-align: center;">
        <h3>熱銷商品</h3>
        <hr>
        <BestProducts></BestProducts>
    </div>

    <div style="margin: 5%; text-align: center;">
        <h3>折扣商品</h3>
        <hr>
        <DiscountProducts></DiscountProducts>
    </div>

    


</template>

<script setup>
import Carousel from '../components/Carousel.vue';
// import Products from '@/views/pages/Products.vue';
import BestProducts from './Product/BestProducts.vue';
import DiscountProducts from './Product/DiscountProducts.vue';
import Recommend from './Product/Recommend.vue';
import { ref, onMounted } from 'vue';

const showRecommend = ref(false);

onMounted(function(){
    checkLogin();
})

function checkLogin(){
    let memberNo = sessionStorage.getItem("memberNo");
    if(memberNo==null || memberNo==0 || memberNo==""){
        showRecommend.value = false;
    } else {
        showRecommend.value = true;
    }
}





</script>

<style></style>