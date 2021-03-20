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
    },
    configureWebpack : {
        performance: {
            hints:'warning',
            //入口起点的最大体积 整数类型（以字节为单位）
            maxEntrypointSize: 50000000,
            //生成文件的最大体积 整数类型（以字节为单位 300k）
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js');
            }
        }
    }
}
