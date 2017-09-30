/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const PACKAGE = require('../package.json');

const PROJECT = process.env.DRVR_PROJECT;
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(JSON.stringify(PACKAGE.version));
console.log(NODE_ENV);

const devCssLoaders = 'style-loader!css-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap';

/**
 * he we're trying to imitate how static files server would work:
 * manually define routes per project at buid time, so
 * all projects related to same bundle would be served
 * from different routes, but by equally same bundles.
 * @example
 * drvrstage.cloudapp.net:8080/cc - it is a client-specific route, but it's a `dealer` project, just with unique uri,
 * so, since our backend(s) don't know how to serve right bundle per url we including this logic in bundle.
 * That means static resources should be taken from directory where index.html file lives
 * @example
 * ~/engine/static-root/public/cc - contain all cc resources, which are kinda copy of common dealer bundle
 *
 * We have 3 possible real urls and 1 virtual at the moment
 * DON'T FORGET TO UPDATE THIS DESCRIPTION IF ABOVEMENTIONED WILL BE CHANGED
 * - portal - serves files from `public/index.html`, includes virtual `mwa`
 * - tajo - serves files from `public/tajo/index.html`.
 * - dealer - at this moment of having just one dealer.
 *    - cc - serves files from `public/cc/index.html`
 */
function getPublicPath() {
  switch (PROJECT) {
    case 'tajo':
      return '/tajo/';
    case 'dealer':
      return '/cc/';
    default:
      return '/';
  }
}

module.exports.getPublicPath = getPublicPath;

module.exports.default = options => ({
  entry: ['babel-polyfill'].concat(options.entry),
  output: Object.assign({
    // put build into specified folder
    path: options.outputFolder,
    publicPath: getPublicPath(),
    // add this path to static files in index.html
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
      test: /\.js?$/,
      include: [
        path.join(__dirname, '../node_modules/react-native-storage'),
      ],
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-1', 'react'],
          plugins: ['transform-runtime'],
        },
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
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'images/[hash].[ext]',
      },
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
        DRVR_PROJECT: JSON.stringify(PROJECT),
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

  // Emit a source map for easier debugging
  devtool: options.devtool || 'source-map',

  target: 'web', // Make web variables accessible to webpack, e.g. window
  stats: true, // show stats in the console
});
