<template>

    <form class="row g-3 " style="margin-top: 2%;">

        <label for="outputMember" class="form-label">
            <h2>購物車商品明細</h2>
        </label>
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
                <tr v-for="(aCart, index) in cartList" :key="index">
                    <td scope="row">{{ index + 1 }}</td>
                    <td>{{ aCart.productName }}</td>
                    <td>{{ aCart.price }}</td>
                    <td>{{ aCart.discount }}</td>
                    <td>{{ aCart.count }}</td>
                    <td>{{ aCart.price*aCart.count*aCart.discount }}</td>
                </tr>
            </tbody>

        </table>





        <label for="outputMember" class="form-label">
            <h2>會員資料</h2>
        </label>
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
                    <td scope="row">會員姓名:</td>
                    <td>{{ MemberName }}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td scope="row">Email:</td>
                    <td>{{ MemberEmail }}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td scope="row">會員電話:</td>
                    <td>{{ MemberPhone }}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th scope="row">會員地址:</th>
                    <th>{{ MemberAddress }}</th>
                    <th></th>
                    <th></th>
                </tr>
            </tbody>
        </table>

        <label for="inputEmail4" class="form-label">
            <h2>運送資料</h2>
        </label>

        <label for="validationServer04" class="form-label">送貨方式</label>
        <div class="mb-3">
            <select class="form-select" required aria-label="select example" @change="selectDeliveryType"
                v-model="delivertype">
                <option value="宅配" selected>宅配</option>
                <option value="超商取貨">超商取貨</option>
            </select>
            <div class="invalid-feedback">Example invalid select feedback</div>
        </div>
        <div class="col-12" v-show="delivertypeCheck">
            <label for="inputAddress2" class="form-label">請輸入地址</label>
            <div class="form-check" v-show="delivertypeCheck">
            <input class="form-check-input" type="checkbox" value="帶入收件人地址"
                v-model="isMemberAddressImfoChecked" @change="takeRecipientAddress">
            <label class="form-check-label" for="flexCheckChecked">
                帶入收件人地址
            </label>
        </div>
            <input type="text" class="form-control" id="inputAddress2" placeholder="EX:台北市大安區信義路四段265巷12弄1號"
                v-model="homedelivery">
        </div>

    
        <div class="col-12" v-show="delivertypeCheck">
            <div class="d-grid gap-2 d-md-block">
                <button class="btn btn-primary" type="button" @click="insertRecipient">加入常用收件人地址</button>
            </div>
        </div>
    



    



        <div class="col-md-4" v-show="!delivertypeCheck">
            <label for="inputState" class="form-label">縣市</label>
            <select id="inputState" class="form-select" v-model="convientStoreDelivery1" @change="changeCity">
                <option value="" selected>請選擇</option>
                <option v-for="(aCity, index) in cityData" :key="index" :value="aCity">{{ aCity }}</option>
            </select>
        </div>
        <div class="col-md-4" v-show="!delivertypeCheck">
            <label for="inputState" class="form-label">地區</label>
            <select id="inputState" class="form-select" v-model="convientStoreDelivery2">
                <option value="" selected>請選擇</option>
                <option v-for="(area, index) in areaData" :key="index" :value="area">{{ area }}</option>
                <option value="中正區">中正區</option>
                <option value="大安區">大安區</option>
                <option value="大同區">大同區</option>
            </select>
        </div>
        <div class="col-md-2" v-show="!delivertypeCheck">
            <label for="inputZip" class="form-label">門市編號</label>
            <input type="text" class="form-control" v-model="convientStoreDelivery3">
        </div>
        <div class="col-12">

        </div>


        <label for="inputEmail4" class="form-label">
            <h2>收件人資料</h2>
        </label>

        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="帶入會員資料" id="MemberImfoChecked"
                v-model="isMemberImfoChecked" @change="useMemberImformatuion">
            <label class="form-check-label" for="flexCheckChecked">
                帶入會員資料
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="帶入常用收件人資料" id="RecipientImfoChecked"
                v-model="isRecipientImfoChecked" @change="useRecipientImformatuion">
            <label class="form-check-label" for="flexCheckChecked">
                帶入常用收件人資料
            </label>
        </div>

        <div class="col-5">
            <label for="inputName" class="form-label">收件人姓名</label>
            <input type="text" class="form-control" id="inputName" placeholder="" v-model="recipientName">
        </div>
        <br>
        <div class="col-5">
            <label for="inputPhone" class="form-label">收件人電話</label>
            <input type="text" class="form-control" id="inputPhone" placeholder="" v-model="recipientPhone">
        </div>


        <div class="col-12" v-show="isShowInsertRecipient">
            <div class="d-grid gap-2 d-md-block">
                <button class="btn btn-primary" type="button" @click="insertRecipient">加入常用收件人</button>
            </div>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th scope="col">運費</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">60</th>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th scope="col">訂單金額</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">{{ total }}</th>
                </tr>
            </thead>
        </table>
        <label for="inputEmail4" class="form-label">
            <h2>付款方式</h2>
        </label>


        <div class="mb-3">
            <select class="form-select" required aria-label="select example" @change="selectPayment" v-model="payment">
                <option value="" selected>請選擇</option>
                <option value="現金">現金(僅限超商取貨)</option>
                <option value="信用卡">信用卡</option>
                <option value="LinePay">LinePay</option>
            </select>
            <div class="invalid-feedback">Example invalid select feedback</div>
        </div>

        <br>


        <div class="col-md-3" v-show="isPayByCredit">
            <label for="inputState" class="form-label">銀行代號</label>
            <select id="inputState" class="form-select" v-model="bankNo" @change="checkBankNo">
                <option value="" selected>請選擇</option>
                <option value="004">004臺灣銀行</option>
                <option value="005">005台灣土地銀行</option>
                <option value="006">006合作金庫銀行</option>
            </select>
            <span style="color: red;" v-show="isBankNoNull">請選擇銀行代碼</span>
        </div>
        <div class="col-9" v-show="isPayByCredit">
            <label for="inputCredit" class="form-label">請輸入信用卡號<span style="color: #004B97	;">{{ creditType
                    }}</span></label>
            <input type="number" class="form-control" id="inputCredit" placeholder="" @blur="checkCreditNo"
                v-model="creditNo">
            <span style="color: red;" v-show="isCreditNoCorrect">請輸入正確信用卡號碼</span>

        </div>


        <label for="inputEmail4" class="form-label">
            <h2>發票方式</h2>
        </label>

        <div class="col-md-3">
            <label for="inputState" class="form-label">請選擇發票方式</label>
            <select id="inputState" class="form-select" v-model="receipType" @change="selectReceipType">
                <option value="" selected>請選擇</option>
                <option value="電子信箱">email</option>
                <option value="載具">電子載具</option>

            </select>
        </div>
        <div class="col-9" v-show="isReceipTypeCarrier">
            <label class="form-label">請輸入載具號碼</label>
            <input type="text" class="form-control" id="cloudInvoice" placeholder="">
        </div>
        
        <div class="input-group">
            <span class="input-group-text">備註</span>
            <textarea class="form-control" aria-label="With textarea" v-model="note"></textarea>
        </div>

        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <RouterLink to="/cart">
                <button class="btn btn-primary" type="button">回購物車</button>
            </RouterLink>
            
            <button class="btn btn-primary" type="button" @click="ckeckOut">結帳</button>
        </div>

    </form>

