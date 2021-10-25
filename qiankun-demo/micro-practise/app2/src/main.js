import "./pablic-path.js";
import App from "./App.vue";
Vue.config.productionTip = false;

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import { routes } from "./router";

let instance = null;
let router = null;

function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    routes: routes,
  });
  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app2") : "#app2");
}
export async function bootstrap() {}
export async function mount(props) {
  console.log(props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
  router = null;
}
