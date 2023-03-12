const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
  const pathToContent = path.resolve(__dirname, "../dist/greeting.html");
  const content = fs.readFileSync(pathToContent, "utf-8");
  res.send(content);
});

app.use("/", express.static(path.resolve(__dirname, "../dist")));

app.listen(9003, function () {
  console.log("Application is running on http://localhost:9003");
});