</template>

<script setup>
import Swal from 'sweetalert2';
import axiosapi from '@/plugins/axios.js';
import { ref, onMounted } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { data as taiwanData } from "@/taiwan_districts.js"
const isMemberAddressImfoChecked=ref(false)
const routee=useRoute()
const cartList=ref(JSON.parse(routee.query.cartList))
const route = useRouter();
const delivertype = ref("宅配")
const delivertypeCheck = ref(true)
const isPayByCredit = ref(true)
const homedelivery = ref('')
const convientStoreDelivery1 = ref('')
const convientStoreDelivery2 = ref('')
const convientStoreDelivery3 = ref('')
const recipientName = ref('')
const recipientPhone = ref('')
const payment = ref('信用卡')
const creditNo = ref('')//信用卡號碼
const creditType = ref('')//信用卡類別Visa、masterCard
const receipType = ref('')
const isReceipTypeCarrier = ref(false)
const isCreditNoCorrect = ref(false)
const bankNo = ref('')//銀行編號
const isBankNoNull = ref(false)
const total = ref(0)//所有購買商品金額相加
const totalCount = ref(0)//所有購買商品數量
const note = ref('')
const member = ref(null)
const MemberName = ref('')//後端傳回的Member資料
const MemberEmail = ref('')//後端傳回的Member資料
const MemberPhone = ref('')//後端傳回的Member資料
const MemberAddress=ref('')
const MemberRecipient = ref('')//後端傳回的Member資料
const MemberRecipientPhone = ref('')//後端傳回的Member資料
const isMemberImfoChecked = ref(false)
const MemberRecipientAddress=ref('')
const orderNo = ref(0)

