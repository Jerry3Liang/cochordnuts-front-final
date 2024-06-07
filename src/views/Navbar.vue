<template>
  <div style="display: flex;">
    <RouterLink to="/" class="dropdown-item" style="width: 15%;">
      <img src="/logo.png" style="width: 100%;">
    </RouterLink>
    <div style="width: 25%; margin-left: 20%; margin-top: 2%;">
      <Search @searchcons="dosearch"></Search>
    </div>
    <div v-if="isLoggedIn" style="margin-left: 16%; margin-top: 10%;margin-bottom: 5px;">
      <div>{{ user.name }}，歡迎回來 ! </div>
      <div>上次登入時間: {{ user.loginTime }}</div>
    </div>
    <div v-if="isGoogleLogin" style="margin-left: 16%; margin-top: 10%;margin-bottom: 5px;">
      <div>{{googleName}}，歡迎回來 ! </div>
      <div>上次登入時間: {{lastLoginTime}}</div>
    </div>

  </div>

  <!-- <nav class="navbar navbar-expand-lg" style="background-color: white"> -->
  <nav class="navbar navbar-expand-lg" style="background-color: #CC9999;">

    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">CoChordNuts</a> -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <!--Product -->
            <RouterLink class="nav-link dropdown-toggle" to="/products" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              熱門分類
            </RouterLink>
            <ul class="dropdown-menu">
              <li>
                <RouterLink to="/product/cnInf" class="dropdown-item">華語</RouterLink>
              </li>
              <li>
                <RouterLink to="/product/JpKrInf" class="dropdown-item">日韓</RouterLink>
              </li>
              <li>
                <RouterLink to="/product/enInf" class="dropdown-item">西洋</RouterLink>
              </li>
              <li>
                <RouterLink to="/popsInf" class="dropdown-item">流行音樂</RouterLink>
              </li>
              <li>
                <RouterLink to="/rock" class="dropdown-item">搖滾音樂</RouterLink>
              </li>
              <!-- <li>
                <RouterLink to="/moreTypes" class="dropdown-item">更多分類</RouterLink>
              </li> -->



            </ul>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/products">全部商品</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/product/isBest">熱銷商品</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/product/isDiscount">折扣商品</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/product/isPreorder">預購商品</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" @click="handleMemberCenterAccess($event)">
              會員中心
            </a>
            <ul class="dropdown-menu" v-show="showMemberDropdown">
              <li>
                <RouterLink to="/member" class="dropdown-item">會員基本資料</RouterLink>
              </li>
              <li>
                <RouterLink to="/memberModify" class="dropdown-item">修改會員資料</RouterLink>
              </li>
              <li>
                <RouterLink to="/modifyPwd" class="dropdown-item">修改密碼</RouterLink>
              </li>
              <li>
                <RouterLink to="/memberDelete" class="dropdown-item">刪除帳號</RouterLink>
              </li>
              <li>
                <RouterLink to="/order/userFindAllOrders" class="dropdown-item">使用者訂單紀錄</RouterLink>
              </li>
              <li>
                <RouterLink to="/Customer/CustomerCaseByMemberId" class="dropdown-item">客服回覆</RouterLink>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/Customer/CustomerAnswer" @click="handleMemberCenterAccess2($event)">客服提問</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/cart" @click="handleMemberCenterAccess($event)">購物車</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/wishList" @click="handleMemberCenterAccess($event)">願望清單</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" :to="loginOrLogoutLink">
              {{ loginOrLogoutText }} <img src="/user.png" />
            </RouterLink>
          </li>
          <li class="nav-item" v-show="isGoogleLogin">
            <button class="nav-link active" aria-current="page" @click="logout">登出</button>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <RouterLink class="nav-link active" aria-current="page" to="/register">註冊</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/cart">購物車<img src="/shopping-bag.png" /></RouterLink>
          </li>
        </ul>
      </div>
    </div>


  </nav>

</template>

