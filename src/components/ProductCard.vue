<template>
    <!-- <div class="row"> -->
        <div class="col-3" style="margin-bottom: 25px; margin-top: 25px">
            <RouterLink :to="{path:'/product/detail', query: { id: item.productNo }}">
                <div class="card" style="width: 18rem;">
                    <img :src="`${path}${item.productNo}`" class="card-img-top" alt="無法載入" style="height: 18rem;">
                    <div class="card-body">
                        <p class="prodtext">{{ item.productName }}</p>
                        <p class="prodtext">{{ item.artistType }}</p>
                        <div v-show="item.discount == 1" style="text-align: left;">
                            <span  class="prodtext" style="font-size: large;">NT. {{ item.unitPrice }}</span>
                        </div>
                        <div v-show="item.discount != 1" style="text-align: left;">
                            <span class="prodtext" style="text-decoration: line-through;">NT. {{ item.unitPrice }}</span>
                            <span class="prodtext" style="color: red; float: right; font-size: large;">NT. {{ Math.round(item.unitPrice * item.discount) }}</span>
                        </div>
                        
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
    .prodtext{
        text-align: left;
        font-size: medium;
        /* text-decoration: none; */
    }
</style>