const cityData = ref([])
const areaData = ref([])
const isShowInsertRecipient = ref(true)//是否顯示加入常用收件人Button
const isRecipientImfoChecked = ref(false)
const memberNo = ref(sessionStorage.getItem("memberNo"))
const url = new URL(window.location.href);
const host = ref(url.origin);
onMounted(function () {
    getCart()
})
//將 taiwan_districts.js中的city放入cityData
for (let i = 0; i < taiwanData.length; i++) {
    cityData.value.push(taiwanData[i].name)
}
//每當選擇縣市 就重新設定areaData
function changeCity() {

    areaData.value = [];
    for (let i = 0; i < taiwanData.length; i++) {
        if (convientStoreDelivery1.value == taiwanData[i].name) {
            for (let j = 0; j < taiwanData[i].districts.length; j++) {
                areaData.value.push(taiwanData[i].districts[j].name)
            }

        }
    }
}
function takeRecipientAddress(){
    if(isMemberAddressImfoChecked.value==true){
        
        homedelivery.value=MemberRecipientAddress.value
    }else{
        isMemberAddressImfoChecked.value=false
        homedelivery.value=""
    }

}
function selectPayment(){
        if(payment.value=='信用卡'){
            isPayByCredit.value=true
        }else{
            if(payment.value=='現金' && delivertype.value=='宅配'){
                Swal.fire({
                    text: '宅配不可現金付款',
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonText: '確認',
                });
                payment.value="信用卡"
                isPayByCredit.value=true
            }else{
                isPayByCredit.value=false
            }
            
        }
    }
function checkBankNo() {

    if (bankNo.value == "") {
        isBankNoNull.value = true
    } else {
        isBankNoNull.value = false
    }



}
function checkCreditNo() { //信用卡驗證

    if (bankNo.value == "") {
        isBankNoNull.value = true
    } else {
        isBankNoNull.value = false
    }
    let creditNoStr = creditNo.value.toString();//creditNo型態為number 轉型為String以做判斷
    let sum = evenNum(creditNoStr) + oddNum(creditNoStr);
    let resultNum = sum % 10;
    if (resultNum != 0) {
        resultNum = 10 - resultNum;
    }

    if (resultNum !== creditNoStr[15] * 1) {
        
        isCreditNoCorrect.value = true;
    } else {
        if (creditNoStr[0] === "5") {
            console.log("MASTER CARD");
            creditType.value = 'MASTER CARD'
            isCreditNoCorrect.value = false;
        } else {
            console.log("VISA");
            isCreditNoCorrect.value = false;
            creditType.value = 'VISA'
        }
    }

    //偶數位加總
    function evenNum(creditNoStr) {
        let sum = 0;
        for (let i = 1; i <= 13; i += 2) {
            let resultNum = Number(creditNoStr[i]);
            sum += resultNum;
        }
        return sum;
    }
    //奇數位加總
    function oddNum(creditNoStr) {
        let sum = 0;
        for (let i = 0; i <= 15; i += 2) {
            let resultNum = Number(creditNoStr[i]) * 2;
            if (resultNum >= 10) {
                resultNum -= 9;
            }
            sum += resultNum;
        }
        return sum;
    }





}
function selectReceipType() {
    if (receipType.value == "載具") {
        isReceipTypeCarrier.value = true
    } else {
        isReceipTypeCarrier.value = false
    }

}
function useMemberImformatuion() {//帶入會員資料

    if (isMemberImfoChecked.value == true) {
        isRecipientImfoChecked.value = false
        recipientName.value = MemberName.value
        recipientPhone.value = MemberPhone.value
        isShowInsertRecipient.value = false
    } else {
        isShowInsertRecipient.value = true
        isMemberImfoChecked.value = false
        recipientName.value = ""
        recipientPhone.value = ""
    }
}

function useRecipientImformatuion() {//帶入常用收件人
console.log(MemberRecipientPhone.value)
    if (isRecipientImfoChecked.value == true) {
    
        recipientName.value = MemberRecipient.value
        recipientPhone.value =MemberRecipientPhone.value
        isMemberImfoChecked.value = false
        isShowInsertRecipient.value = false
    } else {
        isShowInsertRecipient.value = true
        isRecipientImfoChecked.value = false
        recipientName.value = ""
        recipientPhone.value = ""
    }

}

//insert常用收件人
function insertRecipient() {

        
        let memberData={
            "recipientAddress":homedelivery.value,
            "recipient":recipientName.value,
            "recipientPhone":recipientPhone.value
        }

        axiosapi.put(`/member/updateRecipient/${memberNo.value}`, memberData).then(function (response) {
            if(response.data.success==true){
                Swal.fire({
                text: "新增成功",
                icon: 'success',
                allowOutsideClick: false,
                confirmButtonText: '確認',
            });
            }else{
                Swal.fire({
                text: "新增失敗",
                icon: 'warning',
                allowOutsideClick: false,
                confirmButtonText: '確認',});
            }
            
            console.log(response)
        }).catch(function (error) {
            console.log("error", error);
            Swal.fire({
                text: '失敗：' + error.message,
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonText: '確認',
            });
        });
    

}

