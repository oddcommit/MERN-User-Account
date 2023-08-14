const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  user_name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  image_url: {
    type: String
  },
  watches: {
    type: Number
  },
  likes: {
    type: Number
  },
  followers: [
    String
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = Blog = mongoose.model("blogs", BlogSchema);
