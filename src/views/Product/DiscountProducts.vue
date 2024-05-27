<template>
    <div class="row">
        <ProductCard v-for="product in products" :key="product.productNo" :item="product"></ProductCard>
    </div>    
</template>
    
<script setup>
    import { ref, onMounted } from 'vue';
    import axios from '@/plugins/axios.js';
    import ProductCard from '@/components/ProductCard.vue';
    import ProductDetail from './ProductDetail.vue';
    const products = ref(null);
    onMounted(function(){
        callFindDiscount();
    })
    function callFindDiscount(){
        axios.get("/products/isDiscount").then(function(response){
			console.log("response", response.data);
            products.value = response.data
        }).catch(function(error){
            console.log("callFindDiscount error", error);
        })
    }
    
</script>
    
<style>
    
</style>