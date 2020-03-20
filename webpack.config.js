const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env = {}) => {
  const baseConfig = {
    devtool: env.production ? 'source-map' : 'inline-source-map',
    entry: {
      app: path.resolve(__dirname, 'src/web/index.tsx')
    },
    mode: env.production ? 'production' : 'development',
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'babel-loader' },
        { test: /\.png$/, loader: 'file-loader' }
      ]
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: false,
        template: require('html-webpack-template'),
        appMountId: 'app',
        title: 'McStuffinsville'
      })
    ],
    resolve: {
      extensions: ['.js', '.ts', '.tsx']
    }
  }

  // Split runtime & chunks in production
  if (env.production) {
    return {
      ...baseConfig,
      optimization: {
        usedExports: true,
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all'
        }
      },
      output: {
        ...baseConfig.output,
        filename: '[name].[contenthash].js'
      }
    }
  }

  return baseConfig
}