<script setup>
import Swal from 'sweetalert2';
import axiosApi from '@/plugins/axios.js';
import { ref,computed,onBeforeUnmount, onMounted } from 'vue';
import Search from '@/components/Search.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({ isLoggedIn: Boolean,user: Object  });

const loginOrLogoutText = computed(() => props.isLoggedIn ? '登出' : '登入');
const loginOrLogoutLink = computed(() => props.isLoggedIn ? '/secure/logout' : '/secure/login');
const showMemberDropdown = ref(false);
const isGoogleLogin = ref(false);
const googleName = ref("");
const lastLoginTime = ref("");

onMounted(function(){
  googleName.value = sessionStorage.getItem("googleName");
  lastLoginTime.value = sessionStorage.getItem("lastLoginTime");
  isGoogleLogin.value = sessionStorage.getItem("isGoogleLogin");
})


function dosearch(data) {
  console.log(data);
}
function handleMemberCenterAccess(event) {
  showMemberDropdown.value = false;
  if (!props.isLoggedIn && !isGoogleLogin.value) {
    event.preventDefault();
    Swal.fire({
            text: '請先登入!',
            icon: 'warning',
            allowOutsideClick: false,
            confirmButtonText: '前往登入',
            showCancelButton: true,
            cancelButtonText: "取消",
        }).then(function(result) {
          if(result.isConfirmed){
                    router.push({ name:"login-link"});
                } else {
                    return;
                };
        });
  }  else {
    showMemberDropdown.value = true;
  }
  }

function handleMemberCenterAccess2(event) {
  if (!props.isLoggedIn && !isGoogleLogin.value) {
    event.preventDefault();
    Swal.fire({
      text: '請先登入!',
      icon: 'warning',
      allowOutsideClick: false,
      confirmButtonText: '前往登入',
      showCancelButton: true,
      cancelButtonText: "取消",
    }).then(function(result) {
      if(result.isConfirmed){
        router.push({ name:"login-link"});
      } else {
        router.push({ name:"home-link"});
      }
    });
  }  else {
    showMemberDropdown.value = true;
  }
}

  onBeforeUnmount(() => {
  showMemberDropdown.value = false;
});

//Google logout 方法
function logout(){
  console.log("call logout");
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout!"
  }).then(function (result) {
    if (result.isConfirmed) {
      let lastLoginTime = sessionStorage.getItem("lastLoginTime");
      let googleName = sessionStorage.getItem("googleName");
      let googleEmail = sessionStorage.getItem("googleEmail");
      let isGoogleLogin = sessionStorage.getItem("isGoogleLogin");
      let memberNo = sessionStorage.getItem("memberNo");
      let jsonData = {
        memberNo: memberNo,
        lastLoginTime: lastLoginTime,
        googleName: googleName,
        googleEmail: googleEmail,
        isGoogleLogin: isGoogleLogin
      };
      console.log('last=' + lastLoginTime);
      axiosApi.post("/google/logout", jsonData)
          .then(function (response) {
            if (response.data.success) {
              Swal.fire({
                title: "Logged out!",
                text: "You have been logged out.",
                icon: "success"
              }).then(function () {
                // 清除指定的 sessionStorage 项目
                sessionStorage.removeItem("lastLoginTime");
                sessionStorage.removeItem("googleName");
                sessionStorage.removeItem("googleEmail");
                sessionStorage.removeItem("isGoogleLogin");
                sessionStorage.removeItem("memberNo");
                window.location.reload();
              });
            } else {
              Swal.fire({
                text: response.data.message || 'Logout failed!',
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonText: '確認',
              }); router.push({ name: "login-link" });
            }
          })
          .catch(function (error) {
            console.error('Logout failed:', error);
            Swal.fire({
              text: '登出失敗：' + error.message,
              icon: 'error',
              allowOutsideClick: false,
              confirmButtonText: '確認',
            });
          });
    } else {
      router.push({ name: "home-link" });
    };
  });
}



</script>

<style></style>
