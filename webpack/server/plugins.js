/* eslint no-var:0 */
var path = require('path');
var webpack = require('webpack');
var RunInMeteorPlugin = require('webpack-meteor-tools/lib/RunInMeteorPlugin');

var meteorPath = path.join(__dirname, '../..', 'meteor_core');

module.exports = function() {
    var plugins = [
        new webpack.PrefetchPlugin('react'),
        new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment'),
    ];

    if (process.env.NODE_ENV === 'development') {
        return plugins.concat([
            new RunInMeteorPlugin({
                key: 'server',
                mode: 'development',
                path: meteorPath,
                target: 'server',
            }),
        ]);
    }

    return plugins.concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new RunInMeteorPlugin({
            key: 'server',
            mode: 'production',
            path: meteorPath,
            target: 'server',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
    ]);
};
