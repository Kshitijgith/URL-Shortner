const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    urlMap: {
        type: Map,
        of: String, // Key: Shortened URL, Value: Original URL
        required: true,
      },
      counter: {
        type: Number,
        default: 0, // Keeps track of the next shortId
      },
}, { timestamps: true });

const Link = mongoose.model('Link', linkSchema);
module.exports = Link;
