<template>

</template>

<script setup>
import Swal from 'sweetalert2'
import axiosapi from '@/plugins/axios.js'
import { useRouter } from 'vue-router';

const router = useRouter();

Swal.fire({

    title: "確認要登出嗎?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "確認!"
}).then(function (result) {
    if (result.isConfirmed) {

        let lastLoginTime = sessionStorage.getItem("lastLoginTime");
        let userName = sessionStorage.getItem("userName");
        let memberNo = sessionStorage.getItem("memberNo");
        let jsonData = {
            lastLoginTime: lastLoginTime,
            userName: userName,
            memberNo: memberNo
        };
        axiosapi.post("/memberLogout", jsonData)
            .then(function (response) {
                if (response.data.success) {
                    Swal.fire({
                        title: "登出成功!",
                        text: "您已被登出。",
                        icon: "success"
                    }).then(function () {
                        sessionStorage.clear();
                        localStorage.clear();
                        router.push({ name: "home-link" });
                    });
                } else {
                    Swal.fire({
                        text: response.data.message || '登出失敗!',
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                    }); router.push({ name: "login-link" });
                }
            })
            .catch(function (error) {
                console.error('登出失敗:', error);
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

</script>

<style></style>
