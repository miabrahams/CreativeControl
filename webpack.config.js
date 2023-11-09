const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


console.log('Production mode: ', process.env.NODE_ENV);
console.log('path: ', __dirname);

const config = {
  entry: './client/main.js',
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
        title: 'Development',
        template: 'client/index.html'
      }),
    new CleanWebpackPlugin({
      protectWebpackAssets: true,
      cleanAfterEveryBuildPatterns: ['*.LICENSE.txt']
    })
      // new MiniCssExtractPlugin()
    ],
  mode: process.env.NODE_ENV, // production or development
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [ "style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },

  devServer: {
    // For React-Router
    historyApiFallback: true,
    static: [
      {
        // Adding this directory would make devServer forward files on disk
        // directory: __dirname,
        publicPath: '/'
      }
    ],
    // Everything to this route and beyond will be forwarded to the proxy server. (The example here will also handle /api/leaders.)
    // Status code will be set to 304: Not Modified.
    // (Obviously we can't pass '/' as the route.)
    proxy: {
      '/api': 'http://localhost:3000',
      '/static': 'http://localhost:3000',
      '/image_store': 'http://localhost:3000',
    },
  },
}



module.exports = config;