<template>
    <form class="row g-3">
<label for="outputMember" class="form-label"><h2>購物車商品明細</h2></label> 
    <table class="table table-striped table-hover">

    <thead>
    <tr>
        <th scope="col"></th>
        <th scope="col">商品名稱</th>
        <th scope="col">單價</th>
        <th scope="col">折扣</th>
        <th scope="col">數量</th>
        <th scope="col">小計</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(anOrderDetail,index) in orderDetail" :key="index">
        <th  scope="row" >{{index+1}}</th>
        <td>{{anOrderDetail.productName}}</td>
        <td>{{anOrderDetail.productUnitPrice}}</td>
        <td>{{anOrderDetail.discount}}</td>
        <td>{{anOrderDetail.productBoughtCount}}</td>
        <td>{{anOrderDetail.productTotalPay}}</td>
    </tr>
    </tbody>
    
    </table>

    <label for="inputEmail4" class="form-label"><h2>修改運送資料</h2></label>   
    
    <label for="validationServer04" class="form-label">送貨方式</label>
    <div class="mb-3">
        <select class="form-select" required aria-label="select example"  v-model="order.deliverType" @change="selectDeliveryType">
        <option value="宅配" selected>宅配</option>
        <option value="超商取貨">超商取貨</option>
        </select>
        <div class="invalid-feedback">Example invalid select feedback</div>
    </div>
<div class="col-12" v-show="delivertypeCheck" >
    <label for="inputAddress2" class="form-label">請輸入地址</label>
    
    <input type="text" class="form-control" id="inputAddress2" placeholder="EX:台北市大安區信義路四段265巷12弄1號" v-model="order.address">
</div>
<div class="col-md-4" v-show="!delivertypeCheck">
    <label for="inputState" class="form-label" >縣市</label>
    <select id="inputState" class="form-select" v-model="city" @change="changeCity">
    <option value="" selected>請選擇</option>
    <option v-for="(aCity,index) in cityData" :key="index" :value="aCity">{{ aCity }}</option>
    </select>
</div>
<div class="col-md-4" v-show="!delivertypeCheck">
    <label for="inputState" class="form-label">地區</label>
    <select id="inputState" class="form-select" v-model="district">
    <option value="" selected>請選擇</option>
    <option v-for="(area,index) in areaData" :key="index" :value="area">{{ area }}</option>
    </select>
</div>
<div class="col-md-2" v-show="!delivertypeCheck">
    <label for="inputZip" class="form-label" >門市編號</label>
    <input type="text" class="form-control" v-model="storeNumber">
</div>


<label for="inputEmail4" class="form-label"><h2>修改收件人資料</h2></label>
<div class="col-5">
<label for="inputName" class="form-label">收件人姓名</label>
<input type="text" class="form-control" id="inputName" placeholder="" v-model="order.recipient">
</div>
<br>
<div class="col-5">
<label for="inputPhone" class="form-label" >收件人電話</label>
<input type="text" class="form-control" id="inputPhone" placeholder="" v-model="order.recipientPhone">
</div>
<div class="input-group">
    <span class="input-group-text">備註</span>
    <textarea class="form-control" aria-label="With textarea" v-model="order.note"></textarea>
    </div>
</form>
<br/>
<button class="btn btn-primary button-spacing" type="button" @click="confirmModify">確認修改</button> 
<button class="btn btn-primary button-spacing" type="button" @click="cancelModify">取消修改</button> 
</template>
    
<script setup>
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useRoute ,useRouter} from 'vue-router';
import { data as taiwanData } from "@/taiwan_districts.js"

const route=useRoute()
const router=useRouter()
const memberNo=ref(route.query.memberNo)
const order=ref(JSON.parse(route.query.order))
const orderDetail = order.value.orderDetail

const cityData=ref([])
const areaData=ref([])

   //將 taiwan_districts.js中的city放入cityData
    for(let i= 0 ; i < taiwanData.length ; i++){
        cityData.value.push(taiwanData[i].name)   
    }
    //每當選擇縣市 就重新設定areaData
    function changeCity(){
        areaData.value=[];
        for(let i= 0 ; i < taiwanData.length ; i++){
            if(city.value==taiwanData[i].name){                
                for(let j =0 ;  j < taiwanData[i].districts.length ; j++){
                    areaData.value.push(taiwanData[i].districts[j].name)
                }

            }
        }
    }





//切割超商取貨門市資料
const city =ref(null);
const district =ref(null);
const storeNumber =ref(null);
const delivertypeCheck=ref(true)
if(order.value.deliverType=='宅配'){
    delivertypeCheck.value=true
}else{
    delivertypeCheck.value=false
}
if(order.value.deliverType=='超商取貨'){
const inputString=ref(order.value.recipientAddress)
const stringInput = inputString.value.toString(); 
const parts = stringInput.split(' ');
city.value = parts[0];
district.value = parts[1];
storeNumber.value = parts[2];
console.log("test",storeNumber.value)
}





if(city.value!=null || city.value!=""){
    for(let i= 0 ; i < taiwanData.length ; i++){
            if(city.value==taiwanData[i].name){                
                for(let j =0 ;  j < taiwanData[i].districts.length ; j++){
                    areaData.value.push(taiwanData[i].districts[j].name)
                }
            }
        }

}
function selectDeliveryType(){
    console.log(order.value.deliverType)
    if(order.value.payment=='現金'){
        order.value.deliverType='超商取貨'
        Swal.fire({
                    text: '現金付款不可選擇宅配',
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonText: '確認',
                });

    }
    if(order.value.deliverType=='宅配'){
        delivertypeCheck.value=true
    }else{       
        delivertypeCheck.value=false;

    }
    }
console.log(city.value)
console.log(district.value)
function confirmModify(){
    if(order.value.deliverType=='超商取貨'){
        order.value.recipientAddress=city.value+" "+district.value+" "+storeNumber.value
        console.log(typeof order.value.recipientAddress)
        console.log(order.value.recipientAddress)
    } 
    order.value.createDate=new Date(order.value.createDate).toISOString();//傳換為Date物件 
    console.log(order.value.recipientAddress)
    let data={
                "orderNo":order.value.orderNo,
                "creditCardNo":order.value.creditCardNo,
                "receiptType":order.value.receiptType,
                "payment":order.value.payment,
                "totalCount":order.value.totalCount,
                "totalPay":order.value.totalPay,
                "deliverType":order.value.deliverType,
                "recipientAddress":order.value.recipientAddress,
                "recipient":order.value.recipient,
                "recipientPhone":order.value.recipientPhone,
                "note":order.value.note,
                "createDate":order.value.createDate,
                "address":order.value.address,
                "freight":order.value.freight,
                "receiptNo":order.value.receiptNo,  
                "status": order.value.status 
    }
    Swal.fire({
                title: "確認修改?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "確認"
    }).then((result) => {
        if (result.isConfirmed) {
            axiosapi.put(`/orders/update/${memberNo.value}`,data).then(function(response){              
                        Swal.fire({
                                text: "修改完成",
                                icon: 'success',
                                allowOutsideClick: false,
                                confirmButtonText: '確認',
                        });
                        router.push({path: "/order/userFindAllOrders"})

                        }).catch(function (error) {
                        Swal.fire({
                        text: '失敗：'+error.message,
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                        });
                        });

        }



    });


}

function cancelModify(){
    router.push({path:"/order/userFindAllOrders"})
}

</script>
    
<style>
.button-spacing {
                margin-right: 5px; /* 設定按鈕間的右邊距為 10 像素 */
        } 
</style>