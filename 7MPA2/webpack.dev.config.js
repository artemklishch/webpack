const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    "hello-world": "./src/hello-world.js",
    kiwi: "./src/kiwi.js",
  },
  output: {
    filename: "[name].bundle.js", // тут девелопмент реда, поэтому мы не используем [contenthash]
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  mode: "development", // development / production / none
  devServer: {
    // это свойство здесь, чтоб настроить сервер рахработки
    port: 9000, // определяем порт, на котором оно отобпажается в браузере
    static: {
      // указываем диреторию, которая рендерится при билде
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "index.html", // указываем какой корневой html файл используем
      writeToDisk: true, // true - будет создавать файлы в папке dist, false - не будет создавать файлы в папке dist
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
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
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
      // LOADERS end
    ],
  },
  // PLUGINS start
  plugins: [
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
