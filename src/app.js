const path = require("path");
const express = require("express");
const hbs = require("hbs");

const getCode = require("./utils/getCode");

const app = express();
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Andrew Mead",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App",
    name: "Andrew Mead",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "help me step bro",
    name: "Andrew Mead",
    title: "hahaha",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }

  getCode(req.query.search, (err, data = {}) => {
    if (err) {
      return res.send({ err });
    }

    const newData = {
      lat: data.location && data.location.lat,
      lon: data.location && data.location.lon,
      name: data.location && data.location.name,
    };

    return res.send({
      products: newData,
    });
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address " });
  } else {
    getCode(req.query.address, (error, data = {}) => {
      if (error) {
        return res.send({ error });
      }

      return res.send({
        products: { ...data },
      });
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Help article not found ☺",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Page not Found ☺",
  });
});

app.get("/help", (req, res) => {
  res.send("help Page");
});

app.listen(3005, () => {
  console.log("Server is up on port 3005");
});
