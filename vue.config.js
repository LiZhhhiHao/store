module.exports = {
    // css: {
    //     loaderOptions: {
    //         less: {
    //             // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
    //             lessOptions: {
    //                 modifyVars: {
    //                     // 直接覆盖变量
    //                     'text-color': '#f00',
    //                     'border-color': '#eee',
    //                     // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
    //                     hack: `true; @import "your-less-file-path.less";`,
    //                 },
    //             },
    //         },
    //     },
    // },
    lintOnSave: true,

    devServer: {
        port:8090
    },
    publicPath: './', //项目路径
    outputDir: 'dist', //打包出来的项目名，默认dist
}