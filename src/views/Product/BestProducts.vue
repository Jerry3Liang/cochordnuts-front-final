<template>
    <div class="row">
        <ProductCard v-for="product in products" :key="product.productNo" :item="product"></ProductCard>
        <!-- <ProductCard></ProductCard> -->
        <!-- <ProductDetail :productId="productId"></ProductDetail> -->
    </div>    
</template>
    
<script setup>
    import { ref, onMounted } from 'vue';
    import axios from '@/plugins/axios.js';
    import ProductCard from '@/components/ProductCard.vue';
    
    const products = ref(null);
    onMounted(function(){
        callFindBest();
    })
    function callFindBest(){
        axios.get("/products/isBest").then(function(response){
			console.log("response", response.data);
            products.value = response.data
        }).catch(function(error){
            console.log("callFindBest error", error);
        })
    }
    
</script>
    
<style>
    
</style>