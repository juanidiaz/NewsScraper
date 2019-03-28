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
    db.News.find({ saved: true})
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

  // DELETE all data from the NEWS collection
  app.get("/delete", function (req, res) {
    // Grab every document in the Articles collection
    db.News.deleteMany({})
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
  app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("http://www.echojs.com/").then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $("article h2").each(function (i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function (dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
          });
      });

      // Send a message to the client
      res.send("Scrape Complete");
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

  // Route for grabbing a specific Article by id, populate it with it's note
  app.post("/article/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.News.findOne({
        _id: req.params.id
      })
      .then(function (dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Updating existing article based on id
  app.post("/api/save/:id", function(req, res) {
    var newsId = req.body.id;

    db.News
      .update(
        {
          saved: req.body.saved,
        },
        {
          where: {
            id: newsId
          }
        }
      )
      .then(function() {
        res.json(newsId);
      });
  });

};