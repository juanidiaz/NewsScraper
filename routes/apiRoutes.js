// ==================================
//      DEPENDENCIES
// ==================================

var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// ==================================
//      MONGOOSE CONFIGURATION
// ==================================

// Require all models
var db = require("../models");

// Connect to the Mongo DB deployed in Heroku or locally
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsScraper";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

module.exports = function (app) {

  // Retrieve all data from the NEWS collection
  app.get("/all", function (req, res) {
    // Grab every document in the Articles collection
    db.News.find({})
      .then(function (dbNews) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbNews);

        var newsObject = {
          news: dbNews
        };

        // res.render("index", newsObject);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Retrieve SAVED articles from the NEWS collection
  app.get("/saved", function (req, res) {
    // Grab every document in the Articles collection
    db.News.find({
        saved: true
      })
      .then(function (dbNews) {

        var newsObject = {
          news: dbNews,
        };

        res.render("index", newsObject);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // DELETE all data from the NEWS collection
  app.get("/delete", function (req, res) {
    // Grab every document in the Articles collection
    db.News.deleteMany({
        saved: false
      })
      .then(function (dbNews) {
        // If we were able to successfully find Articles, send them back to the client
        // res.json(dbNews);

        var newsObject = {
          news: {}
        };

        res.render("index", newsObject);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // A GET route for scraping the echoJS website
  app.get("/cbc", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.cbc.ca/cmlink/rss-topstories").then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector

      var $ = cheerio.load(response.data, {
        normalizeWhitespace: true,
        xmlMode: true
      });

      var total = 0;

      // Loop through all the 'item' elements
      $('item').each(function (i, element) {

        // Save an empty result object
        var result = {};

        // Add the info of every story, and save them as properties of the result object
        result.title = $(this).children('title').text() || "title";
        result.link = $(this).children('link').text() || "link";
        result.pubDate = $(this).children('pubDate').text() || "pubDate";
        result.author = $(this).children('author').text() || "author";
        result.category = $(this).children('category').text() || "category";
        result.description = $(this).children('description').text() || "description";
        result.image = $(this).children('description').text().match(/src='(.*?)'/)[1] || "image";

        // Create a new News document using the `result` object built from scraping
        db.News.create(result)
          .then(function (dbNews) {
            // View the added result in the console
            console.log(dbNews);
          })
          .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
          });

        total = i + 1;
      });

    }).then(function () {
      // window.location.href = "/";
      res.render("index");

    });
  });

  // Updating existing article based on id
  app.post("/save/:id", function (req, res) {

    var newsId = req.params.id;

    db.News
      .findByIdAndUpdate(req.params.id, {
        saved: req.body.saved
      }, {
        new: true
      })
      .then(function (savedArticle) {

        res.json(savedArticle);
      });
  });

  /// ---- COMMENT LOGIC

  // Retrieve SAVED articles from the NEWS collection
  app.get("/comment/:newsID", function (req, res) {
    // Grab every document in the Articles collection
    db.Comment.find({
        newsID: req.params.newsID
      })
      .then(function (dbComment) {

        res.json(dbComment);
      })
      .catch(function (err) {

        res.json(err);
      });
  });

  // Add comment
  app.post("/comment/add", function (req, res) {

    let newComment = {
      title: req.body.title,
      comment: req.body.comment,
      newsID: req.body.newsID
    }

    db.Comment.create(newComment)
      .then(function (dbComment) {
        // View the added result in the console
        console.log(dbComment);
      })
      .catch(function (err) {
        // If an error occurred, log it
        console.log(err);
      });

  });

  // Delete comment by ID
  app.get("/comment/delete/:id", function (req, res) {

    db.Comment.findOneAndDelete({_id:req.params.id})
      .then(function (dbComment) {
        // View the added result in the console
        console.log(dbComment);
      })
      .catch(function (err) {
        // If an error occurred, log it
        console.log(err);
      });

  });



};