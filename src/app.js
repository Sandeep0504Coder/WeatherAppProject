const express = require("express");
const fs = require("fs");
const path = require("path");
const hbs = require("hbs");
const requests = require("requests");
const app = express();

const port = process.env.PORT || 8000;
const staticPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/weather", (req, res) => {
    res.render("weather")
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("*", (req, res) => {
  res.render("404error", { errorMsg: "Oops! Page Not Found" });
});
app.listen(port, () => {
  console.log(`listening at port no ${port}`);
});
