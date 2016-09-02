// Important modules this config uses
const path = require('path');

module.exports = require('./webpack.prod.babel')({
  entryPoint: path.join(process.cwd(), 'src/projects/escape'),
  outputFolder: path.resolve(process.cwd(), 'escape'),
  projectFolder: 'tajo',
});
