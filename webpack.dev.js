import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ESLintPlugin from "eslint-webpack-plugin";

export default merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
  module: {
    rules: [
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({}),
    new ESLintPlugin({
      context: "src",
      extensions: ["js", "jsx"],
      fix: false,
    }),
  ],
});
