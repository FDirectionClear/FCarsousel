/**
 * ===================
 *  webpack.common.js
 * ===================
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");
const merge = require('webpack-merge');
const devConfig = require("./webpack.dev.js");
const prodConfig = require("./webpack.prod");
const VueLoaderPlugin = require("vue-loader/lib/plugin")


const commonConfig = {
    module:{
        rules:[
            {
                test:/\.js$/,
                // exclude的意思是，如果js文件来自./node_modules文件
                // 那么就不使用babel-loader,注意是正则表达式的写法。
                exclude:/node_modules/,
                use:[
                    {
                        loader:"babel-loader"
                    },
                    // {
                    //     loader:"imports-loader?this=>window"
                    // }
                ]
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
                test:/\.(eot|woff|ttf|svg)$/,
                use:{
                    loader:"file-loader",
                    options:{
                        name:"[name]_[hash].[ext]",
                        outputPath:"font/",
                    }
                }
            },
            {
                test:/\.vue$/,
                use:{
                    loader:"vue-loader"
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({     
            template:"./src/index.html"
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $:'jquery',
            _join:['lodash','join']
        }),
        new VueLoaderPlugin()
    ],
    entry:{ 
        main:"./src/index.js",
    },
    output:{
        // publicPath:"http://cdn.com.cn",
        path:path.resolve(__dirname,'../bundle')
    },
    optimization:{
        // runtimeChunk:{
        //     name:"runtime"
        // },
        usedExports:true, // TreeShaking
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,  
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                name:"vendors"
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
              }
            }
        },
    }
}

module.exports = (env) => {
    if(env && env.production === "abc"){
        return merge(commonConfig,prodConfig);
    } else {
        return merge(commonConfig,devConfig);
    }
}
