<template>
    <div class="center">
        <div class="center-content">
            <h3 style="margin-top: 5%">修改密碼</h3>
            <ul class="list-group">

                <label class="col-4 col-form-label">原密碼:</label>
                <div class="col-8">
                    <input id="myInput" class="form-control here" type="password" v-model="member.oriPassword" required>
                </div>

                <div class="form-check text-start my-3">
                    <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"
                        @click="myFunction()">
                    <label class="form-check-label" for="flexCheckDefault">
                        顯示密碼
                    </label>
                </div>

                <label class="col-4 col-form-label">新密碼:</label>
                <div class="col-8">
                    <input id="myInput1" class="form-control here" type="password" v-model="member.password" required>
                </div>

                <div class="form-check text-start my-3">
                    <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault1"
                        @click="myFunction1()">
                    <label class="form-check-label" for="flexCheckDefault1">
                        顯示密碼
                    </label>
                </div>

                <label class="col-4 col-form-label">再輸入一次新密碼:</label>
                <div class="col-8">
                    <input id="myInput2" class="form-control here" type="password" v-model="member.confirmPassword"
                        required>
                </div>
                <div class="form-check text-start my-3">
                    <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault2"
                        @click="myFunction2()">
                    <label class="form-check-label" for="flexCheckDefault2">
                        顯示密碼
                    </label>
                </div>

            </ul>
        </div>
        <button class="btn btn-primary" type="button" @click="callModifyPwd()">確認修改</button>
    </div>
</template>


<script setup>


import Swal from 'sweetalert2'
import axiosapi from '@/plugins/axios.js';
import { ref, onMounted } from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const member = ref({
    oriPassword: '',
    password: '',
    confirmPassword: ''
})

function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
function myFunction1() {
    var x = document.getElementById("myInput1");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
function myFunction2() {
    var x = document.getElementById("myInput2");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
onMounted(() => {
    const memberNo = sessionStorage.getItem("memberNo");
    if (memberNo != null) {
        axiosapi.get(`/members/${memberNo}`)
            .then(response => {
                member.value = response.data.list[0];
            })
    } else {
        Swal.fire({
            text: '尚未登入',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });
        router.push({ name: "login-link" });
    }
});


function callModifyPwd() {
    if (member.value.password != member.value.confirmPassword) {
        Swal.fire({
            text: '密碼不一致，請重新輸入。',
            icon: 'warning',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });
    } else {
        Swal.fire({
            title: "確認修改?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "確認!"
        }).then(function (result) {
            if (result.isConfirmed) {
                let memberNo = sessionStorage.getItem("memberNo");
                axiosapi.put(`/member/changepwd/${memberNo}`, member.value)
                    .then(function (response) {
                        if (response.data.success) {
                            Swal.fire({
                                title: "修改成功!",
                                icon: "success"
                            }).then(function () {
                                router.push({ name: "member-link" });
                            });
                        } else {
                            Swal.fire({
                                text: response.data.message || '修改失敗!',
                                icon: 'error',
                                allowOutsideClick: false,
                                confirmButtonText: '確認',
                            }); router.push({ name: "modifyPwd-link" });
                        }
                    })
                    .catch(function (error) {
                        Swal.fire({
                            text: '修改失敗：' + error.message,
                            icon: 'error',
                            allowOutsideClick: false,
                            confirmButtonText: '確認',
                        });
                    });
            } else {
                router.push({ name: "member-link" });
            };
        });
    }
}

</script>

<style>
.center {
    margin: auto;
    max-width: 80%;
}

.col-4 {
    font-size: 18px;
    font-weight: 550;
}
</style>
