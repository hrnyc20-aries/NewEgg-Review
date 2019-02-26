var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: ['babel-polyfill', `${SRC_DIR}/index.jsx`]
  },
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
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
    new CompressionPlugin()
  ]
};