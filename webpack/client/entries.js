/* eslint no-var:0 */
module.exports = function(baseUrl) {
    var entries = [
        'regenerator/runtime',
        '../app/main_client',
    ];

    if (process.env.NODE_ENV === 'development') {
        return [
            'webpack-dev-server/client?' + baseUrl,
            'webpack/hot/only-dev-server',
        ].concat(entries);
    }

    return entries;
};
