import "./heading.scss";
import $ from "jquery";

class Heading {
  render(pageName) {
    // const h1 = document.createElement('h1');
    // const body = document.querySelector('body');
    // h1.innerHTML = 'Webpack is awesome. This is "' + pageName + '" page';
    // body.appendChild(h1);
    const h1 = $("<h1>");
    const body = $("body");
    h1.text('Webpack is awesome. This is "' + pageName + '" page');
    body.append(h1);
  }
}

export default Heading;
