const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "src/[name].[fullhash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/", // ✅ important pour React Router
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], // ✅ React JSX
            plugins: ["@babel/plugin-proposal-object-rest-spread"],
          },
        },
      },
      {
        test: /\.(c|sa|sc)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },

  devServer: {
    historyApiFallback: true, // ✅ routes React OK en dev
    host: "127.0.0.1",
    port: 9090,
    open: true,
    hot: true,
    client: {
      logging: "info",
      overlay: true,
      progress: true,
      webSocketTransport: "ws",
    },
    webSocketServer: "ws",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      inject: "body",
      hash: true,
    }),
    new ESLintPlugin({
      extensions: "js",
      exclude: "node_modules",
      files: "./src/",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "_redirects", to: "" }], // ✅ copie dans dist/
    }),
    new webpack.DefinePlugin({
      "process.env.REACT_APP_API_URL": JSON.stringify(process.env.REACT_APP_API_URL),
    }),
  ],
};
