const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Webpack = require("webpack");

module.exports = {
    mode:"development",
    devtool:"cheap-module-eval-source-map",
    devServer:{
        contentBase:"./bundle",
        open:true, 
        hot:true, // 打开hot选项
        hotOnly:true // 一般搭配hotOnly选项，这样即使HMR不生效也不刷新浏览器。
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                // exclude的意思是，如果js文件来自./node_modules文件
                // 那么就不使用babel-loader,注意是正则表达式的写法。
                exclude:/node_modules/,
                loader:"babel-loader",
                // babel-loader的配置信息可以写在.babelrc文件之中。
                // 从而可以省略options配置项。
            },
            {
                test:/\.(jpg|png|gif)$/,
                use:{
                    loader:"url-loader",
                    options:{
                        name:"[name].[ext]",
                        outputPath:"images/",
                        limit:27000,
                    }
                }
            },
            {
                test:/\.scss$/,
                use:[
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            importLoaders:2,
                            modules:true
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                ] 
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ] 
            },
            {
                test:/\.(eot|woff|ttf|svg)$/,
                use:{
                    loader:"file-loader",
                    options:{
                        name:"[name]_[hash].[ext]",
                        outputPath:"font/",
                    }
                }
            }
        ]
    },
    entry:{
        main:"./src/index.js",
        // sub:"./src/index.js"
    },
    output:{
        // publicPath:"http://cdn.com.cn",
        filename:"[name].js",
        path:path.resolve(__dirname,'bundle')
    },
    plugins:[
        new HtmlWebpackPlugin({     
            template:"./src/index.html"
        }),
        new CleanWebpackPlugin(['bundle']),
        new Webpack.HotModuleReplacementPlugin()
    ],
    // optimization与entry同级
    // optimization的中文意思是：最优化、优化组合
    // 配置optimization的属性usedExports:true来打开TreeShaking功能。
    optimization:{
        // 注意应该是在开发环境下配置！
        usedExports:true
    }
}