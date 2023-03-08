import "./heading.scss";

class Heading {
  render(pageName) {
    const h1 = document.createElement("h1");
    const body = document.querySelector("body");
    h1.innerHTML = "Webpak is awseme; this is " + pageName + " page";
    body.insertAdjacentElement("afterbegin", h1);
  }
}
export default Heading;
