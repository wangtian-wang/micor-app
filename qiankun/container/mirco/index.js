import store from './store/index.js';
import router from './router/index.js';
const isActiveMicroApp = (...args) => {
  return args.includes(location.pathname);
};
const microApps = [
  {
    name: 'micro-app1',
    activeRule: '激活规则',
    container: 'micro-apps',
    props: { store, router },
    entry: '//localhost:7000'
  },
  {
    name: 'micro-app2',
    activeRule: '激活规则',
    container: 'micro-apps',
    props: { store, router },
    entry: '//localhost:7100'
  }
];
export default microApps;
