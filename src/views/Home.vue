<template>
    <div style="margin: auto;">
        <Carousel></Carousel>
    </div>
    <div v-if="showRecommend">
        <Recommend></Recommend>
    </div>
    <div>
        <BestProducts></BestProducts>
    </div>
    <div>
        <PreorderProducts></PreorderProducts>
    </div>
    <div>
        <DiscountProducts></DiscountProducts>
    </div>

    


</template>

<script setup>
import Carousel from '../components/Carousel.vue';
import NavigationBar from "@/views/Navbar.vue";
// import Products from '@/views/pages/Products.vue';
import BestProducts from './Product/BestProducts.vue';
import DiscountProducts from './Product/DiscountProducts.vue';
import PreorderProducts from './Product/PreorderProducts.vue';
import Recommend from './Product/Recommend.vue';
import { ref, onMounted } from 'vue';
import axiosapi from "@/plugins/axios.js";
import { useRouter } from 'vue-router';
const router = useRouter();

const showRecommend = ref(false);

//Google 第三方登入
const googleName = ref("");
const googleEmail = ref("");
const isGoogleLogined = ref("");
const memberNo = ref("");
const lastLoginTime = ref("");

//LINE 第三方登入
// const lineName = ref("");
// const lineImgPath = ref("");
// const isLineLogined = ref(false);

onMounted(function(){
  checkLogin();
})

function checkLogin(){
    let memberNo = sessionStorage.getItem("memberNo");
    if(memberNo==null || memberNo==0 || memberNo==""){
        showRecommend.value = false;
    } else {
        showRecommend.value = true;
    }
}

const handleGoogleCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  if (code) {
    try {
      //拿 authorization code 換 access token
      const exchangeTokenResponse = await axiosapi.post('/google/exchangeToken', {
        code: code
      });
      const accessToken = exchangeTokenResponse.data.access_token;

      //使用 access token 來取得使用者的 Google 資料
      const userInfoResponse = await axiosapi.get('/google/getGoogleUser', {
        params: {
          accessToken: accessToken
        }
      });

      //將使用者資訊存於 Session
      console.log('User Info:', userInfoResponse.data);
      sessionStorage.setItem("googleName", userInfoResponse.data.name);
      sessionStorage.setItem("googleEmail", userInfoResponse.data.email);
      sessionStorage.setItem("isGoogleLogin", userInfoResponse.data.isGoogleLogin);
      sessionStorage.setItem("memberNo", userInfoResponse.data.memberNo);
      sessionStorage.setItem("lastLoginTime", userInfoResponse.data.lastLoginTime);
      googleName.value = userInfoResponse.data.name;
      googleEmail.value = userInfoResponse.data.email;
      isGoogleLogined.value = userInfoResponse.data.verified_email;
      memberNo.value = userInfoResponse.data.memberNo;
      window.location.reload();
    } catch (error) {
      console.error('Error during token exchange or fetching user info:', error);
    }
  }
};

//頁面一跳回馬上處理第三方登入 access token
onMounted(() => {
  handleGoogleCallback();
  memberNo.value = sessionStorage.getItem("googleMemberNo");
  googleName.value = sessionStorage.getItem("googleName");
  googleEmail.value = sessionStorage.getItem("googleEmail");
  isGoogleLogined.value = sessionStorage.getItem("isGoogleLogin");
  lastLoginTime.value = sessionStorage.getItem("lastLoginTime");
});

// const handleLineCallback = async () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const code = urlParams.get('code');
//
//   if (code) {
//     try {
//       //拿 authorization code 換 access token
//       const exchangeTokenResponse = await axiosapi.post("/line/exchangeToken", {
//         code: code
//       });
//       const accessToken = exchangeTokenResponse.data.access_token;
//
//       //使用 access token 來取得使用者的 Line 資料
//       const userInfoResponse = await axiosapi.get("/line/getLineUser", {
//         params: {
//           accessToken: accessToken
//         }
//       });
//
//       //將使用者資訊存於 Session
//       console.log('User Info:', userInfoResponse.data);
//       sessionStorage.setItem("lineName", userInfoResponse.data.name);
//       sessionStorage.setItem("lineImgPath", userInfoResponse.data.pictureUrl);
//       sessionStorage.setItem("isLineLogined", true);
//       lineName.value = userInfoResponse.data.displayName;
//       lineImgPath.value = userInfoResponse.data.pictureUrl;
//       isLineLogined.value = true;
//     } catch (error) {
//       console.error('Error during token exchange or fetching user info:', error);
//     }
//   }
// };
//
// //頁面一跳回馬上處理第三方登入 access token
// onMounted(() => {
//   handleLineCallback();
// });

</script>

<style></style>