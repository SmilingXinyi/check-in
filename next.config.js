/**
 * @file (next.config)
 * Created by Xinyi on 2019-08-07
 */

require('dotenv').config();
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// next.config.js
const withCSS = require('@zeit/next-css');
const dotenv = require('dotenv-webpack')

module.exports = withCSS({
    /* config options here */
    cssLoaderOptions: {
        importLoaders: 1
    },
    webpack(config, options) {
        // if (!config.optimization.minimizer) {
        //     config.optimization.minimizer = [];
        //     config.optimization.minimizer.push(
        //         new TerserPlugin()
        //     )
        // }

        if (config.optimization.minimizer) {
            config.optimization.minimizer.push(
                new OptimizeCssAssetsPlugin({
                    cssProcessorPluginOptions: {
                        preset: ['default', {discardComments: {removeAll: true}}],
                    }
                })
            );
        }

        config.plugins = [
            ...config.plugins,

            // Read the .env file
            new dotenv({
                path: path.join(__dirname, '.env'),
                systemvars: true
            })
        ]

        return config;
    }
});
