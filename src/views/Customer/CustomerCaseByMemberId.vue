<template>
  <h1>顯示客服回覆列表</h1>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">案件編號</th>
      <th scope="col">問題</th>
      <th scope="col">最後回覆時間</th>
      <th scope="col">最後回覆員工姓名</th>
      <th scope="col">回覆狀態</th>
      <th scope="col">操作</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="cstCase in customerCases" :key="cstCase.id">
      <td>
        <button type="button" class="btn btn-link" @click="callFinishFindMsgByCaseNo(cstCase.caseNo)" :disabled="isDisabled(cstCase.status)">{{cstCase.caseNo}}</button>
      </td>
      <td>{{cstCase.subject}}</td>
      <td>{{cstCase.messageTime}}</td>
      <td>{{cstCase.empName}}</td>
      <td>
        <div v-if="cstCase.status ===0">未回覆</div>
        <div v-else-if="cstCase.status ===1">回覆中</div>
        <div v-else>結案</div>
      </td>
      <td>
        <div v-show="cstCase.status ===1"></div>
        <button type="button" class="btn btn-primary" @click="callFindMsgByCaseNo(cstCase.caseNo)" v-show="cstCase.status ===1 || cstCase.status === 0" style="margin: 3px">詳細回覆內容</button>
      </td>
    </tr>
    </tbody>
  </table>

<!--  <div class="col-4 justify-content-center">-->
<!--    <Paginate :first-last-button="true" first-button-text="&lt;&lt;"-->
<!--              last-button-text="&gt;&gt;" prev-text="&lt;" next-text="&gt;"-->
<!--              :page-count="pages" :initial-page="current" v-model="current"-->
<!--              :click-handler="callFind">-->
<!--    </Paginate>-->
<!--  </div>-->
</template>

<script setup>
import axiosApi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import Paginate from "vuejs-paginate-next"
import {ref, onMounted} from 'vue';
//跳轉用
import {useRouter} from 'vue-router';
const router = useRouter();





//顯示全部發問列表
const customerCases = ref(null);

//根據 memberNo 顯示全部發問列表
const memberNo = sessionStorage.getItem("memberNo");

//提交問題
const customerCase = ref({ });

//pagination start
const pages = ref(3);
const total = ref(0);
const current = ref(1);
const start = ref(1);
const rows = ref(8);
const lastPageRows = ref(0);
// //pagination end

onMounted(function(){
  callFindByMemberNo(memberNo);
});

function callFindByMemberNo(memberNo) {
  console.log("callFindByMemberNo");
  axiosApi.get(`/rest/findMemberCase/${memberNo}`).then(function(response) {
    customerCases.value = response.data;
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

// function callFind(page) {
//   // Swal.fire({
//   //     text: "Loading......",
//   //     showConfirmButton: false,
//   //     allowOutsideClick: false,
//   // });
//   console.log("callFind", page)
//   //計算分頁資訊
//   if(page) {
//     start.value = (page-1) * rows.value;
//     current.value = page;
//   } else {
//     start.value = 0;
//     current.value = 1;
//   }
//
//   axiosApi.get("/rest/allCase", {params: {offset: start.value, fetch:rows.value}}).then(function(response) {
//     customerCases.value = response.data.results;
//     console.log(response.data.results);
//
//     //pagination start
//     total.value =  response.data.total;
//     pages.value = Math.ceil(response.data.total / rows.value)
//     lastPageRows.value = response.data.total % rows.value;
//     //pagination end
//     setTimeout(function() {
//       Swal.close();
//     }, 500);
//   }).catch(function(error) {
//     console.log("callFind error", error);
//     Swal.fire({
//       text: '失敗：'+error.message,
//       icon: 'error',
//       allowOutsideClick: false,
//       confirmButtonText: '確認',
//     }).then(function() {
//       if(error && error.response.status && error.response.status===403) {
//         // router.push("/secure/login");
//       }
//     });
//   });
// }

function callFindMsgByCaseNo(caseNo) {
  axiosApi.get(`/rest/findCaseContent/${caseNo}`).then(function(response) {
    customerCase.value = response.data;
    console.log(response.data);
    setTimeout(function() {
      Swal.close();
    }, 500);
    router.push({path:"/Customer/CaseDetail", query:{caseNumber:caseNo, mNo:memberNo}});//跳轉到根據 caseNo 的回覆畫面
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

function callFinishFindMsgByCaseNo(caseNo) {
  axiosApi.get(`/rest/findCaseContent/${caseNo}`).then(function(response) {
    customerCase.value = response.data;
    console.log(response.data);
    setTimeout(function() {
      Swal.close();
    }, 500);
    router.push({path:"/Customer/FinishCaseDetail", query:{caseNumber:caseNo}});//跳轉到根據 caseNo 的回覆畫面
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

function isDisabled(status) {
  // 假設當 caseNo 為空時禁用按鈕
  return status === 1 || status === 0;
}

</script>

<style scoped>
.table {
  border-collapse: collapse;
  /* 確保邊框不會重疊 */
  width: 100%;

}

.table th,
.table td
{
  border-left: none;
  /* 移除左側邊框 */
  border-top: none;
  border-right: none;
  /* 移除右側邊框 */
  padding: 8px;

}

.table tr {

  border-bottom: 1px solid #c4bfbf;
  /* 設置行與行之間的邊框顏色 */

}

.table th {
  background-color: #FCFCFC;
  text-align: left;

}

.table tr:last-child {
  border-bottom: none;
  /* 移除最後一行的底部邊框 */
}

</style>