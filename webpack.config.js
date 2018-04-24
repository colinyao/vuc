const path=require('path')
const webpack =require('webpack')
const ExtractTextPlugin=require('extract-text-webpack-plugin')
const nodeExternals = require('webpack-node-externals');
const vue={
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}
let externals=Obejct.assign({},vue,nodeExternals())
module.exports = {
  entry:{
    'a': './src/components/a.vue',
    'b': './src/components/b.vue'
  },
  output:{
    filename: '[name].js',
    path: __dirname+'/src/lib',
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
