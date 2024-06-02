<template>
    <div style="text-align: center; margin-top: 1%;">
        <h3 v-if="products">搜尋結果</h3>
        <h3 v-if="!products">查無資料，您可能會喜歡……</h3>
        <hr>
    </div>
    <div class="row">
        <ProductCard v-for="product in products" :key="product.productNo" :item="product"></ProductCard>
    </div>
    <div v-if="!products">
        <BestProducts></BestProducts>
    </div>
</template>
    
<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import axios from '@/plugins/axios.js';

    import ProductCard from '@/components/ProductCard.vue';
    import BestProducts from './BestProducts.vue';

    const route = useRoute();
    const products = ref(null);

    const productName = ref(null);
    const artistName = ref(null);
    const startPrice = ref(null);
    const endPrice = ref(null);
    const startDate = ref(null);
    const endDate = ref(null);

    
    watch(function(){
        return route.query;
    },function(newQuery, oldQuery){
        dosearch();
    })


    onMounted(function(){
        dosearch();
    })

    function dosearch(){
        

        if(route.query.startPrice == ""){
            startPrice.value == null;
        }else{
            startPrice.value == route.query.startPrice;
        }

        if(route.query.endPrice == ""){
            endPrice.value == null;
        }else{
            endPrice.value == route.query.endPrice;
        }

        goSearch();
    }
    
    
    function goSearch(){
        
        let data = {
            "productName" : route.query.productName,
            "artistName" : route.query.artistName,
            "startPrice" : startPrice.value,
            "endPrice" : endPrice.value,
            "startDate" : route.query.startDate,
            "endDate" : route.query.endDate,
        }
        
        console.log("data=",data);
        axios.post("/products/search", data).then(function(response){
            console.log("response=", response);
            products.value = response.data;
        }).catch(function(error){
            console.log("error=", error);
            products.value = null;
        })
        

    }




    
</script>
    
<style>
    /* .hidden {
        display: none;
    } */
</style>