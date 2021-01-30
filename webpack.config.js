/* eslint-disable @typescript-eslint/no-var-requires */
// Comprehensive webpack 5 walkthrough https://www.valentinog.com/blog/webpack/
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = (relativePath) =>
  path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || 'localhost';

// Required for babel-preset-react-app
process.env.NODE_ENV = 'development';

// ... imports and variables

module.exports = {
  // Environment mode
  mode: 'development',

  // Entry point of app
  entry: resolveAppPath('frontend/index.js'),

  output: {
    // Development filename output
    path: path.resolve(__dirname, 'dist'), //actually optional as webpack will build to dist by default
    filename: 'static/js/bundle.js',
  },
  devServer: {
    // Serve index.html as the base
    contentBase: resolveAppPath('frontend/public'),

    // Enable compression
    compress: true,

    // Enable hot reloading
    hot: true,

    host,

    port: 3010,

    // Public path is root of content base
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    // Re-generate index.html with injected script tag.
    // The injected script tag contains a src value of the
    // filename output defined above.
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveAppPath('frontend/public/index.html'),
    }),
  ],
};
