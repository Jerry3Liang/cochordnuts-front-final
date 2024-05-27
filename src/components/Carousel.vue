<template>
    <!-- <div style="background-color: gray; width: 500px;"> -->
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img :src="`${path}${6}`" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img :src="`${path}${7}`" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img :src="`${path}${8}`" class="d-block w-100" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    <!-- </div>     -->
</template>
    
<script setup>
    const path = import.meta.env.VITE_PHOTO_URL;
    
</script>
    
<style>
    
</style>