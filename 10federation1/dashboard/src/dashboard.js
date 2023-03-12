import NavigationBar from "./components/navigation-bar/navigation-bar.js";

const navigationItems = [
  {
    url: "/hello-world-page",
    title: "Hello World Page",
  },
  {
    url: "/kiwi-page",
    title: "Kiwi Page",
  },
  {
    url: "/greeting-page",
    title: "Greeting Page",
  },
];

const navigationBar = new NavigationBar();
navigationBar.render(navigationItems);

const url = window.location.pathname;

if (url === "/hello-world-page") {
  import("HelloWorldApp/HelloWorldPage").then((HelloWorldPageModule) => {
    const HelloWorldPage = HelloWorldPageModule.default;
    const helloWorldPage = new HelloWorldPage();
    helloWorldPage.render();
  });
} else if (url === "/kiwi-page") {
  import("KiwiApp/KiwiPage").then((KiwiPageModule) => {
    const KiwiPage = KiwiPageModule.default;
    const kiwiPage = new KiwiPage();
    kiwiPage.render();
  });
} else if (url === "/greeting-page") {
  import("GreetingApp/GreetingPage").then((GreetingAppModule) => {
    const GreetingPage = GreetingAppModule.default;
    const greetingPage = new GreetingPage();
    greetingPage.render();
  });
}

console.log("Hello from the dashboard");
