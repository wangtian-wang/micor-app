module.exports = {
    lintOnSave: false,
    configureWebpack: {
        output: {
            // 将ོsubapp 里ོ面ོ导ོ出ོ的ོ三ོ个ོ接ོ口ོ方ོ法ོ 挂ོ载ོ在ོwོiོnོdོoོwོ上ོ面ོ
            library: 'subapp',
            libraryTarget: 'umd'
        },
        devServer: {
            port: 8081,
            open: true,
            hot: true
        }
    }
}
