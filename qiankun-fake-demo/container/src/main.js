import './public-path';
import App from './App.vue';
import microApps from './mirco/index.js';
import { registerMicroApps, start } from 'qiankun';
import i18n from './i18n/index.js';
import router from './router/index.js';
import './plugins/element.js';
import './assets/css/index/css';
import './plugins/index.js';
import store from './store/index.js';

const instance = new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#root');
const getLoaderFn = instance => {
  return loading => {
    instance.$store.commit('changeLoading', loading);
  };
};
const loaderFn = getLoaderFn(instance);

microApps.map(item => {
  return {
    ...item,
    loader: loaderFn
  };
});

registerMicroApps(microApps, {
  beforeLoad: app => console.log('before load', app.name),
  beforeMount: [app => console.log('before mount', app.name)]
});
start({ prefetch: true });
