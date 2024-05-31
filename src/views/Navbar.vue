<template>
  <div style="display: flex;">
    <RouterLink to="/" class="dropdown-item" style="width: 15%;">
      <img src="/logo.png" style="width: 100%;">
    </RouterLink>
    <div style="width: 25%; margin-left: 20%; margin-top: 2%;">
      <Search @searchcons="dosearch"></Search>
    </div>

  </div>

  <!-- <nav class="navbar navbar-expand-lg" style="background-color: white"> -->
  <nav class="navbar navbar-expand-lg" style="background-color: #D1E9E9;">

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
                <RouterLink to="/product/cn" class="dropdown-item">華語</RouterLink>
              </li>
              <li>
                <RouterLink to="/product/JpKr" class="dropdown-item">日韓</RouterLink>
              </li>
              <li>
                <RouterLink to="/product/en" class="dropdown-item">西洋</RouterLink>
              </li>
              <li>
                <RouterLink to="/product/isBest" class="dropdown-item">熱銷商品</RouterLink>
              </li>
              <li>
                <RouterLink to="/product/isDiscount" class="dropdown-item">折扣商品</RouterLink>
              </li>
              <li>
                <RouterLink to="/product/isPreorder" class="dropdown-item">預購商品</RouterLink>
              </li>
              
            </ul>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/products">全部商品</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              會員中心
            </a>
            <ul class="dropdown-menu">
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
          <li class="nav-item dropdown">
            <!--Product -->
            <RouterLink class="nav-link dropdown-toggle" to="/products" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              客戶服務
            </RouterLink>
            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" to="/Customer/CustomerAnswer">客服提問</RouterLink>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/cart">購物車</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/wishList">願望清單</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" :to="loginOrLogoutLink">
              {{ loginOrLogoutText }}
            </RouterLink>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <RouterLink class="nav-link active" aria-current="page" to="/register">註冊</RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="isLoggedIn">
      <div>{{ user.name }}</div>
      <div>上次登入時間:{{ user.loginTime }}</div>
    </div>
    
  </nav>

</template>

<script setup>
import { ref } from 'vue';
import Search from '@/components/Search.vue';
import { computed } from 'vue';

const props = defineProps({ isLoggedIn: Boolean,user: Object  });

const loginOrLogoutText = computed(() => props.isLoggedIn ? '登出' : '登入');
const loginOrLogoutLink = computed(() => props.isLoggedIn ? '/secure/logout' : '/secure/login');

function dosearch(data) {
  console.log(data);
}

</script>

<style></style>
