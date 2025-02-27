const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    urlMap: {
        type: Map,
        of: String, 
        required: true,
      },
      counter: {
        type: Number,
        default: 0, // Keeps track of the next shortId
      },
      URL: {
        type: Map,
        of: String, 
        required: false,
      }
}, { timestamps: true });

const Link = mongoose.model('Link', linkSchema);
module.exports = Link;
