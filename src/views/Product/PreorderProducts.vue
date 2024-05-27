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
        callFindPreorder();
    })
    function callFindPreorder(){
        axios.get("/products/isPreorder").then(function(response){
			console.log("response", response.data);
            products.value = response.data
        }).catch(function(error){
            console.log("callFindPreorder error", error);
        })
    }
    
</script>
    
<style>
    
</style>