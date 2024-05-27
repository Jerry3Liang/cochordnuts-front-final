//引入 SFC 元件
// import orderInsert from '@/components/orderInsert.vue';
// import orderDetail from '@/components/orderDetail.vue';
// import userFindAllOrders from '@/components/userFindAllOrders.vue';
// import modify from '@/components/modify.vue'

export default [
    { name: "modify-link", path: "/order/modify", component: modify },
    { name: "userFindAllOrders-link", path: "/order/userFindAllOrders", component: userFindAllOrders },
    { name: "orderInsert-link", path: "/order/insert", component: orderInsert },
    { name: "orderDetail-link", path: "/order/OrderDetail", component: orderDetail }
]