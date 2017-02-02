/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const PACKAGE = require('../package.json');
const NODE_ENV = process.env.NODE_ENV || 'development';
// const cssnext = require('postcss-cssnext');
// const postcssFocus = require('postcss-focus');
// const postcssReporter = require('postcss-reporter');

console.log(JSON.stringify(PACKAGE.version));
console.log(NODE_ENV);

const devCssLoaders = 'style-loader!css-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader';

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({
    // put build into specified folder
    path: options.outputFolder,
    publicPath: '/',
    sourceMapFilename: 'js/[name].js.map',
  }, options.output), // Merge with env dependent settings
  module: {
    rules: [{
      test: /\.js$|\.jsx$/, // Transform all .js files required somewhere with Babel
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: options.babelQuery || {},
      }],
    }, {
      // Transform our own .css files with PostCSS and CSS-modules
      test: /\.css$/,
      exclude: /node_modules/,
      loader: options.cssLoaders || devCssLoaders,
    }, {
      // Do not transform vendor's CSS with CSS-modules
      // The point is that they remain in global scope.
      // Since we require these CSS files in our JS or CSS files,
      // they will be a part of our compilation either way.
      // So, no need for ExtractTextPlugin here.
      test: /\.css$/,
      include: /node_modules/,
      use: [
        'style-loader',
        'css-loader',
      ],
    }, {
      test: /\.jpe?g$|\.gif$|\.png$/i,
      loader: 'url-loader?limit=10000',
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff',
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff',
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader?name=fonts/[name].[hash].[ext]&mimetype=application/octet-stream',
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader?name=fonts/[name].[hash].[ext]',
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.svg$/,
      loader: 'svg-react-loader',
    }],
  },
  plugins: options.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin('common'),
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        DRVR_PROJECT: JSON.stringify(process.env.DRVR_PROJECT),
        DRVR_VERSION: JSON.stringify(PACKAGE.version),
      },
    }),
  ]),

  resolve: {
    modules: [
      path.join(__dirname, '../', 'src'),
      'node_modules',
    ],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'jsnext:main',
      'main',
    ],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  stats: true, // Don't show stats in the console
  // progress: true,
});
