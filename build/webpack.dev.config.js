const path=require('path')
const webpack =require('webpack')
const ExtractTextPlugin=require('extract-text-webpack-plugin')
const nodeExternals = require('webpack-node-externals');
const htmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin=require('copy-webpack-plugin')
module.exports = {
  entry:{
    index:__dirname+'/../examples/index.js'
  },
  output:{
    path:'/',
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test:/\.css$/,
        loader:'style-loader!css-loader'
      }

    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
         'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
     inline: true,
     open: true,
     port: '8100',
     compress: true,
     progress: false,
     historyApiFallback: true,
     //contentBase: path.join(__dirname, '../'),  //uses CopyWebpackPlugin
     https: false,
     hot: true,

 },
  plugins:[
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
     filename:'index.html',
     template: path.join(__dirname, '../index.html'),
     inject: true
    })
  ]
};
