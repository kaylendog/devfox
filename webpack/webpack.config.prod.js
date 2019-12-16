const webpack = require("webpack"),
	TerserPlugin = require("terser-webpack-plugin"),
	OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const sharedWebpackConfig = require("./webpack.config");

const productionPlugins = [
	new webpack.optimize.AggressiveMergingPlugin(),
	new OptimizeCssAssetsPlugin(),
];

const productionConfig = {
	mode: "production",
	optimization: {
		splitChunks: {
			chunks: "all",
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
		minimizer: [new TerserPlugin({ extractComments: false })],
	},

	plugins: sharedWebpackConfig.plugins.concat(productionPlugins),
};

module.exports = Object.assign({}, sharedWebpackConfig, productionConfig);
