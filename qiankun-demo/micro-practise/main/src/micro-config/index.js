const getActiveRule = hash => {
  return location => {
    return location.hash.startsWith(hash);
  };
};

const MicroApps = [
  {
    name: 'app1',
    entry:
      process.env.NODE_ENV === 'production'
        ? `http://${location.hostname}:8081`
        : 'http://0.0.0.0:8081',
    container: '#micro-container',
    activeRule: getActiveRule(['#/app1'])
  },
  {
    name: 'app2',
    entry: 'http://0.0.0.0:8082',
    container: '#micro-container',
    activeRule: getActiveRule(['#/app2'])
  }
];
export default MicroApps;
