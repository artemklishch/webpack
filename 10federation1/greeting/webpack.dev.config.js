const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/greeting.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9003/",
  },
  mode: "development",
  devServer: {
    port: 9003,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "greeting.html",
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "greeting.html",
      title: "Greeting",
      description: "Greetong description",
      template: "src/page-template.hbs",
    }),
    new ModuleFederationPlugin({
      name: "GreetingApp",
      filename: "remoteEntry.js",
      exposes: {
        "./GreetingPage": "./src/components/greeting-page/greeting-page.js",
      },
    }),
  ],
};
