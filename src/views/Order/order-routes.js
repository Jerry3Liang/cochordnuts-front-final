//引入 SFC 元件
import orderInsert from '@/views/Order/orderInsert.vue';
import orderDetail from '@/views/Order/orderDetail.vue';
import userFindAllOrders from '@/views/Order/userFindAllOrders.vue';
import modify from '@/views/Order/modify.vue';
import paymentSuccess from '@/views/Order/paymentSuccess.vue';
import ECPaymentSuccess from '@/views/Order/ECPaymentSuccess.vue';
import ECPaymentFail from './ECPaymentFail.vue';

export default [
    { name: "paymentSuccess-link", path: "/order/paymentSuccess", component: paymentSuccess },
    { name: "modify-link", path: "/order/modify", component: modify },
    { name: "userFindAllOrders-link", path: "/order/userFindAllOrders", component: userFindAllOrders },
    { name: "orderInsert-link", path: "/order/insert", component: orderInsert },
    { name: "orderDetail-link", path: "/order/OrderDetail", component: orderDetail },
    { name: "ECPaymentSuccess-link", path: "/order/ECPaymentSuccess", component: ECPaymentSuccess },
    { name: "ECPaymentFail-link", path: "/order/ECPaymentFail", component: ECPaymentFail },
]

