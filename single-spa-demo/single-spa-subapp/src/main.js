import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import singleSpaVue from 'single-spa-vue';
Vue.config.productionTip = false


// new Vue({
//     router,
//     render: h => h(App)
// }).$mount('#app')
const appOptions = {
    el: '#subapp',
    router,
    render: h => h(App),
}
const exportLifeCycle = singleSpaVue({
    Vue,
    appOptions
});
// 当ོ子ོ应ོ用ོ被ོ挂ོ载ོ后ོ，需访ོ问ོ子ོ应ོ用ོ里ོ面ོ的ོ路ོ径ོ需ོ要ོ使ོ用ོ自子ོ应ོ用ོ的ོ端ོ口ོ号ོ
// 主ོ应ོ用ོ加ོ载ོ自ོ用ོ后ོ 会ོ在ོwོiོnོdོoོwོ上ོ面ོ挂ོ载ོ一ོ个ོ属ོ性ོ，表ོ明ོ当ོ前ོmོoོuོnོtོ的ོ是ོ这ོ个ོ子ོ应ོ用ོ
if (window.singleSpaNavigate) {
    __webpack_public_path__ = 'http://localhost:8081/';
} else {
    delete appOptions.el;
    new Vue(appOptions).$mount('#app');
}

// 导ོ出ོ的ོ经ོ过ོ包ོ装ོ的ོVue的ོ声ོ生ོ命ོ周ོ期ོ函ོ数ོ
export const bootstrap = exportLifeCycle.bootstrap;
export const mount = exportLifeCycle.mount;
export const unmount = exportLifeCycle.unmount;