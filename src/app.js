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
    
    /*if (req.query.name==undefined){
        res.render("weather",{searchMsg:"Get output here",temp:"0"})
    }
    
    else{
        requests(
            `https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=e37cf556cd6bc88480e005301b4f5792`
          ).on("data", (chunkData) => {
            
              const objData = JSON.parse(chunkData);
              const arrData = [objData];
              //console.log((arrData[0].main.temp - 273.0).toFixed(2));
              console.log(
                `The temperature of ${arrData[0].name} is ${(
                  arrData[0].main.temp - 273.00
                ).toFixed(2)}${arrData[0].weather[0].main}`

              );
              res.render("weather", {
                weatherStatus: arrData[0].weather[0].main,
                temp: (arrData[0].main.temp - 273.0).toFixed(2),
                searchMsg:arrData[0].name+", "+arrData[0].sys.country,
                
              });
            
          });
    }*/
  
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
