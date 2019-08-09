/**
 * @file (next.config)
 * Created by Xinyi on 2019-08-07
 */

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// next.config.js
const withCSS = require('@zeit/next-css');
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
        return config;
    }
});
