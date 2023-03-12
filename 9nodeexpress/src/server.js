const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// это нужно, чтоб настроить подгрузку так называемых статических айлов (css, html, js)
app.use("/static", express.static(path.resolve(__dirname, "../dist")));

app.get("/", function (req, res) {
  //   res.send("Some dummy content");
  const pathToHtmlFile = path.resolve(__dirname, "../dist/index.html");
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, "utf-8");
  res.send(contentFromHtmlFile);
});

app.listen(3000, function () {
  console.log("Application started on 'http://localhost:3000/'");
});
