const render = (store, router) => {
  vue.prototype.$store = store;
  instance = new Vue({
    router,
    i18n,
    data() {
      return {
        parentRouter: router
      };
    },
    render: h => h(App)
  }).$mounter(
    document.querySelector('#micro-apps')
      ? document.querySelector('#micro-apps')
      : 'micro-app1'
  );
};

export async function bootstrap() {
  console.log('react app bootstraped');
}
export async function mount(props) {
  let { store, i18n, router } = props;
  updateI18n(i18n);
  initRouter(router);
  render(store, router);
}
export async function unmount(props) {
  instance = null;
}
