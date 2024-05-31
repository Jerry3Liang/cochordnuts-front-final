<template>
    <!-- <div style="background-color: gray; width: 500px;"> -->
    <!-- <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
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
    </div> -->
    <!-- </div>     -->


    <swiper
        :effect="'coverflow'"
        :grabCursor="true"
        :centeredSlides="true"
        :slidesPerView="'auto'"
        :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
        }"
        :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
        }"
        :pagination="true"
        :modules="modules"
        class="mySwiper"
    >
        <swiper-slide>
            <img :src="`${path}${1}`" /></swiper-slide>
        <swiper-slide>
            <img :src="`${path}${2}`" /></swiper-slide>
        <swiper-slide>
            <img :src="`${path}${3}`" /></swiper-slide>
        <swiper-slide>
            <img :src="`${path}${4}`" /></swiper-slide>
        <swiper-slide>
            <img :src="`${path}${5}`" /></swiper-slide>
        <swiper-slide>
            <img :src="`${path}${6}`" /></swiper-slide>
        <swiper-slide>
            <img :src="`${path}${7}`" /></swiper-slide>
        <swiper-slide>
            <img :src="`${path}${8}`" /></swiper-slide>
        <swiper-slide>
            <img :src="`${path}${9}`"/></swiper-slide>
    </swiper>



</template>
    
<script setup>
    const path = import.meta.env.VITE_PHOTO_URL;
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    
    import 'swiper/css/effect-coverflow';
    import 'swiper/css/pagination';

    import './style.css';

    import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
    const modules = [Autoplay, EffectCoverflow, Pagination];
    
</script>
    
<style>
    
</style>