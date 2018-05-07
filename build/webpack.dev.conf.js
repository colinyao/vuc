const path=require('path')
const webpack =require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin=require('copy-webpack-plugin')
const markdownIt=require('markdown-it')();
const MarkdownItContainer=require('markdown-it-container')
const markdownItAnchor=require('markdown-it-anchor')
const striptags=require('./script-tag.js')
const slugify = require('transliteration').slugify;
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
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader'

      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options:{
          preprocess: (MarkdownIt, source) => {
            MarkdownIt.renderer.rules.table_open = function () {
              return '<table class="table">'
            }
            MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence)
            return source
          },
          use: [
                  [markdownItAnchor, {
                    level: 2,
                    slugify: slugify,
                    permalink: true,
                    permalinkBefore: true
                  }],
                 [MarkdownItContainer, 'demo', {
                 // 用于校验包含demo的代码块
                 validate: params => params.trim().match(/^demo\s*(.*)$/),
                 render: function(tokens, idx) {
                    var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
                    if (tokens[idx].nesting === 1) {
                      var description = (m && m.length > 1) ? m[1] : '';
                      var content = tokens[idx + 1].content;
                      var html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1');
                      var script = striptags.fetch(content, 'script');
                      var style = striptags.fetch(content, 'style');
                      var jsfiddle = { html: html, script: script, style: style };
                      var descriptionHTML = description
                        ? markdownIt.render(description)
                        : '';

                      jsfiddle = markdownIt.utils.escapeHtml(JSON.stringify(jsfiddle));

                      return `<demo-block class="demo-box" :jsfiddle="${jsfiddle}">
                                <div class="source" slot="source">${html}</div>
                                ${descriptionHTML}
                                <div class="highlight" slot="highlight">`;
                    }
                    return '</div></demo-block>\n';
                  }
                }],
                [require('markdown-it-container'), 'tip'],
                [require('markdown-it-container'), 'warning']

          ]
        }
      }

    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
         'vue$': 'vue/dist/vue.esm.js',
         packages: path.resolve(__dirname, '../packages'),
         examples: path.resolve(__dirname, '../examples'),
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
     template: path.join(__dirname, '../examples/index.tpl'),
     inject: true
    })
  ]
};

function wrap(render) {
  return function() {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">');
  };
};
function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}
