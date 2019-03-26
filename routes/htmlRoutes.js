// var db = require("../models");

module.exports = function(app) {
  // Load landing page page when browsing the root URL
  app.get("/", function(req, res) {
    res.render("index");
  });

  /////////// Routes for OTHER ///////////

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
