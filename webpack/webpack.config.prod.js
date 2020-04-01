const webpack = require('webpack'),
  TerserPlugin = require('terser-webpack-plugin'),
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sharedWebpackConfig = require('./webpack.config');

const productionPlugins = [
  new webpack.optimize.AggressiveMergingPlugin(),
  new OptimizeCssAssetsPlugin(),
  new MiniCssExtractPlugin({
    filename: '[hash].css',
    chunkFilename: '[contenthash].css',
  }),
];

const productionConfig = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      maxSize: 512e3,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: true })],
  },

  plugins: sharedWebpackConfig.plugins.concat(productionPlugins),
};

module.exports = Object.assign({}, sharedWebpackConfig, productionConfig);
