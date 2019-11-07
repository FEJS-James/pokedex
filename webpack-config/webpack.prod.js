const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');



module.exports = merge(common, {
    mode: 'production',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin({}), 
            // new OptimizeCSSAssetsPlugin({})
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style/style.[hash].css'
        }),
    ],
    module: {
        rules: [ 
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { 
                        loader: 'css-loader', 
                        options: { sourceMap: false } 
                    },
                ]
            }, 
            {
              test: /\.sass$/,
              use: [
                MiniCssExtractPlugin.loader,
                { loader: 'css-loader', options: { sourceMap: false } },
                { loader: 'sass-loader', options: { sourceMap: false } }
              ]
            },
        ]
    }

});