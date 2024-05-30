<template>

<label for="outputMember" class="form-label"><h2>運送狀態</h2></label> <br/>
        <div class="row text-center justify-content-center mb-5">
                
        </div>

        <div class="row">
                <div class="col">
                <div class="timeline-steps aos-init aos-animate" data-aos="fade-up">
                        <div class="timeline-step">
                        <div class="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2003">
                                <div class="inner-circle"></div>
                                <p class="h6 mt-3 mb-1">訂單成立</p>
                                <p class="h6 text-muted mb-0 mb-lg-0">{{newCreateDate}}</p>
                        </div>
                        </div>
                        <div class="timeline-step">
                        <div class="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2004">
                                <div class="inner-circle"></div>
                                <p class="h6 mt-3 mb-1">備貨</p>
                                <p class="h6 text-muted mb-0 mb-lg-0">{{newPreparationDate}}</p>
                        </div>
                        </div>
                        <div class="timeline-step">
                        <div class="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2005">
                                <div class="inner-circle"></div>
                                <p class="h6 mt-3 mb-1">出貨</p>
                                <p class="h6 text-muted mb-0 mb-lg-0">{{newDispatchDate}}</p>
                        </div>
                        </div>
                        <div class="timeline-step">
                        <div class="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2010">
                                <div class="inner-circle"></div>
                                <p class="h6 mt-3 mb-1">完成訂單</p>
                                <p class="h6 text-muted mb-0 mb-lg-0">{{newCompleteDate}}</p>
                        </div>
                        </div>
                
                </div>
                </div>
        </div>
<label for="outputMember" class="form-label"><h2>購買商品明細</h2></label> 
<table class="table table-striped table-hover table-custom-width">

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
        <tr v-for="(anOrderDetail,index) in OrderDetailDto" :key="index">
                <td  scope="row" >{{index+1}}</td>
                <td>{{anOrderDetail.productName}}</td>
                <td>{{anOrderDetail.price}}</td>
                <td>{{anOrderDetail.discount}}</td>
                <td>{{anOrderDetail.count}}</td>
                <td>{{anOrderDetail.total}}</td>
        </tr>
        </tbody>

</table>

<label for="outputMember" class="form-label"><h2>運送方式</h2></label> 
<table class="table">
        <thead>     
        <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr>
                <td scope="row">運送方式：</td>
                <td>{{deliveryType}}</td>
                <td></td>
                <td></td>
        </tr>
        <tr>
                <th scope="row">{{homeOrConvinientStore}}</th>
                <th>{{address}}</th>
                <th></th>
                <th></th>
        </tr>
        </tbody>
        </table> 



<!-- 收件人資料 -->
<label for="outputMember" class="form-label"><h2>收件人資料</h2></label> 

<table class="table">
        <thead>     
        <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr>
                <td scope="row">姓名：</td>
                <td>{{recipientName}}</td>
                <td></td>
                <td></td>
        </tr>
        <tr>
                <th scope="row">電話：</th>
                <th>{{recipientPhone}}</th>
                <th></th>
                <th></th>
        </tr>
        </tbody>
        </table> 


<!-- 訂單金額 -->
<label for="outputOrder" class="form-label"><h2>訂單金額</h2></label> 

        <table class="table">
        <thead>
                <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                </tr>
        </thead>
        <thead>
                <tr>
                <td  scope="col">運費</td>
                <td scope="col"></td>
                <td scope="col"></td>
                <td scope="col"></td>
                <td scope="col"></td>
                <td scope="col">60</td>
                </tr>
        </thead>
        <thead>
                <tr>
                <th scope="col">訂單金額</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col">{{total}}</th>
                </tr>
        </thead>
        </table>





<label for="outputMember" class="form-label"><h2>付款方式</h2></label> 
<table class="table">
        <thead>     
        <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr>
                <td scope="row">付款方式</td>
                <td>{{payment}}</td>
                <td>{{ isPayByCredit }}</td>
                <td>{{ creditCardNo }}</td>
        </tr>
        <tr>
                <td scope="row">發票方式</td>
                <td>{{receiptType}}</td>
                <td></td>
                <td></td>
        </tr>
        <tr>
                <td scope="row">發票號碼</td>
                <td>{{receipt}}</td>
                <td></td>
                <td></td>
        </tr>
        <tr>
                <th scope="row">訂單編號</th>
                <th>{{id}}</th>
                <th></th>
                <th></th>
        </tr>
        </tbody>
        </table> 
        <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" disabled>{{ note }}</textarea>
                <label for="floatingTextarea2">Comments</label>
        </div>
        <p></p>
        <RouterLink to="/order/userFindAllOrders">

                <button type="button" class="btn btn-primary button-spacing">回上頁</button>
        </RouterLink>

        <button type="button" class="btn btn-primary button-spacing" @click="cancelOrder">取消訂單</button><!-- 狀態改為已取消 -->
        <button type="button" class="btn btn-primary button-spacing" @click="contactService">聯絡客服</button>
        <!-- <button type="button" class="btn btn-primary button-spacing">退貨</button>狀態改為退貨確認中 -->
        <button type="button" class="btn btn-primary button-spacing" @click="buyAgain">再買一次</button><!-- insert OrderDetail至購物車 -->
        <button type="button" class="btn btn-primary button-spacing" @click="doModify" v-show="isModify">修改</button>

