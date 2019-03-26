// ==================================
//      DEPENDENCIES
// ==================================

require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
// var mongoose = require("mongoose");
// var axios = require("axios");
// var cheerio = require("cheerio");

// ==================================
//      EXPRESS CONFIGURATION
// ==================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Use morgan logger for logging requests
app.use(logger("dev"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Static directory
app.use(express.static("public"));
//app.use(express.static(path.join(__dirname, 'public')));

// ==================================
//      HANDLEBARS CONFIGURATION
// ==================================

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// ==================================
//      ROUTING
// ==================================

// API calls
require("./routes/apiRoutes")(app);

// HTTP calls
require("./routes/htmlRoutes")(app);

// ==================================
//      LISTENER
// ==================================

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});

// EOF
// ==================================
