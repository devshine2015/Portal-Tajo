const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfigs = require('./commons.json');
const baseConfig = require('./webpack.base').default;
const getPublicPath = require('./webpack.base').getPublicPath;

const PROJECT = process.env.DRVR_PROJECT;

module.exports = baseConfig({
  // skip all hot-reloading stuff
  entry: [
    path.join(process.cwd(), `src/projects/${PROJECT}`),
  ],

  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },

  // where compile locally
  outputFolder: path.resolve(process.cwd(), `builds/dev/${PROJECT}`),

  plugins: [
    new HtmlWebpackPlugin(Object.assign({}, commonConfigs.htmlPlugin, {
      base: getPublicPath(),
    })),
  ],
});
