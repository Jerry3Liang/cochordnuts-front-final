<template>
    <div class="row" v-if="products">
        <ProductCard v-for="product in products" :key="product.productNo" :item="product"></ProductCard>
    </div>
</template>
    
<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import axios from '@/plugins/axios.js';
    import Paginate from 'vuejs-paginate-next';
    import ProductCard from '@/components/ProductCard.vue';

    const products = ref(null);

    onMounted(function(){
        findRecommend();
    })

    function findRecommend(){
        let memberNo = sessionStorage.getItem("memberNo");
        
        axios.get(`/favoriteFind/${memberNo}`).then(function(response){
            console.log("response=", response);
            products.value = response.data;

        }).catch(function(error){
            console.log("error=", error);

        })
        
    }
    
</script>
<style>
    
</style>