<template>
    <div class="row" style="margin: 3%; text-align: center;">
        <h2>搖滾音樂</h2>
        <hr>
        <ProductCard v-for="product in products" :key="product.productNo" :item="product"></ProductCard>
    </div>

    <Observer
        v-if="!(infinteScrollOptions.currentPage > infinteScrollOptions.maxPage)" 
        @is-in-view="handleIsInView"
        @is-outside-view="handleIsOutsideView" />
        
</template>
    
<script setup>
    import { ref, onMounted } from 'vue';
    import axios from '@/plugins/axios.js';
    import ProductCard from '@/components/ProductCard.vue';
    import { throttle } from 'lodash'
    import Observer from "@/components/Observer.vue"

    const products = ref([]);;

    const infinteScrollOptions = ref({
        maxPage: 10,
        limitsPerPage: 4,
        currentPage: 1,
        isInView: false
    })




    const handleLoadmore = throttle(async function() {
    const { limitsPerPage, currentPage, maxPage } = infinteScrollOptions.value;
    if (currentPage > maxPage) return;

    try {
        const newProductsPage = await callFindPops(currentPage, limitsPerPage);
        if (Array.isArray(newProductsPage.content)) {
            products.value = [...products.value, ...newProductsPage.content];
            infinteScrollOptions.value.currentPage += 1;
            } else {
            console.error("newProductsPage.content is not an array", newProductsPage.content);
        }
    } catch (error) {
        console.error("Error loading more products:", error);
    }
    }, 300, { leading: true, trailing: true });

    function handleIsInView() {
        infinteScrollOptions.value.isInView = true;
        handleLoadmore();
    }

    function handleIsOutsideView() {
        infinteScrollOptions.value.isInView = false;
    }

    async function callFindPops(page, size) {
        try {
        const response = await axios.get(`/products/styleFindInf/2`, {
            params: {
            page,
            size
            }
        });
        return response.data;
        } catch (error) {
        console.error("callFindPops error", error);
        return [];
        }
    }

    onMounted(() => {
    handleLoadmore(); // Initial load
    });

</script>
    
<style>
    
</style>