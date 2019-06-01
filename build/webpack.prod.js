/**
 * =================
 *  webpack.prod.js
 * =================
 */
// const merge = require("webpack-merge");
// const commonConfig = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const prodConfig = {
    mode:"production",
    devtool:"cheap-module-source-map",
    module:{
        rules:[     
            {
                test:/\.scss$/,
                use:[
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ] 
            },
        ] 
    },
    output:{
        // publicPath:"http://cdn.com.cn",s
        filename:"[name].[contenthash].js",
        chunkFilename:"[name].[contenthash].js",
    },
    optimization:{
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:"[name].css", // 同步引入的css
            chunkFilename:"[name].chunk.css" // 异步引入的css
        })
    ]
}

module.exports = prodConfig;



