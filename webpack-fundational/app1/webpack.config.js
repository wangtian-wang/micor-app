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
    port: 3000
  },
  plugins: [
    new htmlPlugin({
      template: './src/index.html',
      chunks: 'all'
    }),
    new ModuleFederationPlugin({
      name: 'app1', // 导出模块名称
      filename: 'app1.js', //导出模块文件名
      exposes: {
        // 要共享的模块
        './sayHello': './src/sayHello.js'
      }
    })
  ]
};
