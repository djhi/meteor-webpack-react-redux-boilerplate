/* eslint vars-on-top:0, no-var:0 */

var path = require('path');
var dirs = require('./dirs');
var runWebpackConfigs = require('webpack-meteor-tools/lib/runWebpackConfigs');

module.exports = function customRunWebpackConfigs(mode, callback) {
    var configs = [
        require(path.join(dirs.webpack, 'webpack.config.client.js')),
        require(path.join(dirs.webpack, 'webpack.config.server.js')),
    ];

    return runWebpackConfigs(configs, callback);
};
