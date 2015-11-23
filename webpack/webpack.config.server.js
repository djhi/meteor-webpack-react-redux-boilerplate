/* eslint no-var:0 */
var path = require('path');
var plugins = require('./server/plugins');
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: process.env.NODE_ENV === 'development' && 'source-map',
    watch: true,
    target: 'node',
    entry: [
        'regenerator/runtime',
        '../app/main_server',
    ],
    output: {
        path: path.join(__dirname, 'assets'),
        filename: 'server.bundle.js',
        publicPath: '/assets/',
        pathinfo: process.env.NODE_ENV === 'development',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: path.join(__dirname, '../app'),
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel?stage=0',
            exclude: /node_modules|lib/,
        }, {
            test: /\.(css|scss)/,
            loader: 'style!css!sass',
        }],
    },
    plugins: plugins(),
};
