const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    { test: /\.css$/, 
      loader: "style-loader!css-loader" 
    }]
  },
  resolve: {
    extensions: ['*','.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/app/index.html'
    })
  ],
  devServer: {
    contentBase: './dist'
  }
};