const { resolve } = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CheckerPlugin } = require("awesome-typescript-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

if (process.env.NODE_ENV === undefined) {
	console.log("\n'NODE_ENV' is undefined - falling back to 'development'.\n");
	process.env.NODE_ENV = "development";
}

module.exports = {
	context: resolve(__dirname, "../src"),
	entry: {
		main: ["./index.tsx"],
	},
	output: {
		filename: "[hash].js",
		path: resolve(__dirname, "../dist"),
		chunkFilename: "[contenthash].js",
		publicPath: "/",
	},
	resolve: {
		alias: {
			assets: resolve(__dirname, "../src/assets/"),
		},
		extensions: [".ts", ".tsx", ".js", ".json"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "awesome-typescript-loader",
						options: {
							useBabel: true,
							babelOptions: {
								presets: ["@babel/preset-react"],
								plugins: [
									"@babel/plugin-syntax-dynamic-import",
									"@babel/plugin-transform-modules-commonjs",
									"react-hot-loader/babel",
								],
							},
							babelCore: "@babel/core",
						},
					},
				],
				exclude: [resolve(__dirname, "node_modules")],
			},
			{
				test: /\.less$/,
				use: [
					"style-loader",
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === "development",
							reloadAll: true,
						},
					},
					"css-loader",
					"less-loader",
				],
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === "development",
							reloadAll: true,
						},
					},
					"css-loader",
				],
			},
			{
				test: /\.(png|webp|jpg)$/,
				loader: "url-loader",
				options: {
					limit: 8192,
				},
			},
			{
				test: /\.(png|webp|jpg|svg)$/,
				loader: "file-loader",
			},
		],
	},
};

module.exports.plugins = [
	new HtmlWebpackPlugin({
		template: resolve(__dirname, "../src/public/index.html"),
		title: "webpack-eslint-config",
		filename: resolve(__dirname, "../dist/index.html"),
	}),

	new webpack.DefinePlugin(require("./env")),

	new MiniCssExtractPlugin({
		filename: "[hash].css",
		chunkFilename: "[contenthash].css",
	}),
	new CheckerPlugin(),

	new webpack.HashedModuleIdsPlugin(),
	new CleanWebpackPlugin(),
];
