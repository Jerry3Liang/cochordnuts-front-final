<template>
    <!-- <div class="row"> -->
        <div class="col-3" style="margin-bottom: 25px; margin-top: 25px">
            <RouterLink :to="{path:'/product/detail', query: { id: item.productNo }}">
                <div class="card" style="width: 18rem;">
                    <img :src="`${path}${item.productNo}`" class="card-img-top" :alt="`${path}${1}`" style="height: 18rem;">
                    <div class="card-body">
                        <p class="card-text">{{ item.productName }}</p>
                        <p class="card-text">NT. {{ item.unitPrice }}</p>
                    </div>
                </div>
            </RouterLink>
        </div>
    <!-- </div> -->
</template>
    
<script setup>
    // import 'bootstrap/dist/css/bootstrap.min.css'
    // import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    const path = import.meta.env.VITE_PHOTO_URL;
    const props = defineProps(["item"]);
    
</script>
    
<style>
    
</style>