//引入 SFC 元件
// import Login from '../views/secure/Login.vue';
// import Logout from '../views/secure/Logout.vue';
// import Register from '../views/secure/Register.vue';
// import Member from '../views/secure/Member.vue';
// import Modify from '../views/secure/Modify.vue';
// import ModifyPwd from '../views/secure/ModifyPwd.vue';
// import Delete from '../views/secure/Delete.vue';

//設定路由網址
export default [
    { name: "login-link", path: "/secure/login", component: Login },
    { name: "logout-link", path: "/secure/logout", component: Logout },
    { name: "register-link", path: "/register", component: Register },
    { name: "member-link", path: "/member", component: Member },
    { name: "modify-link", path: "/modify", component: Modify },
    { name: "modifyPwd-link", path: "/modifyPwd", component: ModifyPwd },
    { name: "delete-link", path: "/delete", component: Delete }
];