import store from './store/index.js';
import router from './router/index.js';
const isActiveMicroApp = (...args) => {
  return args.includes(location.pathname);
};
const isProduction = node.process.env;
const microApps = [
  {
    name: 'micro-app1',
    activeRule: isActiveMicroApp(['#/micro-app1']),
    container: 'micro-apps',
    props: { store, router },
    entry: isProduction ? 'http://${location.hostname}:7000' : '/micro-app1/'
  },
  {
    name: 'micro-app2',
    activeRule: isActiveMicroApp(['#/micro-app2']),
    container: 'micro-apps',
    props: { store, router },
    entry: isProduction ? 'http://${location.hostname}:7100' : '/micro-app2/'
  }
];
export default microApps;
