import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Ipn from './components/ipn.vue';
import Dashboard from './components/dashboard.vue';
import Order from './components/order.vue';
import Transaction from './components/transactions.vue';


const routes =[
    {
        path: '/ipn',
        component: Ipn,
        name: "Ipn"
    },
    {
        path:'/',
        component: Dashboard,
        name:"Dashboard"

    },
    {
        path:'/order',
        component: Order,
        name: "Order"
    },
    {
        path:'/transaction',
        component: Transaction,
        name: "Transaction"
    }
];

const router = new VueRouter({
    mode : 'history',
    routes : routes
})

export default router;