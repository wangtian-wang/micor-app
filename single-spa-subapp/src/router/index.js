import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)
const router = new Router({
    mode: 'history',
    base: '/subapp',
    routes: [
        {
            path: '/test',
            name: 'test',
            component: () => import('../views/test.vue')
        }
    ]
});
export default router;
