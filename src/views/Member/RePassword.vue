<template>
    <div align="center" style="margin-top: 40px">
        <!-- 驗證信箱 -->
        <div v-if="!emailVerified">
            <div class="stepwizard">
                <div class="stepwizard-row">
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-primary btn-circle">1</button>
                        <p>寄驗證信</p>
                    </div>
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-default btn-circle" disabled="disabled">2</button>
                        <p>重設密碼</p>
                    </div>
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-default btn-circle" disabled="disabled">3</button>
                        <p>確認送出</p>
                    </div>
                </div>
            </div>
            <div class="input-group mb-1">
                <span class="input-group-text" id="basic-addon1">Email</span>
                <input class="form-control" v-model="email" type="email" placeholder="Email" required
                    :disabled="emailSent">
                <button v-if="!emailSent" class="btn btn-outline-secondary" type="button" id="button-addon2"
                    @click="sendReCode()" :disabled="emailSent">發送驗證碼</button>
            </div>
        </div>

        <!-- 輸入驗證碼 -->
        <div v-if="emailSent && !emailVerified">
            <div class="input-group mb-1">
                <span class="input-group-text" id="basic-addon1">驗證碼</span>
                <input class="form-control" v-model="enteredCode" type="text" placeholder="請輸入驗證碼" required>
                <button class="btn btn-outline-secondary" id="button-addon2" @click="verifyCode">驗證</button>
            </div>
        </div>
        <!-- 重設密碼 -->
        <div v-if="emailVerified">
            <div class="stepwizard">
                <div class="stepwizard-row">
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-default btn-circle" disabled="disabled">1</button>
                        <p>寄驗證信</p>
                    </div>
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-primary btn-circle">2</button>
                        <p>重設密碼</p>
                    </div>
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-default btn-circle" disabled="disabled">3</button>
                        <p>確認送出</p>
                    </div>
                </div>
            </div>
            <div style="display: flex; justify-content: center;">
                <form class="form-signin w-80 m-auto" @submit.prevent="nextStep">

                    <div class="input-group mb-1">
                        <span class="input-group-text">密碼</span>
                        <input type="password" class="form-control" placeholder="密碼" aria-label="Username" id="myInput1"
                            v-model="user.password" required aria-describedby="basic-addon1">

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
                        <input type="password" class="form-control" placeholder="再輸入一次密碼" aria-label="Username"
                            id="myInput2" v-model="user.confirmPassword" required aria-describedby="basic-addon1">
                    </div>
                    <div class="form-check text-start my-3">
                        <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault1"
                            @click="myFunction2()">
                        <label class="form-check-label" for="flexCheckDefault1">
                            顯示密碼
                        </label>
                    </div>
                    <div class="input-group" style="display: flex;justify-content: right;">
                        <button class="btn btn-primary  mt-2" type="submit"
                            style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">下一步</button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>
<script setup>
import { ref } from 'vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();


const email = ref('');
const enteredCode = ref('');
const emailSent = ref(false);
const emailVerified = ref(false);
const favorite = ref(false);
const confirmation = ref(false);
const user = ref({
    email: '',
    password: '',
    confirmPassword: '',

});




function nextCheck() {
    confirmation.value = true;
};

// 生成驗證碼
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// 寄信
function sendReCode() {
    const emailCheck = email.value;
    axiosapi.get(`/members/email/${emailCheck}`)
        .then(response => {
            if (!response.data.success) {
                const code = generateVerificationCode();
                sessionStorage.setItem('verificationCode', code);
                axiosapi.post("/sendReCode", { email: email.value, code })
                    .then(response => {
                        if (response.data.success) {
                            Swal.fire({
                                text: response.data.message,
                                icon: 'success',
                                confirmButtonText: '確認'
                            });
                            emailSent.value = true;
                        } else {
                            Swal.fire({
                                text: response.data.message,
                                icon: 'error',
                                confirmButtonText: '確認'
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            text: '驗證碼發送失敗，請重試。',
                            icon: 'error',
                            confirmButtonText: '確認'
                        });
                    });
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: 'error',
                    confirmButtonText: '確認'
                });
            }
        })
        .catch(error => {
            Swal.fire({
                text: '檢查電子郵件失敗，請重試。',
                icon: 'error',
                confirmButtonText: '確認'
            });
        });
}


// 驗證
const verifyCode = () => {
    const storedCode = sessionStorage.getItem('verificationCode');
    if (enteredCode.value === storedCode) {
        Swal.fire({
            text: '驗證成功',
            icon: 'success',
            confirmButtonText: '確認'
        });
        emailVerified.value = true;
        user.value.email = email.value;  // 記住email
    } else {
        Swal.fire({
            text: '驗證碼錯誤，請重試。',
            icon: 'error',
            confirmButtonText: '確認'
        });
    }
};

function nextStep() {
    if (user.value.password != user.value.confirmPassword) {
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
                axiosapi.put(`/member/repwd/${email.value}`, user.value)
                    .then(function (response) {
                        if (response.data.success) {
                            Swal.fire({
                                title: "重設成功!",
                                icon: "success"
                            }).then(function () {
                                router.push({ name: "login-link" });
                            });
                        } else {
                            Swal.fire({
                                text: response.data.message || '重設失敗!',
                                icon: 'error',
                                allowOutsideClick: false,
                                confirmButtonText: '確認',
                            }); router.push({ name: "rePassword-link" });
                        }
                    })
                    .catch(function (error) {
                        Swal.fire({
                            text: '重設失敗：' + error.message,
                            icon: 'error',
                            allowOutsideClick: false,
                            confirmButtonText: '確認',
                        });
                    });
            } else {
                router.push({ name: "rePassword-link" });
            };
        });
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


</script>
<style>
body {
    margin: 40px;
}

.stepwizard-step p {
    margin-top: 10px;
}

.stepwizard-row {
    display: table-row;
}

.stepwizard {
    display: table;
    width: 100%;
    position: relative;
}

.stepwizard-step button[disabled] {
    opacity: 1 !important;
    filter: alpha(opacity=100) !important;
}

.stepwizard-row:before {
    top: 14px;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 100%;
    height: 1px;
    background-color: #ccc;
    z-order: 0;

}

.stepwizard-step {
    display: table-cell;
    text-align: center;
    position: relative;
}

.btn-circle {
    width: 30px;
    height: 30px;
    text-align: center;
    padding: 6px 0;
    font-size: 12px;
    line-height: 1.428571429;
    border-radius: 15px;
}

.input-group {
    margin-top: 50px;
    flex: 0 0 500px;
    /* 固定宽度，调整到适合的长度 */
    width: 450px;
    /* 确保宽度固定 */
}
</style>