</template>

<script setup >
import moment from 'moment';
import Swal from 'sweetalert2';
import axiosapi from '@/plugins/axios.js';
import { ref ,onMounted } from 'vue';


import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
const route=useRoute();
const router=useRouter();


const id= ref(0)



const homeOrConvinientStore = ref('')//判斷送貨方式
const OrderDetailDto=ref([])//orderDetailDto陣列\
const isPayByCredit=ref('')
const isModify=ref(true)//判斷是否顯示修改button

const deliveryType = ref('')//送貨方式
const address= ref('')//地址
const recipientName=ref('')//收件人姓名
const recipientPhone=ref('')//收件人電話
const total = ref(0)//總金額
const payment=ref('')//付款方式
const creditCardNo=ref('')//信用卡號
const receiptType=ref()//發票方式
const receipt=ref('')//發票號碼
const note = ref('')//備註
const preparationDate=ref(null)//備貨日
const dispatchDate=ref(null)//出貨日
const completeDate=ref(null)//完成日

//將取得的order資料 存入下列變數 後續修改訂單可用
const totalCount=ref(0)
const createDate = ref('')
const originAdress=ref('')
const freight=ref(60)
const receiptNo=ref('')
const memberNo=ref(sessionStorage.getItem("memberNo"))
const status=ref('')

const newCreateDate=ref('')
const newPreparationDate=ref('')
const newDispatchDate=ref('')
const newCompleteDate=ref('')
const isCustomerCaseExist=ref(false)
const order = ref(null)//丟給修改的order

onMounted(function(){
id.value=route.query.orderNumber

        findOrderAndOrderDetail()
})

//OrderNo丟給CustomerCase
function contactService(){    
        console.log("isCustomerCaseExist",isCustomerCaseExist.value)
        if(isCustomerCaseExist.value==true){
                console.log("TRUETRUETRUE")
                router.push({path:"/Customer/CustomerCaseByMemberId"})
        }else{
                console.log("FALSSEFDGHJ")
                router.push({path:"/Customer/CustomerAnswerByOrderId",query:{"orderNo":id.value }})
        }    
        

}
function doModify(){
        router.push({path:"/order/modify",query:{"order": JSON.stringify(order.value),"memberNo":memberNo.value}})

}

