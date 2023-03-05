const path = require("path");
const TerserPlugin = require("terser-webpack-plugin"); // этот плагин уже встроен в вебпак
// поэтому мы его отдельно не устанавливаем через терминал
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js", // [contenthash] - мы добавляем тут для того,
    // чтоб не пересоздавать файл при команде npm run build, если например изменяем только стили
    // а браузер будет использвоать кеш для подгрузки этого файла, который не менялся в процесе изменений
    path: path.resolve(__dirname, "./dist"),
    publicPath: "dist/",
    // // clean: true, // это - вместо плагина CleanWebpackPlugin
    // clean: {
    //   // или с объектом конфигурации, но поддерживает только две ниже указанные опции
    //   dry: true, // будет симулировать удаление файлов
    //   keep: /\.css$/, // эта опция означет, что не будут удаляться указанные файлы
    // },
  },
  mode: "none",
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
      // LOADERS end
    ],
  },
  // PLUGINS start
  // модули встроены в вебпак и охватывают импорт текста, шрифтов, картинок;
  // лоадеры помогают импортировать все остальное, что не охватывается модулями, например, sass/css
  // плагины помогают делать определенную обработку файлов перед импортом, например, Babel плагины компилируют код для более старых версий бразеров
  plugins: [
    new TerserPlugin(), // этот плагин для уменьшения размера исходного JS файла (в данном примере bundle.js)
    new MiniCssExtractPlugin({
      // этот плагин для создания отдеьлного css файла, чтоб не внедрять стили в
      // исходный JS файл (bundle.js), а содержать стили в отдельном файле на выходе
      filename: "styles.[contenthash].css", // тут уточнфем название исходного css файла
    }), // также выше мы изменяем название лоадера
    new CleanWebpackPlugin(), // может принимать объект конфигурации, как в примере ниже
    //{
    //   cleanOnceBeforeBuildPatterns: [
    //     "**/*", // позволяет очищать файлы во вложенных папках в папке dist
    //     path.join(process.cwd(), "build/**/*"), // в это примере мы очищаем содержимое папки build,
    //     // если у нас имеется такая структура файлов, когда часть кода расположена
    //     // отдельно от исходной папки dist и нам надо также делать очистку в тех других местах
    //     // в данном примере это полностью очищает папку  build
    //     // "!static-files*",
    //     // "!directoryToExclude/**",
    //   ],
    // } // этот  плагин для очистки папки с исходным кодом dist , чтоб там не сохранялись
    //  не накапливались файлы со старым кодом после внесения изменений, и всегда был актуальный код
    // но можно это очищение можно отконфигурировать другим способом, как это сделано выше
  ],
  // PLUGINS end
};
