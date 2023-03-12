const express = require("express");
const path = require("path");
const fs = require("fs");

const port = 9000;
const app = express();

app.use("/", express.static(path.resolve(__dirname, "../dist")));
app.get("*", function (req, res) {
  const pathToHtmlFile = path.resolve(__dirname, "../dist/dashboard.html");
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, "utf-8");
  res.send(contentFromHtmlFile);
});

app.listen(port, () => {
  console.log("Server is running on the port: http://localhost:" + port);
});
