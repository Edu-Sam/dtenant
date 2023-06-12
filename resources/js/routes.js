import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Ipn from './components/ipn.vue';
import Dashboard from './components/dashboard.vue';

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

    }
];

const router = new VueRouter({
    mode : 'history',
    routes : routes
})

export default router;