<template>
    <div style="margin: auto;">
        <Carousel></Carousel>
    </div>
    <div v-if="showRecommend">
        <Recommend></Recommend>
    </div>
    <div>
        <BestProducts></BestProducts>
    </div>
    <div>
        <PreorderProducts></PreorderProducts>
    </div>
    <div>
        <DiscountProducts></DiscountProducts>
    </div>

    


</template>

<script setup>
import Carousel from '../components/Carousel.vue';
// import Products from '@/views/pages/Products.vue';
import BestProducts from './Product/BestProducts.vue';
import DiscountProducts from './Product/DiscountProducts.vue';
import PreorderProducts from './Product/PreorderProducts.vue';
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