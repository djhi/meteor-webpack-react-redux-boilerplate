/* global cd, env, exec */
/* eslint vars-on-top:0, no-var:0 */

require('shelljs/global');
var runWebpackConfigs = require('./runWebpackConfigs');

module.exports = runWebpackConfigs.bind(undefined, 'deploy');
