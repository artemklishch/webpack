const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    // тут указываем разные вхоные файлы, чтоб ренерить их отдельно
    "hello-world": "./src/hello-world.js",
    kiwi: "./src/kiwi.js",
  },
  output: {
    filename: "[name].[contenthash].js", // использем [name], чтоб имя генерируемого файла было не bundle,
    // a согласно названия файла компонента, например, kiwi / hello-world
    //  здесь также можно определить - "[id].[contenthash].js" - но лучше через name
    // также тет можно вставить функцию, которая будет вычислять имя файла
    // эту же подстановку мы делаем нижу - в пдаине MiniCssExtractPlugin - чтоб также генерировать css
    // файлы с соответствующими именами
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  mode: "production",
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
      title: "Hello world!",
      template: "src/index.hbs",
      description: "some description",
      minify: false, // по дефолту это значение равно true - по дефолту вебпак минимищирует html файл на выходе
      // путем размещения его в одну строку, здесь мы поменяли значение этого свойства false, чтоб лече посмотреть
      // на содержание выходного файла
    }),
  ],
  // PLUGINS end
};
