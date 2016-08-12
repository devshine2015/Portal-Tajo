// Important modules this config uses
const path = require('path');

module.exports = require('./webpack.prod.babel')({
  entryPoint: path.join(process.cwd(), 'src/mapViewDemo.js'),
  outputFolder: path.resolve(process.cwd(), 'mapViewDemo'),
  projectFolder: 'mapViewDemo',
});
