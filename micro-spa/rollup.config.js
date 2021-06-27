import server from 'rollup-plugin-serve';
export default {
    input: './src/single-spa/index.js',
    output: {
        file: './lib/single-spa.js',
        format: 'umd',
        name: 'singleSpa',// 入ོ口ོ文ོ件ོ向ོ外ོ暴ོ露ོ的ོ包ོ名ོ
        sourcemap: true
    },
    plugin: [
        server({
            openPage: '/index.html',
            contentBase: '',//html文ོ件ོ所ོ在ོ的ོ文ོ件ོ夹ོ,
            port: 3333
        })
    ]
}