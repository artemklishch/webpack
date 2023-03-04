const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    // publicPath: 'auto', // это значение тут устанавливается по умолчанию (вебпак 5 версии);
    // тут устанавливается абсолютный путь к картинке kivi.jpeg и это работает

    // publicPath: "", // в браузере - направильный путь к картинке
    // (указано только нзвание файд с картинкой) и это не работает

    publicPath: "dist/", // тут устанавливается относительный путь к картинке и это работает

    // publicPath: "http://some-cdn.com/", // это для CDN, обязательно символ ”/” в конце
    // // после симвла слеш в конце этот УРЛ конкатенируется со следующим наименованием имения файла
  },
  mode: "none",
  module: {
    rules: [
      // MODULES start
      {
        test: /\.(png|jpg|jpeg)$/,
        // тут мы используем оно из свойств type / use
        //   type: // эта опция для опредления типа модуля
        //   use: // эта опция используется для loaders
        // type: "asset/resource",
        // type: "asset/inline", // не будет создавать отдельный файл с изображением а
        // поместит изображение непосредственно JS файл в 64 репрезентации,
        // и это значительно увеличит размер JS файла
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024, // 3 kB ; here we changed the default max size value from 8 to 3 kB
            // if file size is larger then 3 kB it will create the separate file as the 'asset/resource'
            // module, otherwise it will be the 'asset/inline' module
          },
        },
      },
      {
        test: /\.(ttf)$/,
        type: "asset/resource",
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
      // MODULES end

      // LOADERS start
      // внутри массива в свойстве use чтрки с наименованиями лоадеров считываются с права на лево
      // и это необходимо иметь ввиду
      {
        test: /\.css$/,
        use: [
          "style-loader", // вставляет (копирует) css файл в исходную папку dist
          // с файлом bundle.js (по дефолту в этот самый файл)
          "css-loader", // счтывает одержимое css файла
        ], // эти компонеты также необходимо явн установить через npm install --save-dev
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      }, // тут необходимо явно установить sass, sass-loader
      // это компилирует scss файлы сперва css файл, а потом
      {
        test: /\.js$/,
        exclude: /node_modules/, // исключаем распространения нашего правила на папку node_modules
        use: {
          loader: "babel-loader",
          options: {
            // мы можем жобавять эту опцию для любого лоадера, но нужно, чтоб опция соответсовалаа лоадеру
            // согласно документации
            presets: ["@babel/env"], // предварительная настройка, тут эта нстройка переделывает ES6,7, и выше версии
            // в версию 5
            plugins: [
              [
                "@babel/plugin-proposal-pipeline-operator",
                { proposal: "minimal" },
              ],
            ], // также необходимо устанавливать соответсвующий плагин
            // который связан с тем кодом, который не считывается - в данном примере - с pipeline operator
            // тут также над установить @babel/core, @babel/preset-env, @babel-loader
          },
        },
      },
      // LOADERS end
    ],
  },
};
