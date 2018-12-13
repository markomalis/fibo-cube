const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/server/index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
}