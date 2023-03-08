const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    "hello-world": "./src/hello-world.js",
    kiwi: "./src/kiwi.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  mode: "production",
  optimization: {
    // это оптимизирует
    // в данном случае мы оптимизируем chunk, и на выходе библиотека lodash больше не входит в каждый
    // отдельно сгенерированны на выходе JS файл в папке dist, а сгенерирована в отлельный файл,
    // откуда эта библиотека уже импортируется в те файлы
    // вебпак будет подклчать lodash только в тех html файлах, где программа это использует
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      // MODULES start
      {
        test: /\.(png|jpg|jpeg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024,
          },
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
      // MODULES end

      // LOADERS start
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: [
              [
                "@babel/plugin-proposal-pipeline-operator",
                { proposal: "minimal" },
              ],
            ],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
        // loader: "handlebars-loader",
      },
      // LOADERS end
    ],
  },
  // PLUGINS start
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "hello-world.html",
      chunks: ["hello-world"], // значения в этом массиве должны совпадать с именем свойств в свойстве "entry" выше
      title: "Hello world!",
      template: "src/page-template.hbs",
      description: "Hello world description",
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "kiwi.html",
      chunks: ["kiwi"],
      title: "Kiwi!",
      template: "src/page-template.hbs",
      description: "Kiwi some description",
      minify: false,
    }),
  ],
  // PLUGINS end
};
