//引入 SFC 元件
import Login from "./Login.vue";
import Logout from './Logout.vue';
import Register from './Register.vue';
import Member from './Member.vue';
import Modify from './Modify.vue';
import ModifyPwd from './ModifyPwd.vue';
import Delete from './Delete.vue';

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
