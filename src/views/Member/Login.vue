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
        
        <button class="btn btn-primary w-15 py-1" type="button" @click="login()">Sign in</button>
        <RouterLink style="margin-left: 20px;" to="/rePassword">忘記密碼</RouterLink>
    </form>

</template>

<script setup>
import Swal from 'sweetalert2'
import axiosapi from '@/plugins/axios.js'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const message = ref("");
const router = useRouter();

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
        } else {
            Swal.fire({
                text: '請檢查帳號和密碼',
                icon: 'error',
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


</script>

<style></style>
