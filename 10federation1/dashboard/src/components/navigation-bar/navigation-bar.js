import "./navigation-bar.scss";

class NavigationBar {
  render(navItems) {
    const liItems = navItems.map((item) => {
      return `
            <li><a href="${item.url}">${item.title}</a></li>
          `;
    });
    const ul = document.createElement("ul");
    ul.innerHTML = liItems.join("");
    ul.classList.add("navigation-bar");
    document.body.appendChild(ul);
  }
}
export default NavigationBar;
