var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  newsID: {
    type: String,
    required: true
  }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
