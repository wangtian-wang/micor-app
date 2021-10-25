import "./public-path.js";

let instance = null;

const render = (store, router, container) => {
  vue.prototype.$store = store;
  instance = new Vue({
    router,
    i18n,
    data() {
      return {
        parentRouter: router,
      };
    },
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#micro-app1") : "micro-app1");
  // micro-app1 是当前应用的public文件夹里面的index.html里面的根元素
  // 要确保在整个项目里面每个微应用的mount的container是唯一的
  // App 组件在挂载后会替换掉html文件里面的根节点
};

export async function bootstrap() {
  console.log("react app bootstraped");
}
export async function mount(props) {
  let { store, i18n, router, container } = props;
  updateI18n(i18n);
  initRouter(router);
  render(store, router, container);
}
export async function unmount(props) {
  instance = null;
}
