<template>
    
</template>
    
<script setup>

import Swal from 'sweetalert2'
import axiosapi from '@/plugins/axios.js'
import { useRouter } from 'vue-router';

const router = useRouter();


Swal.fire({
    title: "確定要刪除帳號嗎?",
    input: "password",
    icon: "warning",
    inputPlaceholder: "請輸入密碼!",
    inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off"
    }
}).then(function (result) {
    if (result.isConfirmed) {
        const memberNo=sessionStorage.getItem("memberNo");
        const password = result.value;
        axiosapi.delete(`/members/${memberNo}`,{ data: { password } })
            .then(function (response) {
                if (response.data.success) {
                    Swal.fire({
                        title: "刪除成功!",
                        text: "您的帳號已刪除成功",
                        icon: "success"
                    }).then(function () {
                        sessionStorage.clear();
                        localStorage.clear();
                        router.push({ name: "home-link" });
                    });
                } else {
                    Swal.fire({
                        text: response.data.message || '刪除失敗!',
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                    }); router.push({ name: "home-link" });
                }
            })
            .catch(function (error) {
                console.error('Logout failed:', error);
                Swal.fire({
                    text: '刪除失敗：' + error.message,
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
    
<style>
    
</style>
