<template>
    <div class="center" v-if="member">
        
    <div class="center-content">
        <h1>會員基本資料</h1>
        <ul class="list-group">
            
            <li class="list-group-item">
                <span class="label">姓名:</span><span class="label-in"> {{ member.name }}</span>
            </li>
            <li class="list-group-item">
                <span class="label">生日:</span> <span class="label-in">{{ formatBirthday(member.birthday) }}</span>
            </li>
            <li class="list-group-item">
                <span class="label">註冊日:</span><span class="label-in">{{ member.registerTime }}</span>
            </li>
            <li class="list-group-item">
                <span class="label">上次登入日:</span> <span class="label-in">{{ member.lastLoginTime }}</span>
            </li>
            <li class="list-group-item">
                <span class="label">Email:</span><span class="label-in">{{ member.email }}</span>
            </li>
            <li class="list-group-item">
                <span class="label">地址:</span><span class="label-in">{{ member.address }}</span>
            </li>
            <li class="list-group-item">
                <span class="label">電話:</span><span class="label-in">{{ member.phone }}</span>
            </li>
            <li class="list-group-item">
                <span class="label">常用收件人:</span><span class="label-in"> {{ member.recipient }}</span>
            </li>
            <li class="list-group-item">
                <span class="label">常用收件人地址:</span> <span class="label-in">{{ member.recipientAddress }}</span>
            </li>
            <li class="list-group-item">
                <span class="label">常用收件人電話:</span><span class="label-in"> {{ member.recipientPhone }}</span>
            </li>
        </ul>
    </div>
    <button class="btn btn-primary" type="button" @click="newPage()">修改</button>
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
    if(loggedInMemberNo !=null){
    axiosapi.get(`/members/${loggedInMemberNo}`)
        .then(response => {
            member.value = response.data.list[0];
        })}else{ Swal.fire({
                        text: '尚未登入',
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                }); 
                    router.push({ name: "login-link" });
                }
});

function newPage(){
    router.push({ name: "memberModify-link" });
}

const formatBirthday = (dateString) => {
    if (dateString.includes('T')) {
        return dateString.split('T')[0];
    } else {
        return dateString;
    }
};
</script>

<style>
.center-content{
    max-width: 100%;  
    margin-top: 40px;
}

.center {
    justify-content: center;
    width: 900px;
}

h1{
    font-size: 40px
}

.label {
    font-weight: 900;
    font-size: larger;
    margin-left: 0;
    padding-bottom: 0;
    color: #494949;
}

.label-in{
    font-size: 18px;
    margin-left: 150px;
    border-radius: 5px;
}
.list-group {
    display: flex;
    margin-bottom: 5px;
    width: 80%;
}
</style>
