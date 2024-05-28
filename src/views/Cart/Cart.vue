<template>
  
  <div  class="container mt-5 mb-5">
    <div class="d-flex justify-content-center row">
      <div class="col-md-10" style="background-color: aliceblue;">
        <div class="p-5">
          <h2>Shopping cart {{ memberNo }} : {{ user }}</h2>
        </div>
  
          <CartItem v-for="item in inCart" v-model="inCart" :key="item.productId" :eachCartItem="item"
              @increaseOne="increaseQuanty" @decreaseOne="decreaseQuanty" ></CartItem>
  
  
        <div class="row; d-flex flex-row align-items-center mt-3 p-2 bg-white rounded" style="margin-bottom: .4cm;">
          <div class="col text-start"> <RouterLink class="btn btn-outline-warning btn-sm ml-2 end" type="button" to="/">回商品頁面</RouterLink></div>
          <div class="col text-end"  >總金額: {{totalAmount}}</div>
          <div class="rounded col text-end"><RouterLink class="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button" to="/order/insert">確認購買</RouterLink></div> 
        </div>
      </div>
    </div>
  </div>
  </template>
      
  <script setup >
  
  //import url from 'https://fonts.googleapis.com/css2?family=Manrope:wght@200&display=swap';
  
  import Swal from 'sweetalert2'
  import axiosapi from '@/plugins/axios.js'
  import CartItem from './CartItem.vue'
  import router from '@/router/router'
  import { ref } from 'vue'
  
  const totalAmount = ref(null);
  const inCart = ref(null);
  
  
    let user=sessionStorage.getItem("userName")
    let memberNo=sessionStorage.getItem("memberNo");
  
    Swal.fire({
      title: "loading...",
      text: "購物車",
      // icon: "success",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 500
      
    })
    
    function listItems(){
    let memberNo=sessionStorage.getItem("memberNo");
    if(memberNo=== null) {
      memberNo= "0"
      let obj = {
        memberNo: memberNo
      }
      
      axiosapi.post("/cart/list", obj).then(function(response){
        console.log("response: ", response);
        Swal.fire({
          title: response.data.message,
          text: "",
          // icon: "success",
          showCancelButton: false,
          showConfirmButton: true,
          //   timer: 1000
        })
        router.push({name: "login-link"})
      })
    }
    else{
      let obj = {
        memberNo: memberNo
      }
      axiosapi.post("/cart/list", obj).then(function(response){
        inCart.value = response.data.list;
        // console.log("response: ", response.data.list);
        // console.log("response.data.list[0].price: ", response.data.list[0].price);
        // console.log("response.data.list[0].count: ", response.data.list[0].count);
        // console.log("response: ", response.data.list[0]);
        console.log("response.data.list.length: ", response.data.list.length);
        
        totalAmount.value=0;
        let xx=0
        for (response.data.list[xx]; xx < response.data.list.length; xx++) {
          totalAmount.value = totalAmount.value+(response.data.list[xx].price*response.data.list[xx].count*response.data.list[xx].discount);
        }
      })
    }
  }
  listItems();
  
    function increaseQuanty(id) {
      inCart.count=id.count++;
      let obj = {
        productId: id.productId,
        memberNo: memberNo
      }
      
      axiosapi.post("/cart/addOne", obj).then(function(response){
        inCart.value = response.data.list;
        console.log("response: ",response);
        // listItems();
        let memberNo=sessionStorage.getItem("memberNo");
        let obj1 = {
          memberNo: memberNo
        }
        axiosapi.post("/cart/list", obj1).then(function(response){
          console.log("response: ", response);
          totalAmount.value=0;
          let xx=0
          for (response.data.list[xx]; xx < response.data.list.length; xx++) {
            totalAmount.value = totalAmount.value+(response.data.list[xx].price*response.data.list[xx].count*response.data.list[xx].discount);
            listItems();
          }
        })
        
      }
    );
    }
                          
                          
    function decreaseQuanty(id) {
      // if(id.count>0){
        inCart.count=id.count--;
        
    
        let obj = {
        productId: id.productId,
        memberNo: memberNo
      }
  
      axiosapi.post("/cart/minusOne", obj).then(function(response){
      inCart.value = response.data.list;
      console.log("response: ",response);
      // listItems();
      let memberNo=sessionStorage.getItem("memberNo");
      let obj1 = {
        memberNo: memberNo
      }
      axiosapi.post("/cart/list", obj1).then(function(response){
        console.log("response: ", response);
        let xx=0
        totalAmount.value=0;
        for (response.data.list[xx]; xx < response.data.list.length; xx++) {
          totalAmount.value = totalAmount.value+(response.data.list[xx].price*response.data.list[xx].count*response.data.list[xx].discount);
          listItems();
        }
      }
      );
      });
      }
    // }
  
    
  
  
  </script>
  
  <style scoped >
  /* 
  body {
    font-family: 'Manrope', sans-serif;
    background:#eee;
  } */
  
  .size span {
    font-size: 11px;
  }
  
  
  .pay-button:hover {
    color: #fff;
  }
  
  .pay-button:focus {
    color: #fff;
    box-shadow: none;
  }
  
  .text-grey {
    color: #a39f9f;
  }
  
  </style>