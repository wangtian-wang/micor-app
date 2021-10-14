const port = 7000;
const name = require("./package.json").name;
/*  

子应用以文件包的形式被基座容器加载 所以子应用打包时候的包名 必须和配置子应用的name属性相同



*/
module.export = {
  configureWebpack: {
    output: {
      library: name,
      target: "umd",
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
  devServer: {
    hot: true,
    port: port,
  },
};
