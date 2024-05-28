<template>
    <div align="center" style="margin-top: 40px">
        <ul class="steps steps-horizontal space-x-3">
            <li class="step step-primary">基本資料</li>
            <li class="step">偏好</li>
            <li class="step">檢查</li>
            <li class="step">完成</li>
        </ul>
    </div><br>
    <div style="display: flex; justify-content: center;">

        <form class="form-signin w-80 m-auto" @submit.prevent="submitForm">

            <div class="input-group mb-1">
                <span class="input-group-text" id="basic-addon1">姓名</span>
                <input type="text" class="form-control" placeholder="Username" aria-label="Username" v-model="form.name"
                    required aria-describedby="basic-addon1">
            </div>

            <div class="input-group mb-1">
                <span class="input-group-text" id="basic-addon1">生日</span>
                <input type="date" class="form-control" placeholder="" aria-label="Username" v-model="form.birthday"
                    :max="maxBirthday()" :min="minBirthday()" required aria-describedby="basic-addon1">
            </div>

            <div class="input-group mb-1">
                <span class="input-group-text" id="basic-addon1">Email</span>
                <input type="email" class="form-control" placeholder="Email" aria-label="Username" v-model="form.email"
                    required aria-describedby="basic-addon1">
            </div>

            <div class="input-group mb-1">
                <span class="input-group-text">密碼</span>
                <input type="password" class="form-control" placeholder="密碼" aria-label="Username" id="myInput1"
                    v-model="form.password" required aria-describedby="basic-addon1">

            </div>
            <div class="form-check text-start my-3">
                <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"
                    @click="myFunction1()">
                <label class="form-check-label" for="flexCheckDefault">
                    顯示密碼
                </label>
            </div>

            <div class="input-group mb-1">
                <span class="input-group-text" id="basic-addon1">確認密碼</span>
                <input type="password" class="form-control" placeholder="再輸入一次密碼" aria-label="Username" id="myInput2"
                    v-model="form.confirmPassword" required aria-describedby="basic-addon1">
            </div>
            <div class="form-check text-start my-3">
                <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault1"
                    @click="myFunction2()">
                <label class="form-check-label" for="flexCheckDefault1">
                    顯示密碼
                </label>
            </div>
            <div class="input-group mb-1">
                <span class="input-group-text" id="basic-addon1">電話</span>
                <input type="tel" class="form-control" placeholder="電話" aria-label="Username" v-model="form.phone"
                    required aria-describedby="basic-addon1">
            </div>

            <div class="input-group">
                <span class="input-group-text" id="basic-addon1">地址</span>
                <input type="text" class="form-control" placeholder="地址(選填)" aria-label="Username"
                    v-model="form.address" aria-describedby="basic-addon1">
            </div>
    
            <div class="form-check" v-for="(item, index) in productStyles" :key="item.id">
                <input class="form-check-input" type="checkbox" :id="'flexCheck' + index" :value="item.id"
                        v-model="form.favoriteIds">
                <label class="form-check-label" :for="'flexCheck' + index">
                        {{ item.name }}
                </label>
            </div>

            
            <div class="input-group" style="display: flex;justify-content: right;">
                <button class="btn btn-primary  mt-2" type="submit" @click="callCreate()"
                    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">下一步</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { ref } from 'vue';
import axiosapi from '@/plugins/axios.js';

import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({
    name: '',
    birthday: '',
    password: '',
    confirmPassword: '',
    phone: '',
    email: '',
    address: '',
    favoriteIds: []
});

const productStyles = ref([
    { id: 1, name: '流行' },
    { id: 2, name: '搖滾' },
    { id: 3, name: '爵士' },
    { id: 4, name: '古典' },
    { id: 5, name: '民謠' },
]);

function myFunction1() {
    var x = document.getElementById("myInput1");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}


function maxBirthday() {
    const today = new Date();
    const eighteenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 18));
    return eighteenYearsAgo.toISOString().split('T')[0];
};

function minBirthday() {
    const today = new Date();
    const eighteenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 100));
    return eighteenYearsAgo.toISOString().split('T')[0];
};

function myFunction2() {
    var x = document.getElementById("myInput2");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function callCreate() {
    if (form.value.password != form.value.confirmPassword) {
        Swal.fire({
            text: '密碼不一致，請重新輸入。',
            icon: 'warning',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });
    } else {
        axiosapi.post('/members', form.value).then(function (response) {
            if (response.data.success) {
                Swal.fire({
                    text: response.data.message,
                    icon: 'success',
                    allowOutsideClick: false,
                    confirmButtonText: '確認',
                }); setTimeout(function () {
                    Swal.close();
                    router.push({ name: "login-link" });
                }, 1000);
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: 'warning',
                    allowOutsideClick: false,
                    confirmButtonText: '確認',
                });
            }
        }).catch(function (error) {
            Swal.fire({
                text: '失敗：請檢查輸入資料!',
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonText: '確認',
            });
        });
    }
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.steps-horizontal .step::before {
    width: calc(100% + 2rem);
    /* 调整这个值来延长线 */
}

.input-group-text {
    flex: 0 0 100px;
    /* 固定宽度，调整到适合的长度 */
    width: 100px;
    /* 确保宽度固定 */
}

.btn-md {
    padding: 0 8px;
    font-size: 1rem;
    line-height: 0.5;
    border-radius: 0.6rem;
    border: 20px;
}
</style>
