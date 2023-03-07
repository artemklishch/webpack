import "./hello-world-button.scss";

const add = (num) => num + 10;
const subtract = (num) => num - 5;
const multiply = (num) => num * 2;
var a = multiply(add(subtract(7)));
var b = 7 |> subtract |> add |> multiply; // эти правила не всегда отрабтывают
// поскольку компилятор JS их не переделывае без специального лоадера
// не все раузеры могут читать этот код - это будет ошибкой, поэтому его надо транскомпилировать через Babel

console.log("b: ", b);

class HelloWorldButton {
  buttonCssClass = "hello-world-button";
  render() {
    const button = document.createElement("button");
    button.innerHTML = "Hello world!";
    button.classList.add(this.buttonCssClass);
    button.onclick = function () {
      const p = document.createElement("p");
      p.innerHTML = "Hello world";
      p.classList.add("hello-world-text");
      body.appendChild(p);
    };
    const body = document.querySelector("body");
    body.appendChild(button);
  }
}
export default HelloWorldButton;
