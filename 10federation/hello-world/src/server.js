const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.get("/", function (req, res) {
  const pathToHtmlFile = path.resolve(__dirname, "../dist/hello-world.html");
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, "utf-8");
  res.send(contentFromHtmlFile);
});

app.use("/", express.static(path.resolve(__dirname, "../dist"))); // тут мы заменили '/static' путь на '/',
// потому что это приложние расшаривает свои можули для других приложений - в таких случаях мы не используем путь
// '/static'

app.listen(9001, function () {
  console.log("Application is running on http://localhost:9001");
});
