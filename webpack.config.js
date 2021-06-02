const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.jsx'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
    new webpack.DefinePlugin({
      MAPBOX_ACCESS_TOKEN: JSON.stringify(
        'pk.eyJ1Ijoic3R2bHU4MiIsImEiOiJja3A5dWlyd3MwNXJxMnVueWFiZnF4cTBmIn0.hL9Krw-EZ5wxluyG9lJT0g',
      ),
    }),
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  },
};
