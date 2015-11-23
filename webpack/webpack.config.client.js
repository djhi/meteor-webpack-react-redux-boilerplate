/* eslint no-var:0 */
var path = require('path');
var webpack = require('webpack');

var entries = require('./client/entries');
var loaders = require('./client/loaders');
var plugins = require('./client/plugins');

var host = '0.0.0.0';
var webpackPort = 9090;
var meteorPort = 3000;
var baseUrl = 'http://' + host + ':' + webpackPort;
var contentBase = 'http://' + host + ':' + meteorPort;
var publicPathRoot = process.env.NODE_ENV === 'development' ? baseUrl : '';

module.exports = {
    context: __dirname,
    devtool: 'eval-source-map',
    entry: entries(baseUrl),
    output: {
        path: path.join(__dirname, 'assets'),
        filename: 'client.bundle.js',
        publicPath: publicPathRoot + '/assets/',
        pathinfo: process.env.NODE_ENV === 'development',
        // crossOriginLoading is important since we are running
        // webpack-dev-server from a different port than Meteor
        crossOriginLoading: process.env.NODE_ENV === 'development' ? 'anonymous' : false,
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: path.join(__dirname, '../app'),
    },
    module: {
        loaders: loaders(),
        // instrument only testing sources with Istanbul
        preLoaders: process.env.NODE_ENV === 'test' && [{
            test: /\.js/,
            exclude: /^.*(main_client|main_server|containers|components).*\.jsx?/,
            include: path.resolve('app/'),
            loader: 'isparta-instrumenter-loader',
        }],
    },
    plugins: plugins(),
    devServer: {
        publicPath: baseUrl + '/assets/',
        host: host,
        hot: true,
        historyApiFallback: true,
        contentBase: contentBase,
        port: webpackPort,
    },

};
