<template>
  <h2>客服問答內容</h2>
  <span style="font-size: 30px; font-weight: 500" >客戶提問：<span v-if="subject">{{subject}}</span></span>

  <div class="card" v-for="msg in caseMessages" :key="msg.id" v-if="caseNo !== null">
    <div class="card-header">
      <span>時間：{{msg.messageTime}}</span><span style="margin: 50px" v-show="msg.employeeName != null">客服： {{msg.employeeName}}</span><span style="margin: 50px" v-show="msg.memberName != null">會員： {{msg.memberName}}</span>
      <span style="float: right" v-show="msg.memberName != null"><button type="button" class="btn btn-outline-info" @click="callUpdateMsgByCaseDetailNo(msg.caseDetailNo)" >編輯</button></span>
    </div>
    <div class="card-body">
      <p class="card-text"><h3>{{msg.message}}</h3></p>
    </div>
  </div>
  <div class="card" v-if="caseNo !== null">
    <div class="card-header">回覆</div>
    <div class="card-body">
      <div class="form-floating card-text">
        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" v-model="answerMessage"></textarea>
        <label for="floatingTextarea2">請輸入回覆</label>
      </div>
      <br>
      <a href="#" class="btn btn-primary" @click="callCreateMessage()">提交回覆</a>
    </div>
  </div>
</template>

<script setup>
import axiosApi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import {ref, onMounted} from 'vue';
//從另一個頁面帶參數跳過來
import {useRoute} from 'vue-router';
const route = useRoute();
const id = ref(route.query.caseNumber);
const mNO =  ref(route.query.mNo);
//跳轉用
import {useRouter} from 'vue-router';
const router = useRouter();


onMounted(function (){
  callFindMsgByCaseNo(id.value);
  callFindSubjectByCaseNo(id.value);
})


//顯示全部回覆訊息
const caseMessages = ref(null);

//根據 caseNo 顯示案件
const caseNoForCase = ref(null);
const subject = ref("");

//根據 caseNo 顯示全部訊息
const caseNo = ref(0);

//根據 caseDetailNo 修改回覆內容
const caseDetail = ref({});

//提交問題
const customerCase = ref({ });
const answerMessage = ref("");


function callCreateMessage(){
  console.log("Call create message");
  Swal.fire({
    text:"loading......",
    showConfirmButton: false,
    allowOutsideClick: false
  });

  // if(customerCase.value.memberNo === ""){
  //   customerCase.value.memberNo = null;
  // }

  console.log(mNO.value);

  let data = {
    "customerCaseNo": id.value,
    "answerMessage" : answerMessage.value,
    "memberNo": mNO.value
  }

  axiosApi.post("/rest/Answer", data)
      .then(function(response) {
        console.log(response.data);
        console.log(response.data.memberNo);
        if(response.data){
          Swal.fire({
            text: response.data.message,
            icon: 'success',
            allowOutsideClick: false,
            confirmButtonText: '確認'
          }).then(function() {
            callFindMsgByCaseNo(id.value);
            answerMessage.value = "";
          });
        } else {
          Swal.fire({
            text: response.data.message,
            icon: 'warning',
            allowOutsideClick: false,
            confirmButtonText: '確認'
          });
        }
      }).catch(function(error) {
    console.log("callCreate error", error);
    Swal.fire({
      text: '失敗' + error.message,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認'
    });
  });
}

function callFindMsgByCaseNo(caseNo) {
  console.log("call findMsgByCaseNo");
  axiosApi.get(`/rest/findCaseContent/${caseNo}`).then(function(response) {
    caseMessages.value = response.data;
    console.log(response.data);
    setTimeout(function() {
      Swal.close();
    }, 500);
  }).catch(function(error) {
    console.log("callFind error", error);
    Swal.fire({
      text: '失敗：'+error.message,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認',
    }).then(function() {
      if(error && error.response.status && error.response.status===403) {
        // router.push("/secure/login");
      }
    });
  });
}

function callFindSubjectByCaseNo(caseNo) {
  axiosApi.get(`/rest/findCase/${caseNo}`).then(function(response) {
    caseNoForCase.value = response.data;
    subject.value = response.data.subject;
    console.log(response.data);
    setTimeout(function() {
      Swal.close();
    }, 500);
  }).catch(function(error) {
    console.log("callFind error", error);
    Swal.fire({
      text: '失敗：'+error.message,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認',
    }).then(function() {
      if(error && error.response.status && error.response.status===403) {
        // router.push("/secure/login");
      }
    });
  });
}

function callUpdateMsgByCaseDetailNo(caseDetailNo) {
  axiosApi.get(`/rest/findContent/${caseDetailNo}`).then(function(response) {
    caseDetail.value = response.data;
    console.log(response.data);
    setTimeout(function() {
      Swal.close();
    }, 500);
    router.push({path:"/Customer/UpdateContent", query:{caseDetailNumber:caseDetailNo}});//跳轉到根據 caseDetailNo 的回覆修改畫面
  }).catch(function(error) {
    console.log("callFind error", error);
    Swal.fire({
      text: '失敗：'+error.message,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認',
    }).then(function() {
      if(error && error.response.status && error.response.status===403) {
        // router.push("/secure/login");
      }
    });
  });
}


</script>

<style scoped>
h3 {
  margin: 5px;
}

.card {
  width: 1000px;
  box-sizing: border-box;
  margin: 30px;
}

.card-header {
  font-size: 30px;
}

</style>