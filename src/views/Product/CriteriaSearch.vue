<template>
    <div style="text-align: center; margin-top: 1%;">
        <h3 v-if="products">搜尋結果</h3>
        <h3 v-if="!products">查無資料，您可能會喜歡……</h3>
    </div>
    <div class="row" v-if="products">
        <hr>
        <ProductCard v-for="product in products" :key="product.productNo" :item="product"></ProductCard>
    </div>
    <div v-if="!products">
        <Recommend></Recommend>
    </div>
    <div v-if="!products">
        <BestProducts></BestProducts>
    </div>
    <Paginate class="justify-content-center"
                v-if="products"
                :first-last-button="true"
                first-button-text="&lt;&lt;"
                last-button-text="&gt;&gt;"
                prev-text="&lt;"
                next-text="&gt;"
                :page-count="pages"
                :initial-page="initial"
                :click-handler="goSearch"
                ></Paginate>
</template>
    
<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import axios from '@/plugins/axios.js';
    import Paginate from 'vuejs-paginate-next';
    import Swal from 'sweetalert2';

    import ProductCard from '@/components/ProductCard.vue';
    import BestProducts from './BestProducts.vue';
    import Recommend from './Recommend.vue';

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
        }else if(route.query.startPrice != null){
            startPrice.value = route.query.startPrice;
        }

        if(route.query.endPrice == ""){
            endPrice.value == null;
        }else if(route.query.endPrice != null){
            endPrice.value = route.query.endPrice;
        }
        if(route.query.productName == ""){
            productName.value = null;
        }else if(route.query.productName != null){
            productName.value = route.query.productName;
        }
        if(route.query.artistName == ""){
            artistName.value = null;
        }else if(route.query.artistName != null){
            artistName.value = route.query.artistName;
        }
        if(route.query.startDate == ""){
            startDate.value = null;
        }else if(route.query.startDate != null){
            startDate.value = route.query.startDate;
        }
        if(route.query.endDate == ""){
            endDate.value = null;
        }else if(route.query.endDate != null){
            endDate.value = route.query.endDate;
        }
        if(route.query.musicStyle != null){
            musicStyle.value = route.query.musicStyle;
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
        Swal.fire({
            text: "Loading......",
            showConfirmButton: false,
            allowOutsideClick: false,
        });

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
            // setTimeout(function() {
                Swal.close();
            // }, 500);
        }).catch(function(error){
            console.log("error=", error);
            products.value = null;
            Swal.close();

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