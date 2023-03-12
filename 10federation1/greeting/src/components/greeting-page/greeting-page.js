class GreetingPage {
  render() {
    const p = document.createElement("p");
    p.innerHTML = "Hello!";
    document.body.appendChild(p);
  }
}

export default GreetingPage;
