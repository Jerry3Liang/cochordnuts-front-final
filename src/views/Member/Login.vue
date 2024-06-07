<template data-bs-theme="auto">

    <form class="form-signin w-60 m-auto">
        <h1 class="h3 mb-3 fw-normal"  style="margin-top: 40px">登入</h1>
        <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="email"
                v-model="email">
            <span class="error">{{ message }}</span>
            <label for="floatingInput">Email address</label>
        </div><br>
        <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password"
                v-model="password">
            <label for="floatingPassword">Password</label>
        </div>

        <div class="form-check text-start my-3">
            <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"
                @click="myFunction()">
            <label class="form-check-label" for="flexCheckDefault">
                顯示密碼
            </label>
        </div>
        
        <button class="btn btn-primary" type="button" @click="login()">登入</button>
        <RouterLink style="margin-left: 20px;" to="/rePassword">忘記密碼</RouterLink>
    </form>
  <hr>
  <h3>其他登入方式</h3>
  <button type="button" class="btn btn-danger" @click="loginWithGoogle" v-show="!isGoogleLogined">Google 登入</button>
<!--  <button type="button" class="btn btn-success" @click="loginWithLine" v-show="!isLineLogined" style="margin-left: 5px">Line 登入</button>-->

</template>

<script setup>
import Swal from 'sweetalert2'
import axiosapi from '@/plugins/axios.js'
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const message = ref("");
const router = useRouter();

// //Google 第三方登入
// const googleName = ref("");
// const googleEmail = ref("");
// const isGoogleLogined = ref("");
// const memberNo = ref("");

// //LINE 第三方登入
// const lineName = ref("");
// const lineImgPath = ref("");
// const isLineLogined = ref(false);

// onMounted(function() {
//   memberNo.value = sessionStorage.getItem("memberNo");
//   googleName.value = sessionStorage.getItem("googleName");
//   googleEmail.value = sessionStorage.getItem("googleEmail");
//   isGoogleLogined.value = sessionStorage.getItem("verified_email");
// })

function myFunction() {
    var x = document.getElementById("floatingPassword");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function login() {
    Swal.fire({
        text: "Loading......",
        showConfirmButton: false,
        allowOutsideClick: false,
    });

    if (email.value === "") {
        email.value = null
    }

    if (password.value === "") {
        password.value = null
    }

    let data = {
        "email": email.value,
        "password": password.value
    };

    axiosapi.defaults.headers.authorization = "";
    sessionStorage.removeItem("user");
    axiosapi.post("/memberLogin", data).then((response) => {
        if (response.data.success && response.data.memberStatus==1) {
            console.log(response.data);
            Swal.fire({
                text: response.data.message,
                icon: 'success',
                allowOutsideClick: false,
                confirmButtonText: '確認',
            }).then(function (result) {
                if (result.isConfirmed) {
                    console.log(response.data);
                    axiosapi.defaults.headers.authorization = 'Bearer ' + response.data.token;
                    sessionStorage.setItem("userName", response.data.userName);
                    sessionStorage.setItem("user", response.data.user);
                    sessionStorage.setItem("lastLoginTime", response.data.lastLoginTime);
                    sessionStorage.setItem("memberNo", response.data.memberNo);
                    sessionStorage.setItem("isLoggedIn", true);
                    sessionStorage.setItem("loginTime", response.data.loginTime);
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.setItem("userName", response.data.userName);
                    localStorage.setItem("loginTime", response.data.loginTime);

                    router.push({ name: "home-link" })
                }
            });
        } else if(response.data.memberStatus==0) {
            Swal.fire({
                text: '請聯繫客服人員確認帳戶狀態 !',
                icon: 'warning',
                allowOutsideClick: false,
                confirmButtonText: '確認',
            })
        }
    }).catch(function (error) {
        console.log(error);
        Swal.fire({
            text: '請檢查帳號和密碼! ( '+'狀態碼 : '+error.response.data.status+' )',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        })

    });
}

//Google 第三方登入相關方法
const loginWithGoogle = async () => {
  try {
    //從後端獲取 Google auth URL
    const authUrlResponse = await axiosapi.get("/google/buildAuthUrl");

    //將使用者跳轉到 Google 認證中心頁面
    window.location.href = authUrlResponse.data;
  } catch (error) {
    console.error('Error during Google login:', error);
  }
};


//Line 第三方登入相關方法
// const loginWithLine = async () => {
//   try {
//     //從後端獲取 Line auth URL
//     const authUrlResponse = await axiosapi.get("/line/buildAuthUrl");
//
//     //將使用者跳轉到 Line 認證中心頁面
//     window.location.href = authUrlResponse.data;
//   } catch (error) {
//     console.error('Error during Google login:', error);
//   }
// };

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
