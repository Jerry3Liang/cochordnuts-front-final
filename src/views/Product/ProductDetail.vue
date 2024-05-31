<template>
    <!-- <h3>Detail</h3> -->
    <div v-if="product" style="margin-top: 5%">
        <ProductInfo :productObj="product"></ProductInfo>
    </div>

</template>
    
<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import ProductInfo from '@/components/ProductInfo.vue';
    
    import axios from '@/plugins/axios.js';
    

    const route = useRoute();
    const id = ref(route.query.id);
    
    
    const product = ref(null);
    onMounted(function(){
        callFindById(id);
    })


    function callFindById(id){
        axios.get(`/products/detail/${id.value}`).then(function(response){
            product.value = response.data;
            console.log("response=",response.data);
        }).catch(function(error){
            console.log("error=",error);
        })
    }


</script>
    
<style>
    
</style>