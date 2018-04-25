const path=require('path')
const webpack =require('webpack')
const ExtractTextPlugin=require('extract-text-webpack-plugin')
const nodeExternals = require('webpack-node-externals');
const fs=require('fs')

module.exports = {
  entry:{
    index:__dirname+'/../src/index.js'
  },
  output:{
    filename: '[name].js',
    path: __dirname+'/../lib',
    library: 'index',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test:/\.css$/,
        loader:ExtractTextPlugin.extract({
            fallback:'style-loader',
            use:'css-loader'
        })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true,
          vue: {
            loaders: {
              css: ExtractTextPlugin.extract({
              fallback:'vue-style-loader',
              use:'css-loader',
              publicPath:"../",
             }),
            }
          }
        }
      }
    ],
  },
  plugins:[
    new ExtractTextPlugin({
      filename: 'style.css'
    }),
  ]
};
