import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
	entry: { index: "./src/scripts/controller.js" },
	output: {
		filename: "index.[contenthash].js",
		path: resolve(__dirname, "dist"),
		clean: true,
		assetModuleFilename: "[name].[contenthash][ext]",
	},
	module: {
		rules: [
			{ test: /\.html$/i, loader: "html-loader" },
			{
				test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
				type: "asset/resource",
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/template.html",
			chunks: ["index"],
		}),
	],
	optimization: {
		runtimeChunk: "single",
		moduleIds: "deterministic",
		splitChunks: {
			cacheGroups: {
				styles: {
					name: "index",
					test: /\.css$/,
					chunks: "all",
					enforce: true,
				},
			},
		},
	},
};
