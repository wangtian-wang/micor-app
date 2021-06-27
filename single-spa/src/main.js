import Vue from 'vue'
Vue.config.productionTip = false


import App from './App.vue'
import router from './router/index';
import { registerApplication, start } from 'single-spa';
async function loadScript (url) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    })

}
// registerApplication(name,)name 要ོ加ོ载ོ的ོ子ོ应ོ用ོ的ོ名ོ字ོ 随ོ便ོ写ོ
registerApplication('subapp',
    async () => {
        // 协ོ议ོ接ོ入ོ 必ོ须ོ导ོ出ོ3个ོ方ོ法ོ 来ོ加ོ载ོ子ོ应ོ用ོ
        await loadScript('http://localhost:8081/js/chunk-vendors.js')

        await loadScript('http://localhost:8081/js/app.js')
        // 将ོ子ོ应ོ用ོ暴ོ露ོ在ོwོiོnོdོoོwོ上ོ面ོ的ོsubapp属ོ性ོ 返挂ོ载ོ到ོ主ོ应ོ用ོ的ོwindow上ོ,父ོ应ོ用ོ去ོ加执ོ行ོ子ོ应ོ用ོ暴ོ露ོ出ོ来ོ的ོ方ོ法ོ
        return window.subapp


    },
    location => {
        return location.pathname.startsWith('/subapp')
    })

start()
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
