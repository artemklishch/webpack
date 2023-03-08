import Kiwi from "./kivi.jpeg";
import "./kiwi-image.scss";

class KiwiImagw {
  render() {
    const image = document.createElement("image");
    image.src = Kiwi;
    image.alt = "Kiwi";
    image.classList.add("kiwi-image");
    const body = document.querySelector("body");
    body.appendChild(image);
  }
}
export default KiwiImagw;
