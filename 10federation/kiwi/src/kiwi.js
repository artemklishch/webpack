import Heading from "./components/heading/heading.js";
import KiwiImage from "./components/kiwi-image/kiwi-image.js";

const heading = new Heading();
heading.render("kiwi");
const kiwiImage = new KiwiImage();
kiwiImage.render();

import("HelloWorldApp/HelloWorldButton").then((HelloWorldButtonModule) => {
  const HelloWorldButton = HelloWorldButtonModule.default; // так мы получаем доступ к классу
  // клторый мы определили в руго приложении, и можем создавать объекты класса с прочими действиями
  const helloWorldButton = new HelloWorldButton();
  helloWorldButton.render();
}); // HelloWorldApp - имя приложения, которое мы указали в файлах конфигурации
// вебпака данного приложения в объекте конфигурации плагина ModuleFederationPlugin в свойстве remotes,
// HelloWorldButton - имя модуля, которое мы определили в файле конфигурации вебпака в объекте конфигурации плагина ModuleFederationPlugin в свойстве
// в свойстве exposes
