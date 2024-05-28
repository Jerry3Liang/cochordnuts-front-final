<template>
    <!-- <div v-if="products"> -->
        <div style="text-align: center; margin-top: 1%;">
            <h1>全部商品</h1>
            <hr>
        </div>
        <div class="row">
                <ProductCard v-for="product in products" :key="product.productNo" :item="product"></ProductCard>
        </div>
        <Paginate class="justify-content-center"
                :first-last-button="true"
                first-button-text="&lt;&lt;"
                last-button-text="&gt;&gt;"
                prev-text="&lt;"
                next-text="&gt;"
                :page-count="pages"
                :initial-page="initial"
                :click-handler="callFind"
                ></Paginate>
    <!-- </div>    -->
</template>
    
<script setup>
    import { ref, onMounted } from 'vue';
    import axios from '@/plugins/axios.js';
    import ProductCard from '@/components/ProductCard.vue';
    import Paginate from 'vuejs-paginate-next';
    const products = ref(null);

    
    
    const pages = ref(100);
    const initial = ref(1);
    const start = ref(0);
    const rows = ref(20);
    const total = ref(0);
    // const lastPageRows = ref(0);
    
    onMounted(function(){
        callFind();
    })
    function callFind(page){
        if(page){
            start.value = (page -1) * rows.value;
            initial.value = page;
        } else {
            start.value = 0;
        }
        let data = {
            "start" : start.value,
            "rows" : rows.value,
            "direction" : true,
            "order" : "productNo",
            "productStatus" : 1,
        }
        // axios.get("/products/findAll").then(function(response){
        axios.post("/products/search", data).then(function(response){
            // console.log(typeof(data));
			console.log("response", response.data);
            products.value = response.data
        }).catch(function(error){
            console.log("callFind error", error);
        })

        axios.post("/products/searchCount", data).then(function(response){
			console.log("count=", response.data);
            total.value = response.data
            pages.value = Math.ceil(response.data / rows.value);
            // lastPageRows.value = response.data % rows.value;
        }).catch(function(error){
            console.log("searchCount", error);
        })


    }
    
</script>
    
<style>
    
</style>