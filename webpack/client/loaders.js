/* eslint no-var:0 */
module.exports = function() {
    var loaders = [{
        test: /\.(otf|svg)(\?.+)?$/,
        loader: 'url-loader?limit=8192',
    }, {
        test: /\.eot(\?\S*)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject',
    }, {
        test: /\.woff2(\?\S*)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/font-woff2',
    }, {
        test: /\.woff(\?\S*)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/font-woff',
    }, {
        test: /\.ttf(\?\S*)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/font-ttf',
    }, {
        test: /\.(css|scss)/,
        loader: 'style!css!sass',
    }];

    if (process.env.NODE_ENV !== 'development') {
        return loaders.concat([{
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                stage: 0,
                cacheDirectory: true,
                plugins: [
                    'react-transform',
                ],
                extra: {
                    'react-transform': {
                        transforms: [{
                            transform: 'react-transform-hmr',
                            imports: ['react'],
                            // this is important for Webpack HMR:
                            locals: ['module'],
                        }],
                    },
                },
            },
        }]);
    }

    return loaders.concat([{
        test: /\.jsx?$/,
        loader: 'babel?stage=0',
        exclude: /node_modules/,
    }]);
};
