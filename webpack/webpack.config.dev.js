const sharedWebpackConfig = require("./webpack.config");

const { resolve } = require("path");
const webpack = require("webpack"),
	{ BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const developmentPlugins = [
	new webpack.NamedModulesPlugin(),
	new BundleAnalyzerPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.optimize.AggressiveMergingPlugin(),
];

const developmentConfig = {
	mode: "development",
	devtool: "inline-source-map",

	devServer: {
		port: "3000",
		hot: true,

		contentBase: resolve(__dirname, "../dist"),
		historyApiFallback: true,
	},

	entry: Object.assign({}, sharedWebpackConfig.entry, {
		wds_client: "webpack-dev-server/client?http://localhost:3000",
		wds_hot: "webpack/hot/only-dev-server",
	}),

	plugins: sharedWebpackConfig.plugins.concat(developmentPlugins),
};

module.exports = Object.assign({}, sharedWebpackConfig, developmentConfig);
