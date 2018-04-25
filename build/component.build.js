const path=require('path')
const webpack =require('webpack')
const ExtractTextPlugin=require('extract-text-webpack-plugin')
const nodeExternals = require('webpack-node-externals');
const fs=require('fs')
const vue={
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}

const componentData=require('../components.json')
let entry=Object.assign({},componentData)
let externals=Object.assign({},vue,nodeExternals())
module.exports = {
  entry:entry,
  output:{
    filename: '[name].js',
    path: __dirname+'../lib',
    library: 'index',
    libraryTarget: 'umd'
  },
  externals:externals,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test:/\.css$/,
        loader:ExtractTextPlugin.extract(['style-loader','css-loader'])
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
              publicPath:"../"
             }),
            }
          }
        }
      }
    ],
  },
  plugins:[

    new ExtractTextPlugin({
      filename: '[name]/[name].css'
    }),
  ]
};
4036
