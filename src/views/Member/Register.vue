<template>
    <div align="center" style="margin-top: 40px">
        <!-- 驗證信箱 -->
        <div v-if="!emailVerified && !favorite">
            <div class="stepwizard">
                <div class="stepwizard-row">
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-primary btn-circle">1</button>
                        <p>驗證信箱</p>
                    </div>
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-default btn-circle" disabled="disabled">2</button>
                        <p>填寫基本資料</p>
                    </div>
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-default btn-circle" disabled="disabled">3</button>
                        <p>選擇喜好</p>
                    </div>
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-default btn-circle" disabled="disabled">4</button>
                        <p>確認送出</p>
                    </div>
                </div>
            </div>
            <div class="input-group mb-1">
                <span class="input-group-text" id="basic-addon1">Email</span>
                <input class="form-control" v-model="email" type="email" placeholder="Email" required
                    :disabled="emailSent">
                <button v-if="!emailSent" class="btn btn-outline-secondary" type="button" id="button-addon2"
                    @click="sendVerificationCode()" :disabled="emailSent">發送驗證碼</button>
            </div>
            <div v-if="!emailSent && !emailVerified" style="margin-top: 40px;">
                <RouterLink to="/secure/login">已有帳號</RouterLink>
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

        <!-- 基本資料 -->
        <div v-if="emailVerified && !favorite">
            <div class="stepwizard">
                <div class="stepwizard-row">
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-default btn-circle" disabled="disabled">1</button>
                        <p>驗證信箱</p>
                    </div>
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-primary btn-circle">2</button>
                        <p>填寫基本資料</p>
                    </div>
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-default btn-circle" disabled="disabled">3</button>
                        <p>選擇喜好</p>
                    </div>
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-default btn-circle" disabled="disabled">4</button>
                        <p>確認送出</p>
                    </div>
                </div>
            </div>

            <div style="display: flex; justify-content: center;">

                <form class="form-signin w-80 m-auto" @submit.prevent="nextStep">

                    <div class="input-group mb-1">
                        <span class="input-group-text" id="basic-addon1">姓名</span>
                        <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                            v-model="user.name" required aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-1">
                        <span class="input-group-text" id="basic-addon1">生日</span>

                        <input id="birthday" name="birthday" placeholder="生日" class="form-control here" type="date"
                            v-model="user.birthday" :max="maxBirthday()" :min="minBirthday()" required>

                    </div>


                    <div class="input-group mb-1">
                        <span class="input-group-text" id="basic-addon1">Email</span>
                        <input type="email" class="form-control" v-model="user.email" aria-describedby="basic-addon1"
                            :disabled="emailSent">
                    </div>

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
                    <div class="input-group mb-1">
                        <span class="input-group-text" id="basic-addon1">電話</span>
                        <input type="tel" class="form-control" placeholder="電話" aria-label="Username"
                            v-model="user.phone" required aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group">
                        <span class="input-group-text" id="basic-addon1">地址</span>
                        <input type="text" class="form-control" placeholder="地址(選填)" aria-label="Username"
                            v-model="user.address" aria-describedby="basic-addon1">
                    </div>


                    <div class="input-group" style="display: flex;justify-content: right;">
                        <button class="btn btn-primary  mt-2" type="submit"
                            style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">下一步</button>
                    </div>
                </form>
            </div>






        </div>

        <div v-if="favorite && !confirmation">
            <div class="stepwizard">
                <div class="stepwizard-row">
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-default btn-circle" disabled="disabled">1</button>
                        <p>驗證信箱</p>
                    </div>
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-default btn-circle" disabled="disabled">2</button>
                        <p>填寫基本資料</p>
                    </div>
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-primary btn-circle">3</button>
                        <p>選擇喜好</p>
                    </div>
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-default btn-circle" disabled="disabled">4</button>
                        <p>確認送出</p>
                    </div>
                </div>
            </div>
            <form @submit.prevent="nextCheck">
                <div class="form-check form-check-inline" v-for="(item, index) in productStyles" :key="item.id">
                    <input class="form-check-input" type="checkbox" :id="'inlineCheckbox' + index" :value="item.id"
                        v-model="user.favoriteIds">
                    <label class="form-check-label" :for="'inlineCheckbox' + index">
                        {{ item.name }}
                    </label>
                </div>
                <div class="input-group" style="display: flex;justify-content: right;">
                    <button class="btn btn-primary  mt-2" type="submit"
                        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">下一步</button>
                </div>
            </form>
        </div>
        <!-- 確認並顯示資料 -->
        <div v-if="confirmation">
            <div class="stepwizard">
                <div class="stepwizard-row">
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-default btn-circle" disabled="disabled">1</button>
                        <p>驗證信箱</p>
                    </div>
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-default btn-circle" disabled="disabled">2</button>
                        <p>填寫基本資料</p>
                    </div>
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-default btn-circle" disabled="disabled">3</button>
                        <p>選擇喜好</p>
                    </div>
                    <div class="stepwizard-step">
                        <button type="button" class="btn btn-primary btn-circle">4</button>
                        <p>確認送出</p>
                    </div>
                </div>
            </div>
            <form @submit.prevent="callCreate">
                <div class="input-group mb-1">
                    <span class="input-group-text" id="basic-addon1">姓名</span>
                    <input type="text" class="form-control" v-model="user.name" readonly>
                </div>
                <div class="input-group mb-1">
                    <span class="input-group-text" id="basic-addon1">生日</span>
                    <input type="date" class="form-control" v-model="user.birthday" readonly>
                </div>
                <div class="input-group mb-1">
                    <span class="input-group-text" id="basic-addon1">Email</span>
                    <input type="email" class="form-control" v-model="user.email" readonly>
                </div>
                <div class="input-group mb-1">
                    <span class="input-group-text">密碼</span>
                    <input type="password" class="form-control" v-model="user.password" readonly>
                </div>
                <div class="input-group mb-1">
                    <span class="input-group-text" id="basic-addon1">電話</span>
                    <input type="tel" class="form-control" v-model="user.phone" readonly>
                </div>
                <div class="input-group mb-1">
                    <span class="input-group-text" id="basic-addon1">地址</span>
                    <input type="text" class="form-control" v-model="user.address" readonly>
                </div>
                <div class="input-group mb-1">
                    <span class="input-group-text">喜好</span>
                    <input type="text" class="form-control"
                        :value="user.favoriteIds.map(getProductStyleName).join(', ')" readonly>
                </div>
                <div class="input-group" style="display: flex;justify-content: right;">
                    <button class="btn btn-primary mt-2" type="submit"
                        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">確認並送出</button>
                </div>
            </form>
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

function getProductStyleName(id) {
    const style = productStyles.value.find(item => item.id === id);
    return style ? style.name : '';
}

function nextCheck() {
    confirmation.value = true;
};

// 生成驗證碼
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// 寄信
function sendVerificationCode() {
    const emailCheck = email.value;
    axiosapi.get(`/members/email/${emailCheck}`)
        .then(response => {
            if (response.data.success) {
                const code = generateVerificationCode();
                sessionStorage.setItem('verificationCode', code);
                axiosapi.post("/sendCode", { email: email.value, code })
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

//基本資料to喜好
function nextStep() {
    if (user.value.password !== user.value.confirmPassword) {
        Swal.fire({
            text: '密碼不一致，請重新輸入。',
            icon: 'warning',
            confirmButtonText: '確認',
        });
        return;
    }
    const phoneCheck = user.value.phone;
    axiosapi.get(`/members/phone/${phoneCheck}`)
        .then(response => {
            if (response.data.success) {
                favorite.value = true;
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: 'error',
                    confirmButtonText: '確認'
                });
            }
        })
}


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

    axiosapi.post('/members', user.value).then(function (response) {
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
