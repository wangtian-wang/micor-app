const { resolve } = require('path');
const htmlPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'output')
  },
  devServer: {
    open: true,
    hot: true,
    port: 3001
  },
  plugins: [
    new htmlPlugin({
      template: './src/index.html'
    }),
    new ModuleFederationPlugin({
      remotes: {
        // 本地使用的远程模块的别名：远程模块的应用名称 （name）@远程模块的地址/远程模块导出文件名（filename）
        // name filename  来自远程模块的微联邦配置 字段
        app1: 'app1@http://localhost:3000/app1.js'
      }
    })
  ]
};
