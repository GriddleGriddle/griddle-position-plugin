var webpack = require('webpack');

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

module.exports = {
  devtool: 'eval',
  entry: './src/index',
  output: {
    path: __dirname + '/build/',
    filename: 'griddle-position-plugin.js',
    publicPath: '/build/',
    libraryTarget: 'umd'
  },
  plugins: [
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    'react': reactExternal,
    'griddle-core': 'griddle-core',
    'griddle-render': 'griddle-render',
    'immutable': 'immutable'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        'plugins': ['babel-plugin-object-assign'],
        'stage': 0
      },
      exclude: /node_modules/,
    } ]
  }
};
