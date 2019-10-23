module.exports = {
    // outputDir: `${srcFile}`, // 在npm run build时 生成文件的目录 type:string, default:'dist'
    productionSourceMap: false,

    chainWebpack: (config) => {

        /* 添加分析工具 */
        if (process.env.NODE_ENV === 'production') {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                .end()
            config.plugins.delete('prefetch')
        } else {
        }
    }
}
