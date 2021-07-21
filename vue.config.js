// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require("path");
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/'
module.exports = {
    publicPath: BASE_URL, // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
    outputDir: 'dist', // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
    assetsDir: 'public', //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
    indexPath: 'index.html', //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
    pages: {
        //pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
        index: {
            //除了 entry 之外都是可选的
            entry: 'src/main.js', // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
            template: 'public/index.html', // 模板来源
            filename: 'index.html', // 在 dist/index.html 的输出
            title: '浙江非线数联科技有限公司', // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
            chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
        }
    },
    lintOnSave: false, // 是否在保存的时候检查
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    // webpack配置
    chainWebpack: (config) => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
        // 移除 preload 插件
        config.plugins.delete('preload');
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production'
            // gzip压缩
            const productionGzipExtensions = ['html', 'js', 'css']
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp(
                    '\\.(' + productionGzipExtensions.join('|') + ')$'
                    ),
                    threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                    deleteOriginalAssets: false // 删除原文件
                })
            )
        } else {
            // 为开发环境修改配置...
            config.mode = 'development'
        }
        Object.assign(config, {
            // 开发生产共同配置
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src'),
                    '@c': path.resolve(__dirname, './src/components'),
                    '@v': path.resolve(__dirname, './src/views'),
                    '@a': path.resolve(__dirname, './src/assets'),
                    '@u': path.resolve(__dirname, './src/utils'),
                    '@m': path.resolve(__dirname, './src/mixins'),
                    '@cf': path.resolve(__dirname, './src/config'),
                    '@f': path.resolve(__dirname, './src/function')
                } // 别名配置
            }
        })
    },
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
    css: {
        // extract: true, // 是否使用css分离插件 ExtractTextPlugin(跟热加载冲突)
        sourceMap: true, // 开启 CSS source maps
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            }
        }, // css预设器配置项
        requireModuleExtension: true // 启用 CSS modules for all css / pre-processor files.
    },
    //反向代理
    devServer: {
        // 环境配置
        host: '0.0.0.0',
        port: 8010,
        https: false,
        hotOnly: false,
        open: true, //配置自动启动浏览器
        proxy: {
            // 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
            // '/fline/flinev-monitor-station/': {
            //     target: 'http://172.16.3.40:9104/',
            //     // target: 'http://172.16.1.191:9101/',
            //     pathRewrite: {
            //         '^/fline/flinev-monitor-station': '/'
            //     }
            // },
            // '/fline/flinev-space-station/': {
            //     target: 'http://172.16.3.40:9102/',
            //     // target: 'http://172.16.1.191:9101/',
            //     pathRewrite: {
            //         '^/fline/flinev-space-station': '/'
            //     }
            // },
            '/fline': {
                target: 'http://172.16.1.191:9101/',
                pathRewrite: {
                    '^/fline': '/'
                }
            }
        }
    },
    pluginOptions: {
        // 第三方插件配置
        // ...
    }
}
