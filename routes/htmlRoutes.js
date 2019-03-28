// ==================================
//      MONGOOSE CONFIGURATION
// ==================================

// Require all models
var db = require("../models");

module.exports = function(app) {
  // Load landing page page when browsing the root URL
  // app.get("/", function(req, res) {
  //   res.render("index");
  // });

  app.get("/", function (req, res) {
    // Grab every document in the Articles collection
    db.News.find({})
      .then(function (dbNews) {
        // If we were able to successfully find Articles, send them back to the client
        // res.json(dbNews);

        var newsObject = {
          news: dbNews
        };

        res.render("index", newsObject);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });









  /////////// Routes for OTHER ///////////

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
