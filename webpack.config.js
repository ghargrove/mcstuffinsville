const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: path.resolve(__dirname, 'src/web/index.tsx')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'babel-loader' },
      { test: /\.png$/, loader: 'file-loader'  }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'app'
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  }
}
