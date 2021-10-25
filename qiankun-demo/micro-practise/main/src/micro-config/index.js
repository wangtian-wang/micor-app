const getActiveRule = (hash) => {
  return (location) => {
    return location.hash.startsWith(hash);

    // console.log(hash.includes(location.hash));
    // hash.includes(location.hash);
  };
};

const MicroApps = [
  {
    name: "app1",
    entry: "http://0.0.0.0:8081",
    container: "#micro-container",
    activeRule: getActiveRule(["#/app1"]),
  },
  {
    name: "app2",
    entry: "http://0.0.0.0:8082",
    container: "#micro-container",
    activeRule: getActiveRule(["#/app2"]),
  },
];
export default MicroApps;
