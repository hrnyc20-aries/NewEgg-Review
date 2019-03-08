const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    app: ['babel-polyfill', `./src/index.jsx`]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    chunkFilename: '[id].js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env', 'react', 'stage-0']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new CompressionPlugin()
  ]
};
