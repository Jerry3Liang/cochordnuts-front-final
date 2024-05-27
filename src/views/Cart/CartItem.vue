<template>
        <div class="  d-flex justify-content-between align-items-center p-3 bg-white mt-4 px-3 rounded row-cols-1 row-cols-2 row-cols-3 row-cols-4" style="font-family: 'Manrope', sans-serif;
background:#eee;">
            <div class="mr-1 text-center col-2">
                <img class="rounded " :src="`http://localhost:8080/products/photo/${eachCartItem.productId}`" width="140">
            </div>
            <div class="d-flex flex-column  product-details col-4">
                <h5 class="d-flex flex-row product-desc ">{{eachCartItem.artist}}</h5>
                <span class="font-weight-bold; col text-start" >{{eachCartItem.productName}}</span>
            </div>
            <div class="text-center d-flex align-items-center col-1 " >
                <!-- <input type="number" id="quantity" name="quantity" min="1" max="5"> -->
                <!-- <span > <i class="fa fa-minus text-danger">- </i></span>  -->


                <!-- <button type="button" class="btn btn-outline-info" @click="decreaseOne(eachCartItem.productId)" to="/cart">-</button>
                <h5 class="text-grey " :value="modelValue" @change="emits('update:modelValue', $event.target.value)" style="margin: 0.5cm;">{{ eachCartItem.count }}</h5>
                <button type="button" class="btn btn-outline-info" @click="increaseOne(eachCartItem.productId)" >+</button> -->
                <button type="button" class="btn btn-outline-info" @click="decreaseOne(eachCartItem)" to="/cart">-</button>
                <h5 class="text-grey " :value="modelValue" @change="emits('update:modelValue', $event.target.value)" style="margin: 0.5cm;">{{ eachCartItem.count }}</h5>
                <button type="button" class="btn btn-outline-info" @click="increaseOne(eachCartItem)" >+</button>
                
                
                <!-- <span> <i class="fa fa-plus text-danger  "> +</i></span> -->
            </div>
            <div class="col col-1" >
                <h5 class="text-grey">${{eachCartItem.price}}</h5>
            </div>
                <!-- <div class="d-flex align-items-center"><i class="fa fa-trash mb-1 text-danger">123211231231</i></div> -->
            </div>                   
                <!-- <h5 style="color:#D4DFD6;">_____________________________________________________________________________________________________________________________</h5> -->
                <h5 style="color:#E7ECEA ;">_______________________________________________________________________</h5>
</template>
<script setup>
    const props = defineProps(["eachCartItem", "modelValue"])
    const emits = defineEmits(["decreaseOne", "increaseOne", "update:modelValue"])

    import axiosapi from '@/plugins/axios.js'

    function increaseOne(id){
        emits("increaseOne",id);
}
    function decreaseOne(id){
        emits("decreaseOne",id);
}
</script>
    
<style scoped>
/* body {
  font-family: 'Manrope', sans-serif;
  background:#eee;
} */
  </style>