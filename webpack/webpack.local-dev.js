/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base').default;
const getPublicPath = require('./webpack.base').getPublicPath;
const commonConfigs = require('./commons.json');

const PROJECT = process.env.DRVR_PROJECT;

module.exports = baseConfig({
  // Add hot reloading in development
  entry: [
    'webpack-hot-middleware/client',
    path.join(process.cwd(), `src/projects/${PROJECT}`),
  ],

  // Don't use hashes in dev mode for better performance
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },

  // where compile locally
  outputFolder: path.resolve(process.cwd(), `builds/local/${PROJECT}`),

  // Add hot reloading
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin(Object.assign({}, commonConfigs.htmlPlugin, {
      base: getPublicPath(),
    })),
  ],

  // Tell babel that we want to hot-reload
  babelQuery: {
    // presets: ['react-hot'],
  },

  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },

  // Emit a source map for easier debugging
  devtool: 'inline-source-map',
});
