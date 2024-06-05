<template>
    <div class="container" v-if="member">
        <div class="col-md-9" style="margin: auto;">
            <div class="card">
                <div class="card-body">
                    <div class="col-md-12">
                        <h3>修改會員資料</h3>
                        <hr>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <form>
                                <div class="form-group row">
                                    <label for="name" class="col-4 col-form-label">姓名:</label>
                                    <div class="col-8">
                                        <input id="name" name="name" placeholder="姓名(必填)" class="form-control here"
                                            type="text" v-model="member.name" required>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="birthday" class="col-4 col-form-label">生日:</label>
                                    <div class="col-8">
                                        <input id="birthday" name="birthday" placeholder="生日(必填)"
                                            class="form-control here" type="date" v-model="member.birthday"
                                            :max="maxBirthday()" :min="minBirthday()" required>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="registerTime" class="col-4 col-form-label">註冊日:</label>
                                    <div class="col-8">
                                        <input id="registerTime" name="registerTime" placeholder="註冊日"
                                            class="form-control here" type="text" :value="member.registerTime" disabled>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="lastLoginTime" class="col-4 col-form-label">上次登入日:</label>
                                    <div class="col-8">
                                        <input id="lastLoginTime" name="lastLoginTime" placeholder="上次登入日"
                                            class="form-control here" type="text" :value="member.lastLoginTime"
                                            disabled>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="email" class="col-4 col-form-label">Email:</label>
                                    <div class="col-8">
                                        <input id="email" name="email" placeholder="Email(必填)" class="form-control here"
                                            type="email" v-model="member.email" required>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="address" class="col-4 col-form-label">地址:</label>
                                    <div class="col-8">
                                        <input id="address" name="address" placeholder="地址" class="form-control here"
                                            type="text" v-model="member.address">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="phone" class="col-4 col-form-label">電話:</label>
                                    <div class="col-8">
                                        <input id="phone" name="phone" placeholder="電話(必填)" class="form-control here"
                                            type="tel" v-model="member.phone" required>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="recipient" class="col-4 col-form-label">常用收件人:</label>
                                    <div class="col-8">
                                        <input id="recipient" name="recipient" placeholder="常用收件人"
                                            class="form-control here" type="text" v-model="member.recipient">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="recipientAddress" class="col-4 col-form-label">常用收件人地址:</label>
                                    <div class="col-8">
                                        <input id="recipientAddress" name="recipientAddress" placeholder="常用收件人地址"
                                            class="form-control here" type="text" v-model="member.recipientAddress">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="recipientPhone" class="col-4 col-form-label">常用收件人電話:</label>
                                    <div class="col-8">
                                        <input id="recipientPhone" name="recipientPhone" placeholder="常用收件人電話"
                                            class="form-control here" type="tel" v-model="member.recipientPhone">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="favorites" class="col-4 col-form-label">喜好:</label>
                                    <div class="col-8" style="margin-top: 10px;">
                                        <div class="form-check form-check-inline" v-for="style in productStyles"
                                            :key="style.id">
                                            <input class="form-check-input" type="checkbox" :value="style.id"
                                                v-model="member.favoriteIds" :id="'style-' + style.id">
                                            <label style="font-size: 17px;font-weight: 500;" class="form-check-label"
                                                :for="'style-' + style.id">{{ style.name
                                                }}</label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div class="button-container">
                                <button class="btn btn-primary" type="button" @click="callModify()">確認修改</button>
                                <RouterLink to="/member">
                                    <button class="btn btn-primary" type="button">取消</button>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import axiosapi from '@/plugins/axios.js';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const member = ref(null);

const productStyles = ref([
    { id: 1, name: '流行' },
    { id: 2, name: '搖滾' },
    { id: 3, name: '爵士' },
    { id: 4, name: '古典' },
    { id: 5, name: '民謠' },
]);

onMounted(() => {
    const loggedInMemberNo = sessionStorage.getItem("memberNo");
    axiosapi.get(`/members/${loggedInMemberNo}`)
        .then(response => {
            console.log("API response:", response.data);
            const memberData = response.data.list[0];
            member.value = {
                ...memberData,
                favoriteIds: memberData.favorites
            };
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
            const modifiedData = {
                name: member.value.name,
                birthday: member.value.birthday,
                email: member.value.email,
                phone: member.value.phone,
                address: member.value.address,
                recipient: member.value.recipient,
                recipientAddress: member.value.recipientAddress,
                recipientPhone: member.value.recipientPhone,
                memberNo: sessionStorage.getItem("memberNo"),
                favoriteIds: member.value.favoriteIds
            };
            let loggedInMemberNo = sessionStorage.getItem("memberNo");
            axiosapi.put(`/members/${loggedInMemberNo}`, modifiedData)
                .then(response => {
                    console.log('Response from PUT:', member.value);
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


<style scoped>
.container {
    margin: auto;
    max-width: 80%;
}

.card {
    margin-top: 40px;
}

h4 {
    font-size: 24px;
}

.form-group.row {
    margin-bottom: 15px;
}

label {
    font-size: 18px;
    font-weight: bold;
}

.col-4 {
    display: flex;
    align-items: center;
    padding-right: 5px;
}

.col-8 {
    padding-left: 5px;
}

.btn-primary {
    margin-top: 20px;
    margin-left: 20px
}

.button-container {
    margin-left: 35%
}
</style>
