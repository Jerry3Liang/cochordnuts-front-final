//引入 SFC 元件
import orderInsert from '@/views/Order/orderInsert.vue';
import orderDetail from '@/views/Order/orderDetail.vue';
import userFindAllOrders from '@/views/Order/userFindAllOrders.vue';
import modify from '@/views/Order/modify.vue'

export default [
    { name: "modify-link", path: "/order/modify", component: modify },
    { name: "userFindAllOrders-link", path: "/order/userFindAllOrders", component: userFindAllOrders },
    { name: "orderInsert-link", path: "/order/insert", component: orderInsert },
    { name: "orderDetail-link", path: "/order/OrderDetail", component: orderDetail }
]

