<template>
    <div class="row">
        <ProductCard v-for="product in products" :key="product.productNo" :item="product"></ProductCard>
    </div>    
</template>
    
<script setup>
    import { ref, onMounted } from 'vue';
    import axios from '@/plugins/axios.js';
    import ProductCard from '@/components/ProductCard.vue';
    
    const products = ref(null);
    onMounted(function(){
        callFindChinese();
    })
    function callFindChinese(){
        
        axios.get(`/products/languageFind/${1}`).then(function(response){
			console.log("response", response.data);
            products.value = response.data
        }).catch(function(error){
            console.log("callFindChinese error", error);
        })
    }
    
</script>
    
<style>
    
</style>