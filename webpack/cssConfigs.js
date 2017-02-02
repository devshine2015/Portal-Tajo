const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

const postCss = {
  loader: 'postcss-loader',
  options: {
    plugins: [
      postcssFocus(), // Add a :focus to every :hover
      cssnext({ // Allow future CSS features to be used, also auto-prefixes the CSS...
        browsers: ['last 2 versions', 'IE > 10'], // ...based on this browser list
      }),
      postcssReporter({ // Posts messages from plugins to the terminal
        clearMessages: true,
      }),
    ],
  },
};

const localCss = {
  loader: 'css-loader',
  query: {
    options: {
      localIdentName: '[local]__[path][name]__[hash:base64:5]',
      modules: true,
      importLoaders: 1,
      sourceMap: true,
    },
  },
};

const prodCss = {
  loader: 'css-loader',
  query: {
    options: {
      modules: true,
      importLoaders: 1,
    },
  },
};

const localLoaders = [{
  loader: 'style-loader',
}, localCss, postCss];

const prodLoaders = [prodCss, postCss];

exports.localLoaders = localLoaders;
exports.prodLoaders = prodLoaders;
