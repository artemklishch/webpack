const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/hello-world.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9001/", // если мы експортируем каке то модули через ModuleFederationPlugin плагин
    // нам нужно указать здес УРЛ, к котороу будет стучаться другео приложение
    // "/static/" тут не подойдет
  },
  mode: "development",
  devServer: {
    port: 9001,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "hello-world.html",
      writeToDisk: true,
    },
  },
  module: {
    rules: [
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
            plugins: ["@babel/plugin-proposal-class-properties"],
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
      filename: "hello-world.html",
      title: "Hello world",
      description: "Hello world",
      template: "src/page-template.hbs",
    }),
    new ModuleFederationPlugin({
      name: "HelloWorldApp",
      filename: "remoteEntry.js", // тут мы определяем наименование файла, который будет как УРЛ для тех приложений,
      // которые будут иметь доступ к модулям данного приложения - это наименование должно продублироваться в соответсвующем
      // месте в конфигурационном объекте плагина ModuleFederationPlugin в файле конфигураци вебпака
      exposes: {
        // в этом свойстве мы перечисляем те модули, которыми мы как бы собираемся "делиться" с другими приложениями
        "./HelloWorldButton":
          "./src/components/hello-world-button/hello-world-button.js",
      },
    }),
  ],
};
