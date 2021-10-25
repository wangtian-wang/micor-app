import { registerMicroApps, start } from "qiankun";
import MicroApps from "./micro-config";
import { routes } from "./router";
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

window.VueRouter = VueRouter;

Vue.use(VueRouter);
Vue.config.productionTip = false;
const router = new VueRouter({
  routes,
});
new Vue({
  router: router,
  render: (h) => h(App),
}).$mount("#root");
registerMicroApps(MicroApps, {
  beforeLoad(app) {
    console.log("before load: ", app);
  },
  beforeMount(app) {
    console.log("before mount: ", app.name);
  },
  afterMount(app) {
    console.log("after mount: ", app.name);
  },
});
start({ prefetch: true });
console.log(router);
/**
   prefetch 的 值为true ，当前location.hash对应的微应用加载成功后， 去预拉去其他资源
 */
