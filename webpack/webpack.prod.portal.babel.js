// Important modules this config uses
const path = require('path');

module.exports = require('./webpack.prod.babel')({
  entryPoint: path.join(process.cwd(), 'src/portal.js'),
  outputFolder: path.resolve(process.cwd(), 'customer'),
  projectFolder: 'tajo',
});
