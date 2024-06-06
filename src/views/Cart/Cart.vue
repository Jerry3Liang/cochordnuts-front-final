<template>
  
  <div  class="container mt-5 mb-5 flex">
    <div class="flex justify-content-center row">
      <div style="background-color: rgb(19, 99, 173, 0.214);">
      <!-- <div style="background-color: #cc9999;"> -->
        <div class="p-5">
          <h2>{{ user }} 的購物車 </h2>
        </div>
  
          <CartItem v-for="item in inCart"  :key="item.productId" :eachCartItem="item" 
              @increaseOne="increaseQuanty" @decreaseOne="decreaseQuanty" @deleteThisItem="deleteThisItem"></CartItem>
  
  
        <div class="row; d-flex flex-row align-items-center mt-3 p-2 bg-white rounded" style="margin-bottom: .4cm;">
          <div class="col text-start"> <RouterLink class="btn btn-outline-warning btn-sm ml-2 end" type="button" to="/">回商品頁面</RouterLink></div>
          <div class="col text-end"  >商品總金額: {{totalBeforeDiscount}}</div>
          <div class="col text-end"  >已折扣: {{discountedAmount}}</div>
          <div class="col text-end" style="text-decoration:underline;" >訂單總金額: {{totalAmount}}</div>
          <!-- <CartItem></CartItem> -->
          <div class="rounded col text-end"><button @click="goInertOrder" type="button" class="btn btn-danger btn-block btn-lg ml-2 pay-button">確認購買</button></div> 
        </div>
      </div>
    </div>
  </div>

  <!-- <div>
 <h1>類似商品</h1>
 <ProductCard></ProductCard>   
  </div> -->
  </template>
      
  <script setup >
  
  //import url from 'https://fonts.googleapis.com/css2?family=Manrope:wght@200&display=swap';
  
  import Swal from 'sweetalert2'
  import axiosapi from '@/plugins/axios.js'
  import CartItem from './CartItem.vue'
  import ProductCard from '../../components/ProductCard.vue'
  import router from '@/router/router'
  import { ref, watch } from 'vue'
  import { useRouter } from 'vue-router'
  const cartList=ref([])
  const routerr = useRouter();
  const totalBeforeDiscount = ref(null);
  const totalAmount = ref(null);
  const discountedAmount = ref(null);
  const inCart = ref(null);
  const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
        });
  
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
    function goInertOrder(){
      routerr.push({path:"/order/insert" , query:{cartList:JSON.stringify(cartList.value)}})
    }
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
    else if (memberNo!= null){
      let obj = {
        memberNo: memberNo
      }
      axiosapi.post("/cart/list", obj).then(function(response){
        for (let x = 0; x < response.data.list.length; x++) {
          if (response.data.list[x].inventory<=0) {
            // Swal.fire({
            //   text: `"${response.data.list[x].productName}"已無庫存`,
            //   icon: "warning",
            //   showCancelButton: true,
            //   confirmButtonColor: "#3085d6",
            //   cancelButtonColor: "#d33",
            //   confirmButtonText: `確定`,
            //   cancelButtonText: `聯繫客服`
            // })
            // .then((result) => {
            //   if (result.isConfirmed) {
            //     let obj = {
            //       productId: response.data.list[x].productId,
            //       memberNo: memberNo
            //     } 
            //     axiosapi.post("/cart/deleteItem", obj)
            //     location.reload();
            //   }
            // })
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: "btn btn-danger",
                cancelButton: "btn btn-danger"
              },
              buttonsStyling: true
            });
            swalWithBootstrapButtons.fire({
              // title: "Are you sure?",
              text: `"${response.data.list[x].productName}"已無庫存`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "移出購物車",
              cancelButtonText: "聯繫客服",
              reverseButtons: false
            }).then((result) => {
              if (result.isConfirmed) {
                
                let obj = {
                  productId: response.data.list[x].productId,
                  memberNo: memberNo
                } 
                axiosapi.post("/cart/deleteItem", obj)
                swalWithBootstrapButtons.fire({
                  title: "移除!",
                  text: `"${response.data.list[x].productName}"已移出購物車`,
                  icon: "success"
                }).then(function(){
                  location.reload();

                })
                
                // sleep(2000);
              
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                // swalWithBootstrapButtons.fire({
                //   title: "Cancelled",
                //   text: "Your imaginary file is safe :)",
                //   icon: "error"
                // });
                
                router.push({name: "customer-customerAnswer-link"})
              }
            }
          )
          }
          if (response.data.list[x].count===response.data.list[x].inventory){
            
            Toast.fire({
              icon: "warning",
              title: `${response.data.list[x].productName}已達所有庫存`
            });
            // Swal.fire({
            //   title: "已達所有庫存",
            //   text: `已加入所有"${response.data.list[x].productName}"庫存，共${response.data.list[x].inventory}件`,
            //   icon: "warning",
            //   showCancelButton: false,
            //   showConfirmButton: true,

              // timer: 2000
              
            // })
          //   .then((result) => {
          //     if (result.isConfirmed) {
          //     }
            
          // })
          
        }
      }
            // inCart.count=response.data.inventory;
        
        inCart.value = response.data.list;
        console.log("response.data.list: ", response.data.list);
        // console.log("response.data.list[0].price: ", response.data.list[0].price);
        // console.log("response.data.list[0].count: ", response.data.list[0].count);
        // console.log("response: ", response.data.list[0]);
        console.log("response.data.list.length: ", response.data.list.length);
        for(let i = 0 ; i < response.data.list.length ; i++){
          cartList.value.push(response.data.list[i])
        }
        console.log(cartList.value[0])
        // cartList.value=response.data.list
        totalAmount.value=0;
        discountedAmount.value=0;
        let xx=0
        for (response.data.list[xx]; xx < response.data.list.length; xx++) {
          discountedAmount.value=discountedAmount.value+(response.data.list[xx].count*Math.round((response.data.list[xx].price)-response.data.list[xx].price*response.data.list[xx].discount));
          totalAmount.value = totalAmount.value+(response.data.list[xx].count*Math.round(response.data.list[xx].price*response.data.list[xx].discount));
          totalBeforeDiscount.value = totalBeforeDiscount.value+(response.data.list[xx].count*response.data.list[xx].price);
        }
      })
    }
  }

  listItems();
  
  function increaseQuanty(id) {
    let obj = {
      productId: id.productId,
      memberNo: memberNo
    }
    axiosapi.post("/cart/addOne", obj).then(function(response){
      // inCart.value = response.data.list;
      console.log("response: ",response);
      console.log("response.data.inventory: ",response.data.inventory);
      Toast.fire({
        icon: "success",
        title: `${response.data.productName}數量＋1`
      });
      // totalAmount.value=0
      // listItems();
      // let memberNo=sessionStorage.getItem("memberNo");
      // let obj1 = {
      //   memberNo: memberNo
      // }
      // axiosapi.post("/cart/list", obj1).then(function(response){
      //   console.log("response: ", response);
      // totalAmount.value=item.price;
      // let xx=0
      // for (response.data.list[xx]; xx < response.data.list.length; xx++) {
      //   totalAmount.value = totalAmount.value+(response.data.list[xx].price*response.data.list[xx].count*response.data.list[xx].discount);
      //   listItems();
      // }
      inCart.count=id.count++;
      totalAmount.value=totalAmount.value+Math.round(id.price*id.discount)
      discountedAmount.value=discountedAmount.value+Math.round(id.price-(id.price*id.discount));
      totalBeforeDiscount.value=totalBeforeDiscount.value+(id.price);
      if (response.data.inventory===id.count|response.data.inventory<id.count) {
        id.count=response.data.inventory;
        // console.log("id.count111 =" , id.count);
        console.log("id.count: ", id.count);
        Swal.fire({
          // title: "loading...",
          text: `已達所有"${response.data.productName}"的庫存`,
          icon: "warning",
          showCancelButton: false,
          showConfirmButton: true,
          // timer: 500
        })
      }
    })
  }


  function decreaseQuanty(id) {
    inCart.count=id.count--;
    totalAmount.value=totalAmount.value-Math.round(id.price*id.discount)
    discountedAmount.value=discountedAmount.value-Math.round(id.price-(id.price*id.discount));
    totalBeforeDiscount.value=totalBeforeDiscount.value-(id.price);
    let obj = {
      productId: id.productId,
      memberNo: memberNo
    }
    axiosapi.post("/cart/minusOne", obj).then(function(response){
      // inCart.value = response.data.list;
      console.log("response: ",response);
      // // listItems();
      // let memberNo=sessionStorage.getItem("memberNo");
      // let obj1 = {
      //   memberNo: memberNo
      // }
      // axiosapi.post("/cart/list", obj1).then(function(response){
      //   console.log("response: ", response);
      //   let xx=0
      //   totalAmount.value=0;
      //   for (response.data.list[xx]; xx < response.data.list.length; xx++) {
      //     totalAmount.value = totalAmount.value+(response.data.list[xx].price*response.data.list[xx].count*response.data.list[xx].discount);
      //     listItems();
        // }
    });
  }

  function deleteThisItem(id){
    Swal.fire({
      text: `確定刪除"${id.productName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `確定`,
      cancelButtonText: `取消`
    })
    .then((result) => {
      if (result.isConfirmed) {
        let obj = {
          productId: id.productId,
          memberNo: memberNo
        }
        axiosapi.post("/cart/deleteItem", obj).then(function(response){
          axiosapi.post("/cart/list", obj).then(function(response){
            console.log("response: ", response);
            let xx=0
            totalAmount.value=0;
            discountedAmount.value=0;
            totalBeforeDiscount.value=0;
            for (response.data.list[xx]; xx < response.data.list.length; xx++) {
              totalAmount.value = totalAmount.value+(response.data.list[xx].price*response.data.list[xx].count*response.data.list[xx].discount);
              discountedAmount.value=discountedAmount.value+(response.data.list[xx].count*Math.round((response.data.list[xx].price)-response.data.list[xx].price*response.data.list[xx].discount));
              totalBeforeDiscount.value = totalBeforeDiscount.value+(response.data.list[xx].count*response.data.list[xx].price);
              // listItems();
            }
          });
          Swal.fire({
            title: "Deleted!",
            text: `您已移除"${id.productName}"`,
            icon: "success",
            showCloseButton: true,
            timer: 3000
          }).then(function(){location.reload();})
          
        })
        
      }
    });
  }
  
  
  
  </script>
  
  <style scoped >
  
  body {
    font-family: 'Manrope', sans-serif;
    /* background:#eee; */
  }
  
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