// moment(createDate.value).format('YYYY-MM-DD')
function cancelOrder(){
        if(status.value=='訂單成立'|| status.value=='備貨中'){
                let data ={
                "orderNo":id.value,
                "creditCardNo":creditCardNo.value,
                "receiptType":receiptType.value,
                "payment":payment.value,
                "totalCount":totalCount.value,
                "totalPay":total.value,
                "deliverType":deliveryType.value,
                "recipientAddress":address.value,
                "recipient":recipientName.value,
                "recipientPhone":recipientPhone.value,
                "note":note.value,
                "preparationDate":preparationDate.value,
                "createDate":createDate.value,
                "address":originAdress.value,
                "freight":freight.value,
                "receiptNo":receiptNo.value,
                "dispatchDate":dispatchDate.value,
                "completeDate":completeDate.value,
                "status":'訂單取消'
        }
                Swal.fire({
                title: "確認取消?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "確認"
                }).then((result) => {
                if (result.isConfirmed) {
                        axiosapi.put(`/orders/update/${memberNo.value}`,data).then(function(response){
                        Swal.fire({
                                title: "取消成功!",
                                icon: "success"
                        });
                        router.push({path: "/"})
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
                }else{
                        Swal.fire({
                                text: '訂單狀態為「'+status.value+'」不可取消',
                                icon: 'error',
                                allowOutsideClick: false,
                                confirmButtonText: '確認',
                                });
                }
        }

function buyAgain(){//再買一次  orderDetail及memberNo帶到下一頁    
        console.log(order.value)
                axiosapi.post(`/cart/buyAgain/${order.value.orderNo}`).then(function(response){
                        console.log("response=", response.data);
                        if(response.data.result==true){
                                router.push({path:"/cart"})
                        }
                }).catch(function(error){
                        console.log("error=", error);

                })
}

//取得Order&orderDetail       
function  findOrderAndOrderDetail(){
        axiosapi.get(`/orders/findByOrderNo/${id.value}`).then(function(response){
        console.log("dofind")
        console.log(response.data)
        isCustomerCaseExist.value=response.data.isCustomerCaseExist;
        console.log("isCustomerCaseExist",isCustomerCaseExist.value)
        order.value=response.data.order
        for(let i =0 ;i<response.data.orderDetailDto.length;i++){//讀取後端傳入OrderDetailDto
                OrderDetailDto.value.push(response.data.orderDetailDto[i])//放入od陣列
        }
        if(response.data.order.createDate!=null){
                        createDate.value=new Date(response.data.order.createDate).toISOString();//轉換為Date物件 
                        newCreateDate.value=moment(createDate.value).format('YYYY-MM-DD HH:mm:ss');//轉換格式顯示網頁
                }
                if(response.data.order.preparationDate!=null){
                        preparationDate.value=new Date(response.data.order.preparationDate).toISOString();//轉換為Date物件
                        newPreparationDate.value=moment(preparationDate.value).format('YYYY-MM-DD HH:mm:ss')//轉換格式顯示網頁
                }
                if(response.data.order.dispatchDate!=null){
                        dispatchDate.value=new Date(response.data.order.dispatchDate).toISOString();//轉換為Date物件
                        newDispatchDate.value=moment(dispatchDate.value).format('YYYY-MM-DD HH:mm:ss')//轉換格式顯示網頁
                }
                if(response.data.order.completeDate!=null){
                        completeDate.value=new Date(response.data.order.completeDate).toISOString();//轉換為Date物件
                        newCompleteDate.value=moment(completeDate.value).format('YYYY-MM-DD HH:mm:ss') //轉換格式顯示網頁
                }
                originAdress.value=response.data.order.address
                receiptNo.value=response.data.order.receiptNo
                memberNo.value=response.data.order.memberNo
                totalCount.value=response.data.order.totalCount
                recipientName.value=response.data.order.recipient
                recipientPhone.value=response.data.order.recipientPhone
                deliveryType.value=response.data.order.deliverType
                total.value=response.data.order.totalPay
                payment.value=response.data.order.payment
                creditCardNo.value=response.data.order.creditCardNo
                receiptType.value=response.data.order.receiptType
                receipt.value=response.data.order.receiptNo
                note.value=response.data.order.note
                status.value=response.data.order.status

                if(status.value=='訂單成立'){
                        isModify.value=true
                }else{
                        isModify.value=false   
                }
                //判斷送貨方式
                if(deliveryType.value=='宅配'){
                        address.value=response.data.order.recipientAddress
                        homeOrConvinientStore.value='地址:'
                }else{
                        address.value=response.data.order.recipientAddress
                        homeOrConvinientStore.value='門市資訊:' 
                }
        
                //判斷付款方式
                if(payment.value=='信用卡'){
                        isPayByCredit.value='信用卡號'
                }

}).catch(function (error) {
        console.log("callCreate error", error);
                Swal.fire({
                        text: '失敗：'+error.message,
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                });

});
}




</script>

<style>
        tr,td{
        border: none !important;
        }
        .button-spacing {
                margin-right: 5px; /* 設定按鈕間的右邊距為 10 像素 */
        }
        body{margin-top:20px;}
        .timeline-steps {
        display: flex;
        justify-content: center;
        flex-wrap: wrap
        }

        .timeline-steps .timeline-step {
        align-items: center;
        display: flex;
        flex-direction: column;
        position: relative;
        margin: 1rem
        }

        @media (min-width:768px) {
        .timeline-steps .timeline-step:not(:last-child):after {
                content: "";
                display: block;
                border-top: .25rem dotted #3b82f6;
                width: 3.46rem;
                position: absolute;
                left: 7.5rem;
                top: .3125rem
        }
        .timeline-steps .timeline-step:not(:first-child):before {
                content: "";
                display: block;
                border-top: .25rem dotted #3b82f6;
                width: 3.8125rem;
                position: absolute;
                right: 7.5rem;
                top: .3125rem
        }
        }

        .timeline-steps .timeline-content {
        width: 10rem;
        text-align: center
        }

        .timeline-steps .timeline-content .inner-circle {
        border-radius: 1.5rem;
        height: 1rem;
        width: 1rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: #3b82f6
        }

        .timeline-steps .timeline-content .inner-circle:before {
        content: "";
        background-color: #3b82f6;
        display: inline-block;
        height: 3rem;
        width: 3rem;
        min-width: 3rem;
        border-radius: 6.25rem;
        opacity: .5
        }


        .table {
                width: 100%;
                border-collapse: collapse;
                table-layout: fixed;
                }

                .table th {
                padding: 8px;
                text-align: left;
                border-bottom: 2px solid #ddd; /* 下划线 */
                }

                .table td {
                padding: 8px;
                text-align: left;
                border: none; /* 移除边框 */
                }

                .form-label {
                display: block;
                margin: 10px 0;
                }

                .button-spacing {
                margin: 5px;
        }
        .table-custom-width th:nth-child(1),
                .table-custom-width td:nth-child(1) {
                width: 5%; /* 調整商品index寬度 */
        }
        .table-custom-width th:nth-child(2),
                .table-custom-width td:nth-child(2) {
                width: 30%; /* 商品第二欄寬度 */
        }
</style>