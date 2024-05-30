<template>
    <div class=" col d-flex  align-items-center p-3 bg-white mt-4 px-3 rounded  " style="font-family: 'Manrope', sans-serif;
background:#eee;">
        <div class="mr-1 text-center col-2">
            <RouterLink :to="`/product/detail?id=${eachCartItem.productId}`" ><img class="rounded " :src="`http://localhost:8080/products/photo/${eachCartItem.productId}`"  width="140"></RouterLink>
        </div>
        <div class="d-flex flex-column  product-details col-3" >
            <h5 class="d-flex flex-row product-desc ">{{eachCartItem.artist}}</h5>
            <RouterLink :to="`/product/detail?id=${eachCartItem.productId}`" style="color: black; text-underline-offset:unset "><span class="font-weight-bold; col text-start" >{{eachCartItem.productName}}</span></RouterLink>
        </div>
        <div class="col col-2" >
            <h5 v-show="eachCartItem.discount==1" class="text-grey">定價： ＄{{eachCartItem.price}}</h5>
        <!-- </div>
        <div  class=" col-2" > -->
            <h5 v-show="eachCartItem.discount!=1" class="text-grey " style="text-decoration: line-through;">定價： ＄{{eachCartItem.price}}</h5>
            <h5 v-show="eachCartItem.discount!=1" style="color: red;">特價： ＄{{Math.round(eachCartItem.discount*eachCartItem.price)}}</h5>
        </div>
        
        <!-- <div class="d-flex align-items-center"><i class="fa fa-trash mb-1 text-danger">123211231231</i></div> -->
        <div class="text-center d-flex align-items-center col-2 " >
            
            <button v-if="eachCartItem.count===1" type="button" class="btn btn-outline-info" @click="decreaseOne(eachCartItem)" disabled >-</button>
            <button v-if="eachCartItem.count!=1" type="button" class="btn btn-outline-info" @click="decreaseOne(eachCartItem)" >-</button>
            <input type="text" size="2" :value="eachCartItem.count" @change="emits('update:modelValue', $event.target.value)">
            <!-- <h5 class="text-grey" :value="modelValue" @change="emits('update:modelValue', $event.target.value)" style="margin: 0.5cm; "min="1">{{ eachCartItem.count }}</h5> -->
            <button v-if="eachCartItem.inventory>eachCartItem.count" type="button" class="btn btn-outline-info" @click="increaseOne(eachCartItem)" >+</button>
            <button v-if="eachCartItem.inventory===eachCartItem.count" type="button" class="btn btn-outline-info" @click="increaseOne(eachCartItem)" disabled >+</button>
            <div  class="col-12" >
                <h5 class="text-grey " style="font:bold;"> 金額： ＄{{Math.round(eachCartItem.discount*eachCartItem.price)*eachCartItem.count}}</h5>
            </div>
            <div  class=" col col-10" >
                <img type="button" src="/delete.png" title="刪除品項" width="25px" alt="刪除品項" style="border-left: .5cm;" @click="deleteThisItem(eachCartItem)" ></img>
            </div>
        </div>
        </div>                   
            <!-- <h5 style="color:#D4DFD6;">_____________________________________________________________________________________________________________________________</h5> -->
            <!-- <h5 class="d-flex " style="color:#E7ECEA ;">___________________________________________________________________________________________________</h5> -->
</template>
<script setup>
const props = defineProps(["eachCartItem", "modelValue"])
const emits = defineEmits(["decreaseOne", "increaseOne", "deleteThisItem", "increaseBtn", "update:modelValue"])



function increaseOne(id){
    emits("increaseOne",id);
}
function decreaseOne(id){
    emits("decreaseOne",id);
}
function deleteThisItem(id){
    emits("deleteThisItem", id)
}
</script>

<style scoped>
/* body {
font-family: 'Manrope', sans-serif;
background:#eee;
} */
input {
    border: cm;
}
</style>