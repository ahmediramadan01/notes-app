import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { PurgeCSSPlugin } from "purgecss-webpack-plugin";
import { sync } from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PATHS = {
  src: join(__dirname, "src"),
};

export default merge(common, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "index.[contenthash].css" }),
    new PurgeCSSPlugin({
      paths: sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
  ],
});
