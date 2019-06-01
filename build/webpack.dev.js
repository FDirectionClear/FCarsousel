/**
 * ================
 *  webpack.dev.js
 * ================
 */

// const merge = require("webpack-merge");
const Webpack = require("webpack");
// const commonConfig = require("./webpack.common.js");

const devConfig = {
    mode:"development",
    devtool:"cheap-module-eval-source-map",
    devServer:{
        contentBase:"./bundle",
        open:true, 
        hot:true, 
        // hotOnly:true 
    },
    module:{
        rules:[
            {
                test:/\.scss$/,
                use:[
                    'vue-style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            importLoaders:2,
                            modules:true,
                            // localIdentName:'[local]_[hash:base64:4]'
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                ] 
            },
            {
                test:/\.css$/,
                use:[
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                ] 
            },
        ]
    },
    output:{
        filename:"[name].js",
        chunkFilename:"[name].js",
    },
    plugins:[
        new Webpack.HotModuleReplacementPlugin()
    ],
    optimization:{
    }
}

module.exports = devConfig;


