/**
 * SELF-SERVICE REPORTING DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');

module.exports = require('./webpack.dev.babel')({
  // Start with src/app.js
  entryPoint: path.join(process.cwd(), 'src/projects/ssreports'),
});
