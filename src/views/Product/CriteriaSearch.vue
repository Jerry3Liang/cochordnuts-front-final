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
    <Paginate class="justify-content-center"
                :first-last-button="true"
                first-button-text="&lt;&lt;"
                last-button-text="&gt;&gt;"
                prev-text="&lt;"
                next-text="&gt;"
                :page-count="pages"
                :initial-page="initial"
                :click-handler="dosearch"
                ></Paginate>
</template>
    
<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import axios from '@/plugins/axios.js';
    import Paginate from 'vuejs-paginate-next';


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

    const musicStyle = ref(null);
    const language = ref(null);
    const musicYear = ref(null);

    const pages = ref(100);
    const initial = ref(1);
    const start = ref(0);
    const rows = ref(20);
    const total = ref(0);

    
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
        if(route.query.musicStyle != null){
            musicStyle.value = route.query.musicStyle;
        }
        if(route.query.productName == ""){
            productName.value = null;
        }
        if(route.query.artistName == ""){
            artistName.value = null;
        }else if(route.query.artistName != null){
            artistName.value = route.query.artistName;
        }
        if(route.query.startDate == ""){
            startDate.value = null;
        }
        if(route.query.endDate == ""){
            endDate.value = null;
        }
        if(route.query.language != null){
            language.value = route.query.language;
        }
        if(route.query.musicYear != null){
            musicYear.value = route.query.musicYear;
        }

        goSearch();
    }
    
    
    function goSearch(page){
        if(page){
            start.value = (page -1) * rows.value;
            initial.value = page;
        } else {
            start.value = 0;
        }
        
        let data = {
            "start" : start.value,
            "rows" : rows.value,
            "productName" : productName.value,
            "artistName" : artistName.value,
            "startPrice" : startPrice.value,
            "endPrice" : endPrice.value,
            "startDate" : startDate.value,
            "endDate" : endDate.value,
            "musicStyle" : musicStyle.value,
            "language" : language.value,
            "musicYear" : musicYear.value,
            "productStatus" : 1,
        }
        
        console.log("data=",data);
        axios.post("/products/search", data).then(function(response){
            console.log("response=", response);
            products.value = response.data;
        }).catch(function(error){
            console.log("error=", error);
            products.value = null;
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
    /* .hidden {
        display: none;
    } */
</style>