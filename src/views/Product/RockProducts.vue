<template>
    <div class="row" style="margin: 3%; text-align: center;">
        <h2>搖滾音樂</h2>
        <hr>
        <ProductCard v-for="product in products" :key="product.productNo" :item="product"></ProductCard>
    </div>
        
</template>
    
<script setup>
    import { ref, onMounted } from 'vue';
    import axios from '@/plugins/axios.js';
    import ProductCard from '@/components/ProductCard.vue';

    const products = ref(null);
    onMounted(function(){
        callFindRock();
    })
    function callFindRock(){

        


        axios.get(`/products/styleFind/${2}`).then(function(response){
			console.log("response", response.data);
            products.value = response.data
        }).catch(function(error){
            console.log("callFindRock error", error);
        })


    }

</script>
    
<style>
    
</style>