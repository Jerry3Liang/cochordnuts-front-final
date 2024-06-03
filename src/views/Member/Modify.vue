<template>
    <div class="center" v-if="member">
        <div class="center-content">
            <h1>修改基本資料</h1>
            <form @submit.prevent="callModify" novalidate>
                <ul class="list-group">
                    <li class="list-group-item">
                        <span class="label">姓名:</span>
                        <input type="text" class="label-modify" v-model="member.name" required>
                    </li>
                    <li class="list-group-item">
                        <span class="label">生日:</span>
                        <input type="date" class="label-modify" v-model="member.birthday" :max="maxBirthday()"
                            :min="minBirthday()" required>
                    </li>
                    <li class="list-group-item">
                        <span class="label">註冊日:</span><span class="label-in">{{ member.registerTime }}</span>
                    </li>
                    <li class="list-group-item">
                        <span class="label">上次登入日:</span> <span class="label-in">{{ member.lastLoginTime }}</span>
                    </li>
                    <li class="list-group-item">
                        <span class="label">Email:</span>
                        <input type="email" class="label-modify" v-model="member.email" required>
                    </li>
                    <li class="list-group-item">
                        <span class="label">地址:</span>
                        <input type="text" class="label-modify" v-model="member.address">
                    </li>
                    <li class="list-group-item">
                        <span class="label">電話:</span>
                        <input type="tel" class="label-modify" v-model="member.phone" required>
                    </li>
                    <li class="list-group-item">
                        <span class="label">常用收件人:</span>
                        <input type="text" class="label-modify" v-model="member.recipient">
                    </li>
                    <li class="list-group-item">
                        <span class="label">常用收件人地址:</span>
                        <input type="text" class="label-modify" v-model="member.recipientAddress">
                    </li>
                    <li class="list-group-item">
                        <span class="label">常用收件人電話:</span>
                        <input type="tel" class="label-modify" v-model="member.recipientPhone">
                    </li>
                </ul>
                <button class="btn btn-primary w-15 py-1" type="submit">確認修改</button>
            </form>
        </div>
    </div>
</template>
<script setup>
import Swal from 'sweetalert2'
import axiosapi from '@/plugins/axios.js';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const member = ref(null);

onMounted(() => {
    const loggedInMemberNo = sessionStorage.getItem("memberNo");
    axiosapi.get(`/members/${loggedInMemberNo}`)
        .then(response => {
            member.value = response.data.list[0];
        })
        .catch(error => {
            Swal.fire({
                text: '尚未登入',
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonText: '確認',
            });
            setTimeout(() => {
                router.push({ name: "login-link" });
            }, 1000);
        });
});

function maxBirthday() {
    const today = new Date();
    const eighteenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 18));
    return eighteenYearsAgo.toISOString().split('T')[0];
};

function minBirthday() {
    const today = new Date();
    const oneHundredYearsAgo = new Date(today.setFullYear(today.getFullYear() - 100));
    return oneHundredYearsAgo.toISOString().split('T')[0];
};

function callModify() {
    if (!member.value.name || !member.value.birthday || !member.value.email || !member.value.phone) {
        Swal.fire({
            text: '請填寫所有必填欄位',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });
        return;
    }

    Swal.fire({
        title: "確認修改?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "確認"
    }).then(result => {
        if (result.isConfirmed) {
            let loggedInMemberNo = sessionStorage.getItem("memberNo");
            axiosapi.put(`/members/${loggedInMemberNo}`, member.value)
                .then(response => {
                    if (response.data.success) {
                        Swal.fire({
                            title: "修改成功!",
                            icon: "success"
                        }).then(() => {
                            sessionStorage.setItem("userName", response.data.userName);
                            router.push({ name: "member-link" });
                        });
                    } else {
                        Swal.fire({
                            text: response.data.message || '修改失敗!',
                            icon: 'error',
                            allowOutsideClick: false,
                            confirmButtonText: '確認',
                        });
                        router.push({ name: "memberModify-link" });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        text: '修改失敗：' + error.message,
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                    });
                });
        } else {
            router.push({ name: "member-link" });
        }
    });
}
</script>
<style>
.center-content {
    max-width: 100%;
}

.center {
    justify-content: center;
    width: 900px;
    /* Adjust as needed */
}

.detail {
    margin-bottom: 10px;
}

.label {
    font-weight: 900;
    font-size: larger;
    margin-left: 0;
    padding-bottom: 0;
    color: #494949;
}

.label-modify {
    font-size: 18px;
    margin-left: 150px;
    border-width: 2px;
    border-radius: 5px;
    padding-left: 10px;
    min-width: 200px;
}

.list-group {
    display: flex;
    margin-bottom: 5px;
    width: 80%;
    border-radius: 15px;
    /* Adjust as needed */
}
</style>
