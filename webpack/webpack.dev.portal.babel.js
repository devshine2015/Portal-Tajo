/**
 * CUSTOMER PORTAL DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');

module.exports = require('./webpack.dev.babel')({
  entryPoint: path.join(process.cwd(), 'src/projects/portal/index'),
});
