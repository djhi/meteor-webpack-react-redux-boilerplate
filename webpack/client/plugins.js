/* eslint no-var:0 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var RunInMeteorPlugin = require('webpack-meteor-tools/lib/RunInMeteorPlugin');

var meteorPath = path.join(__dirname, '../..', 'meteor_core');
console.log({meteorPath: meteorPath})
module.exports = function() {
    var plugins = [
        new webpack.PrefetchPlugin('react'),
        new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment'),
    ];

    if (process.env.NODE_ENV === 'development') {
        return plugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new RunInMeteorPlugin({
                key: 'client',
                mode: 'development',
                path: meteorPath,
                target: 'client',
            }),
        ]);
    }

    return plugins.concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new RunInMeteorPlugin({
            key: 'client',
            mode: 'production',
            path: meteorPath,
            target: 'client',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
    ]);
};