//取得購物車內容
function getCart() {
console.log(memberNo.value)
    axiosapi.get(`/orders/findCartByMemberNo/${memberNo.value}`).then(function (response) {//預設會員1號
        // member.value=response.data.member
        MemberName.value = response.data.name;
        MemberEmail.value = response.data.email;
        MemberPhone.value = response.data.phone;
        MemberAddress.value = response.data.address;
        MemberRecipient.value= response.data.recipient;
        MemberRecipientPhone.value= response.data.recipientPhone;
        MemberRecipientAddress.value=response.data.recipientAddress;
        console.log(response.data.recipientAddress)
        
        
    
        console.log(response.data)
        total.value = 0;
        
        for(let i = 0 ; i <cartList.value.length ; i++){
            
            total.value+=cartList.value[i].count*cartList.value[i].price*cartList.value[i].discount
        }
    
        total.value += 60
        total.value=Math.ceil(total.value)
console.log(total.value)

    }).catch(function (error) {
        console.log("error", error);
        Swal.fire({
            text: '失敗：' + error.message,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });

    });


}

function selectDeliveryType() {
    if (delivertype.value == "宅配") {
        isPayByCredit.value = true
        delivertypeCheck.value = true
        payment.value = "信用卡"
    } else {

        delivertypeCheck.value = false;
        payment.value = ""
        isPayByCredit.value = false
    }
}
function ckeckOut() {//結帳
    let recipientaddress;
    if (delivertype.value == "宅配") {
        recipientaddress = homedelivery.value

    } else {
        recipientaddress = convientStoreDelivery1.value + " " + convientStoreDelivery2.value + " " + convientStoreDelivery3.value

    }

    let data = {
        "creditCardNo": creditNo.value,
        "receiptType": receipType.value,
        "payment": payment.value,
        "totalCount": totalCount.value,
        "totalPay": total.value,
        "deliverType": delivertype.value,
        "recipientAddress": recipientaddress,
        "recipient": recipientName.value,
        "recipientPhone": recipientPhone.value,
        "note": note.value
    }
    //判斷資料是否有填寫 收件人姓名、電話、地址、付款方式、發票方式
    if (recipientaddress == null || recipientaddress == "" ||
        recipientName.value == null || recipientName.value == "" ||
        recipientPhone.value == null || recipientPhone.value == "" ||
        payment.value == null || payment.value == "" ||
        receipType.value == null || receipType.value == "") {
        Swal.fire({
            text: '資料未填寫完整',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });

        //若付款方式為信用卡 驗證信用卡號是否為空
    } else {
        if (creditNo.value == '信用卡' && creditNo.value == "") {
            Swal.fire({
                text: '資料未填寫完整',
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonText: '確認',
            });

        } else {

            axiosapi.post(`/orders/insert/${memberNo.value}`,data).then(function(response){//預設會員1號
                    Swal.fire({
                                    text: "下單成功",
                                    icon: 'success',
                                    allowOutsideClick: false,
                                    confirmButtonText: '確認',
                            });
                    console.log(response)
                    orderNo.value=response.data.orderNo;
                    if(payment.value=='LinePay'){
                                        let linePayData={
                                            "productName": `CoChordNut唱片行 訂單編號：${orderNo.value}`,
                                            "amount": total.value,
                                            "currency": "TWD",
                                            "orderId": orderNo.value ,
                                            "confirmUrl": `${host.value}/order/paymentSuccess?orderNumber=${orderNo.value}&amount=${total.value}`
                                        }

                                        axiosapi.post("/makePayment",linePayData).then(function(paymentResponse){
                                    
                                            if(paymentResponse.data.returnCode=='0000'){
                                                let paymentUrl = paymentResponse.data.info.paymentUrl.web;
                                                window.location.href = paymentUrl;
                                            }else{
                                                console.log('XXXXXXXXXXXXXXX')
                                            }
                                            

                                                console.log(response)
                                        }).catch(function (error) {
                                            console.log(error)

                                        });  

                    }else{
                        //非Linepay
                        route.push({path: "/order/OrderDetail", query:{orderNumber:orderNo.value}})//跳頁 將orderNo帶到下一頁

                    }
                                    
                }).catch(function (error) {
                        console.log("error", error);
                        Swal.fire({
                            text: '失敗：'+error.message,
                            icon: 'error',
                            allowOutsideClick: false,
                            confirmButtonText: '確認',
                        });
                
                });            
            }
        }
    }


</script>

<style></style>