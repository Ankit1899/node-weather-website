const express = require("express");

const path = require("path");
const hbs = require("hbs");

const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000

// Defining paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//HBS: Handlerbar for express to render dyanmic templates
app.set("view engine", "hbs");
app.set("views", viewsPath);
// Setting up hbs partials
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

// app.get('', (req, res)=> {
//     res.send("<h1>Hello Express</h1>")
// });

// Rendering hbs file and passing dyanmic data to it.
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ankit Mittal",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Ankit Mittal",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is a help page",
    title: "Help",
    name: "Ankit Mittal",
  });
});

// app.get('/help', (req, res) => {
//     res.send("Help page")
// })

// app.get('/about', (req, res) => {
//     res.send("<h1>About Page</h1>")
// })

app.get("/weather", (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: "Address must be provided",
    });
  }

  forecast(req.query.address, (error, response) => {
    if (error) {
      return res.send({
        error
      });
    }

    res.send({
      response: response,
      address: req.query.address,
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    errorText: "Help article not found.",
  });
});

// Sending data from browser query string
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    errorText: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
