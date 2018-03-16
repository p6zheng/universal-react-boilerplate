var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    app: './client/index.js',
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-router',
      'react-router-dom',
      'react-redux',
      'redux-thunk'
    ]
  },

  output: {
    path: __dirname,
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /.*node_modules((?!ad-react-components).)*$/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react', 'stage-1'],
          plugins: ['syntax-dynamic-import']
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: {
            loader: 'css-loader'
          },
          fallback: 'style-loader'
        }),
      },
      {
        test: /\.(jpe?g|gif|png|svg|JPE?G|GIF|PNG|SVG)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new DotenvPlugin({
      sample: './.env',
    })
  ]
};