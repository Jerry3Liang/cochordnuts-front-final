<template>
    <div class="row" style="margin: 3%; text-align: center;">
        <h2>熱銷商品</h2>
        <hr>
        <ProductCard v-for="product in products" :key="product.productNo" :item="product"></ProductCard>
    </div>
    <Paginate v-if="pageShow" class="justify-content-center"
                :first-last-button="true"
                first-button-text="&lt;&lt;"
                last-button-text="&gt;&gt;"
                prev-text="&lt;"
                next-text="&gt;"
                :page-count="pages"
                :initial-page="initial"
                :click-handler="callFindBest"
                ></Paginate>
    
</template>
    
<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import axios from '@/plugins/axios.js';
    import Paginate from 'vuejs-paginate-next';
    import ProductCard from '@/components/ProductCard.vue';
    
    const route = useRoute();
    const router = ref(route);


    const pages = ref(100);
    const initial = ref(1);
    const start = ref(0);
    const rows = ref(4);
    const total = ref(0);
    const pageShow = ref(false);


    const products = ref(null);
    onMounted(function(){
        callFindBest();
    })
    function callFindBest(page){
        
        // console.log(router.value.fullPath);
        if(router.value.fullPath === "/product/isBest"){
            pageShow.value = true;
            rows.value = 16;
        }
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
            "isBest" : 1,
            "productStatus" : 1,
        }


        axios.post("/products/search", data).then(function(response){
			console.log("response", response.data);
            products.value = response.data
        }).catch(function(error){
            console.log("callFindBest error", error);
        })


        axios.post("/products/searchCount", data).then(function(response){
            console.log("response=", response);
			console.log("count=", response.data);
            total.value = response.data
            // console.log("total=", total.value);
            pages.value = Math.ceil(response.data / rows.value);
            // lastPageRows.value = response.data % rows.value;
        }).catch(function(error){
            console.log("searchCount", error);
        })
    }
    
</script>
    
<style>
    
</style>