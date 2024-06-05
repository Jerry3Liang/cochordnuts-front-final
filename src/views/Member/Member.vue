<template>
    <div class="container" v-if="member">

        <div class="col-md-9" style="margin: auto;">
            <div class="card">
                <div class="card-body">

                    <div class="col-md-12">
                        <h3>會員資料</h3>
                        <hr>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <form>
                                <div class="form-group row">
                                    <label for="name" class="col-4 col-form-label">姓名:</label>
                                    <div class="col-8">
                                        <input id="name" name="name" placeholder="姓名" class="form-control here"
                                            required="required" type="text" v-model="member.name" disabled>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="birthday" class="col-4 col-form-label">生日:</label>
                                    <div class="col-8">
                                        <input id="birthday" name="birthday" placeholder="生日" class="form-control here"
                                            type="text" :value="formatBirthday(member.birthday)" disabled>
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
                                        <input id="email" name="email" placeholder="Email" class="form-control here"
                                            type="text" v-model="member.email" disabled>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="address" class="col-4 col-form-label">地址:</label>
                                    <div class="col-8">
                                        <input id="address" name="address" placeholder="地址" class="form-control here"
                                            type="text" v-model="member.address" disabled>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="phone" class="col-4 col-form-label">電話:</label>
                                    <div class="col-8">
                                        <input id="phone" name="phone" placeholder="電話" class="form-control here"
                                            type="text" v-model="member.phone" disabled>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="recipient" class="col-4 col-form-label">常用收件人:</label>
                                    <div class="col-8">
                                        <input id="recipient" name="recipient" placeholder="常用收件人"
                                            class="form-control here" type="text" v-model="member.recipient" disabled>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="recipientAddress" class="col-4 col-form-label">常用收件人地址:</label>
                                    <div class="col-8">
                                        <input id="recipientAddress" name="recipientAddress" placeholder="常用收件人地址"
                                            class="form-control here" type="text" v-model="member.recipientAddress"
                                            disabled>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="recipientPhone" class="col-4 col-form-label">常用收件人電話:</label>
                                    <div class="col-8">
                                        <input id="recipientPhone" name="recipientPhone" placeholder="常用收件人電話"
                                            class="form-control here" type="text" v-model="member.recipientPhone"
                                            disabled>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="recipientPhone" class="col-4 col-form-label">喜好:</label>
                                    <div class="col-8">
                                        <input id="favorites" name="favorites" placeholder="喜好" type="text"
                                            class="form-control here" :value="favoritesDisplay" disabled>
                                    </div>
                                </div>

                            </form>
                            <RouterLink to="/memberModify">
                                <button class="btn btn-primary" type="button">修改</button>
                            </RouterLink>
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

const favorites = ref([]);

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

const favoritesDisplay = computed(() => {
    return favorites.value.map(getProductStyleName).join(', ');
});

onMounted(() => {
    const loggedInMemberNo = sessionStorage.getItem("memberNo");
    if (loggedInMemberNo != null) {
        axiosapi.get(`/members/${loggedInMemberNo}`)
            .then(response => {
                console.log("API response:", response);
                member.value = response.data.list[0];

                favorites.value = member.value.favorites;
            })
            .catch(error => {
                console.error('Error fetching member data:', error);
            });
    } else {
        Swal.fire({
            text: '尚未登入',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        }).then(() => {
            router.push({ name: "login-link" });
        });
    }
});

const formatBirthday = (dateString) => {
    if (dateString.includes('T')) {
        return dateString.split('T')[0];
    } else {
        return dateString;
    }
};
</script>

<style scoped>
.container {
    margin: auto;
    max-width: 80%;
}

.card {
    margin-top: 40px;
}

.form-group.row {
    margin-bottom: 15px;
}

label {
    font-size: 18px;
    font-weight: 550;
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
    margin-left: 45%;
}
</style>
